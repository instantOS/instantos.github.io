<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { withBase } from 'vitepress'
import videoConfig from '../../../home-videos.json'

interface Video {
  id: string
  title: string
  thumbnail?: string
}

const videos: Video[] = videoConfig
const track = ref<HTMLUListElement>()
const player = ref<HTMLDialogElement>()
const activeIndex = ref(0)
const playing = ref<Video | null>(null)

let drag: { pointerId: number; startX: number; startScroll: number; startIndex: number } | null =
  null
let suppressClick = false

function thumbnailUrl(video: Video) {
  return video.thumbnail
    ? withBase(video.thumbnail)
    : `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
}

function slideOffset(rail: HTMLUListElement, index: number) {
  const firstSlide = rail.children[0] as HTMLElement
  const slide = rail.children[index] as HTMLElement
  return Math.min(slide.offsetLeft - firstSlide.offsetLeft, rail.scrollWidth - rail.clientWidth)
}

function updateActiveSlide() {
  const rail = track.value
  if (!rail) return

  let nearest = 0
  for (let index = 1; index < videos.length; index++) {
    if (
      Math.abs(slideOffset(rail, index) - rail.scrollLeft) <
      Math.abs(slideOffset(rail, nearest) - rail.scrollLeft)
    ) {
      nearest = index
    }
  }
  activeIndex.value = nearest
}

function moveSlide(direction: number, focusCard = false) {
  const rail = track.value
  const index = activeIndex.value + direction
  if (!rail || index < 0 || index >= videos.length) return

  if (focusCard) {
    rail.children[index].querySelector('button')?.focus({ preventScroll: true })
  }
  rail.scrollTo({ left: slideOffset(rail, index) })
}

function startDrag(event: PointerEvent) {
  if (!event.isPrimary || event.button !== 0) return
  suppressClick = false

  const rail = track.value
  if (event.pointerType !== 'mouse' || !rail || rail.scrollWidth <= rail.clientWidth) return
  drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startScroll: rail.scrollLeft,
    startIndex: activeIndex.value,
  }
}

function dragTrack(event: PointerEvent) {
  const rail = track.value
  if (!rail || !drag || drag.pointerId !== event.pointerId) return

  const distance = event.clientX - drag.startX
  if (!rail.hasPointerCapture(event.pointerId)) {
    if (Math.abs(distance) < 6 || !(event.buttons & 1)) return
    rail.setPointerCapture(event.pointerId)
    rail.classList.add('is-dragging')
    suppressClick = true
  }
  rail.scrollLeft = drag.startScroll - distance
}

function endDrag(event: PointerEvent) {
  const rail = track.value
  if (!rail || drag?.pointerId !== event.pointerId) return

  const { startIndex, startScroll } = drag
  drag = null
  if (!rail.classList.contains('is-dragging')) return

  const distance = rail.scrollLeft - startScroll
  updateActiveSlide()
  rail.classList.remove('is-dragging')

  // Advance on short drags as well as drags that reach the next card's snap point.
  const direction =
    activeIndex.value === startIndex && Math.abs(distance) >= 64 ? Math.sign(distance) : 0
  moveSlide(direction)
}

function preventDragClick(event: MouseEvent) {
  if (!suppressClick || event.detail === 0) return
  suppressClick = false
  event.preventDefault()
  event.stopPropagation()
}

async function play(video: Video) {
  playing.value = video
  await nextTick()
  player.value?.showModal()
}
</script>

<template>
  <section
    v-if="videos.length"
    class="home-videos"
    aria-labelledby="see-it-in-action"
    aria-roledescription="carousel"
  >
    <div class="video-heading">
      <h2 id="see-it-in-action">See it in action</h2>
      <div v-if="videos.length > 1" class="video-controls">
        <span class="video-position" aria-live="polite"
          >{{ activeIndex + 1 }} / {{ videos.length }}</span
        >
        <button
          type="button"
          aria-label="Previous video"
          aria-controls="home-video-track"
          :aria-disabled="activeIndex === 0"
          @click="moveSlide(-1)"
        >
          <span class="arrow arrow-prev" aria-hidden="true"></span>
        </button>
        <button
          type="button"
          aria-label="Next video"
          aria-controls="home-video-track"
          :aria-disabled="activeIndex === videos.length - 1"
          @click="moveSlide(1)"
        >
          <span class="arrow" aria-hidden="true"></span>
        </button>
      </div>
    </div>

    <ul
      id="home-video-track"
      ref="track"
      class="video-track"
      role="list"
      aria-label="instantOS videos"
      @scroll.passive="updateActiveSlide"
      @pointerdown="startDrag"
      @pointermove="dragTrack"
      @pointerup="endDrag"
      @pointercancel="endDrag"
      @pointerleave="endDrag"
      @lostpointercapture="endDrag"
      @click.capture="preventDragClick"
      @dragstart.prevent
      @keydown.left.prevent="moveSlide(-1, true)"
      @keydown.right.prevent="moveSlide(1, true)"
    >
      <li v-for="video in videos" :key="video.id">
        <button type="button" class="video-card" aria-haspopup="dialog" @click="play(video)">
          <span class="video-cover">
            <img
              :src="thumbnailUrl(video)"
              alt=""
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            <span class="play-icon" aria-hidden="true"></span>
          </span>
          <span class="video-title">{{ video.title }}</span>
        </button>
      </li>
    </ul>

    <a class="channel-link" href="https://www.youtube.com/@PaperBenni/videos"
      >More from Paper Benni on YouTube <span aria-hidden="true">↗</span></a
    >

    <dialog
      ref="player"
      class="video-dialog"
      aria-labelledby="home-video-title"
      @close="playing = null"
    >
      <div class="dialog-heading">
        <p id="home-video-title">{{ playing?.title }}</p>
        <button type="button" aria-label="Close video" autofocus @click="player?.close()">×</button>
      </div>
      <template v-if="playing">
        <iframe
          :src="'https://www.youtube-nocookie.com/embed/' + playing.id + '?autoplay=1'"
          :title="playing.title"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <a class="channel-link" :href="'https://www.youtube.com/watch?v=' + playing.id"
          >Watch on YouTube <span aria-hidden="true">↗</span></a
        >
      </template>
    </dialog>
  </section>
</template>

<style scoped>
.home-videos {
  container-type: inline-size;
  margin-top: clamp(40px, 6vw, 72px);
}

.video-heading,
.dialog-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.video-heading h2 {
  border: 0;
  padding: 0;
  margin: 0;
  font-size: clamp(24px, 4vw, 36px);
  line-height: 1.12;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.video-controls {
  display: flex;
  align-items: center;
  flex: none;
  gap: 8px;
}

.video-position {
  margin-right: 4px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.video-controls button,
.dialog-heading button {
  display: grid;
  place-items: center;
  flex: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.video-controls button:not([aria-disabled='true']):hover,
.dialog-heading button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.video-controls button[aria-disabled='true'] {
  opacity: 0.45;
  cursor: default;
}

.arrow {
  width: 8px;
  height: 8px;
  margin-right: 3px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: rotate(45deg);
}

.arrow-prev {
  margin-right: 0;
  margin-left: 3px;
  transform: rotate(-135deg);
}

ul.video-track {
  /* Extend the scrollport into the gutters while keeping cards aligned to the content. */
  --viewport-gutter: max(0px, calc(-1 * var(--vp-offset, calc(50% - 50vw))));
  --edge-fade: min(calc((100% - 100cqw) / 2), 96px);
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 88%;
  align-items: start;
  gap: 12px;
  margin: 16px calc(-1 * var(--viewport-gutter)) 8px;
  padding: 0 var(--viewport-gutter);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-padding-inline: calc((100% - 100cqw) / 2);
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  list-style: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    black var(--edge-fade),
    black calc(100% - var(--edge-fade)),
    transparent
  );
  user-select: none;
}

ul.video-track.is-dragging {
  scroll-snap-type: none;
  scroll-behavior: auto;
}

.video-track.is-dragging {
  cursor: grabbing;
}

@media (any-pointer: fine) {
  .video-track:has(li:nth-child(2)) .video-card {
    cursor: grab;
  }

  .video-track.is-dragging .video-card {
    cursor: grabbing;
  }
}

.video-track li {
  margin: 0;
  min-width: 0;
  scroll-snap-align: start;
}

.video-track li:last-child {
  scroll-snap-align: end;
}

.video-card {
  display: block;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  text-align: left;
}

.video-card:hover {
  border-color: var(--vp-c-brand-1);
}

.video-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -3px;
}

.video-cover {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  background: var(--vp-c-bg-alt);
}

.video-cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  display: grid;
  place-items: center;
  width: clamp(48px, 8vw, 72px);
  aspect-ratio: 1;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 50%;
  background: rgb(12 16 24 / 85%);
  color: white;
}

.play-icon::after {
  content: '';
  margin-left: 4px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 16px solid currentColor;
}

.video-card:hover .play-icon,
.video-card:focus-visible .play-icon {
  background: var(--vp-c-brand-3);
  color: #111827;
}

.video-title {
  display: block;
  padding: 12px 14px;
  color: var(--vp-c-text-1);
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 600;
  line-height: 1.4;
}

.channel-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 14px;
  text-decoration: none;
}

.channel-link:hover {
  text-decoration: underline;
}

.video-dialog {
  max-width: 900px;
  width: calc(100% - 32px);
  margin: auto;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.video-dialog::backdrop {
  background: rgb(0 0 0 / 80%);
}

.dialog-heading p {
  margin: 0;
  font-weight: 600;
}

.dialog-heading button {
  font-size: 24px;
}

.video-dialog iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-top: 12px;
  border: 0;
  border-radius: 8px;
  background: #000;
}

@media (min-width: 640px) {
  ul.video-track {
    grid-auto-columns: 76%;
    gap: 16px;
    margin-top: 20px;
  }

  .video-title {
    padding: 14px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  ul.video-track {
    scroll-behavior: auto;
  }
}
</style>
