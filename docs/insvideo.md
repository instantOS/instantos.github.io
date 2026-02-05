# instantVideo editor

`ins video` is a markdown based video editor. 
It works by transcribing your video to a markdown file, which you can edit using
any text editor, and then render the edited markdown back to a video.

You can cut out parts of the video, add title cards, text overlays, B-roll footage and more
using simple markdown syntax. 


## Quick start

### Requirements

- ins
- uv
- ffmpeg
- chromium

### Setup

`ins video setup`
This should download the required data. This can be quite a lot of data as
WhisperX is used for transcription.


### Edit videos

Assuming the video file you want to edit is called `input.mp4`

```sh
ins video convert input.mp4
```

This produces `input.video.md` file which contains a transcript of the video
You can now edit the `input.video.md` file using any text editor.

```sh
ins video render input.video.md
```

Converts the markdown file back into a video


## Editing

Video markdown files are **auto-generated** by `ins video convert` - you should not create them from scratch. The following shows what a generated file looks like and how to edit it.

Here is an example of a generated markdown file:

```markdown
---
default_source: 'a'
sources:
- id: 'a'
  hash: '4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9'
  name: 'distro.mkv'
  source: '/home/benjamin/Videos/distrotest/distro.mkv'
  transcript: './insvideodata/4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9.srt'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---
`a@00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`a@00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
`a@00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`a@00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`a@00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`a@00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 
`a@00:28.9-00:30.1` mollit anim id est laborum sed ut perspiciatis unde omnis iste natus 
...
```

### Understanding the Frontmatter

The YAML frontmatter declares video sources. When using `ins video convert`, this is auto-generated:

```yaml
---
default_source: 'a'
sources:
- id: 'a'
  hash: '...'
  name: 'main.mp4'
  source: '/path/to/main.mp4'
  transcript: './insvideodata/....json'
- id: 'b'
  hash: '...'
  name: 'broll.mp4'
  source: '/path/to/broll.mp4'
  transcript: './insvideodata/....json'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---
```

- **`sources`** - Array of video sources with unique IDs
- **`default_source`** - Default source for segments without a prefix
- **`hash`** - Content hash for caching
- **`name`**, **`source`**, **`transcript`** - File paths

### Cuts

Each line represents a segment of the video with timestamps and the transcribed text.
You can comment out or delete lines to cut those segments from the video. You
can also rearrange lines. You can not edit the text itself, edits will be
ignored, and you cannot cut within a line. 

### Source Prefixes (Multi-Video Projects)

When using multiple video sources (e.g., via `ins video append`), segments are prefixed with their source ID:

```markdown
---
default_source: 'a'
sources:
- id: 'a'
  source: '/path/to/main.mp4'
  transcript: './main.json'
- id: 'b'
  source: '/path/to/intro.mp4'
  transcript: './intro.json'
---

`b@00:00.0-00:05.0` intro clip from source b
`a@00:00.0-00:10.0` main content from source a
```

### HTML Comments

You can use HTML comments to temporarily disable segments without deleting them:

```markdown
`00:00.0-00:10.0` this segment will be included

<!-- 
`00:10.0-00:20.0` this segment is commented out and will be skipped
-->

`00:20.0-00:30.0` this segment will be included
```

Multi-line comments work too - everything between `<!--` and `-->` is ignored.

### Silence Segments

Gaps longer than 1 second are automatically marked as SILENCE:

```markdown
`a@00:00.0-00:05.0` dialogue here
`a@00:05.0-00:10.0` SILENCE
`a@00:10.0-00:15.0` more dialogue
```

### Slides

You can put arbitrary markdown between the transcript lines to create slides.
This can contain text, images, code blocks, latex and more. 

```markdown
---
default_source: 'a'
sources:
- id: 'a'
  source: '/path/to/video.mp4'
  transcript: './video.json'
---
`a@00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`a@00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

Hi, this is the first slide

`a@00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`a@00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`a@00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`a@00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 

Hi, this is the second slide

`a@00:28.9-00:30.1` mollit anim id est laborum sed ut perspiciatis unde omnis iste natus 
`a@00:30.6-00:33.2` error sit voluptatem accusantium doloremque laudantium totam rem aperiam 
`a@00:33.6-00:35.0` eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 

---

`a@00:35.3-00:37.4` dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur 
`a@00:38.0-00:39.9` aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione 
`a@00:40.3-00:47.0` voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet 
```

Slides will start being shown during the segment immediately before their
content. They will stay on screen until the next slide or until a separator line
`---` is reached.

You can also pause the video entirely by placing slides between two separator lines.
Multiple slides can be shown while the video is paused by placing separator
lines between them. The amount of time a slide is shown is calculated based on
the number of words it contains (180 WPM reading speed, min 5s, max 20s).

```markdown
---
default_source: 'a'
sources:
- id: 'a'
  source: '/path/to/video.mp4'
  transcript: './video.json'
---

`a@00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`a@00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

---

Hi, this is the first slide, the video is paused 

---

Hi, this is the second slide, after this the video will continue

---
`a@00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`a@00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`a@00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`a@00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 
```


Slides will be styled differently depending on their content. If they just
contain a single header (h1, h2 ...) they will act as title cards. If they
contain lots of content, they will not be center aligned and the layout is
adjusted to make the larger amount of content more readable. 

### B-Roll Footage

Use blockquotes with timestamps to insert B-roll footage:

```markdown
`a@00:00.0-00:10.0` talking about something

> `b@00:05.0-00:08.0` B-roll clip from source b

`a@00:10.0-00:20.0` continue talking
```

Multiple B-roll clips can be chained:

```markdown
> `b@00:00.0-00:05.0` first B-roll
> `c@00:02.0-00:07.0` second B-roll
```

**B-roll persists across segments** until stopped with a separator:

```markdown
`a@00:00.0-00:10.0` has B-roll

> `b@00:00.0-00:05.0` B-roll footage

`a@00:10.0-00:20.0` also has B-roll
`a@00:20.0-00:30.0` also has B-roll

---

`a@00:30.0-00:40.0` no B-roll (after separator)
```

### Background music

Add music with a `music` code block. The music plays from that point until the next music block or the end of the video:

````markdown
---
default_source: 'a'
sources:
- id: 'a'
  source: '/path/to/video.mp4'
  transcript: './video.json'
---

`a@00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`a@00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

```music
https://www.youtube.com/watch?v=example
```

`a@00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`a@00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`a@00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`a@00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt
````


You can put a file or music url in a code block with the language set to `music`
to set the music for the video. The music will be looped if it is shorter than
the video, and will play until the next music block or the end of the video.
Setting music to `none` or an empty code block will disable music from that point. 


## Audio processing

`ins video` is meant for editing screencast videos and podcasts. By default, it
processes the audio to improve speech clarity and reduce background noise using
ffmpeg-normalize and DeepFilternet. For other kinds of videos this might be less
desirable, 

## Command reference

### `ins video convert <video> [options]`

Convert a video to editable markdown format.

```bash
# Basic usage
ins video convert input.mp4

# With custom output path
ins video convert input.mp4 --out-file ~/Videos/myedit.md

# Skip audio preprocessing
ins video convert input.mp4 --no-preprocess

# Use specific preprocessor (local, auphonic, none)
ins video convert input.mp4 --preprocessor auphonic

# Use existing transcript
ins video convert input.mp4 --transcript subtitles.srt

# Overwrite existing markdown
ins video convert input.mp4 --force
```

### `ins video append <markdown> <video> [options]`

Append another recording to an existing video markdown file. This is useful for combining multiple recordings into one project.

```bash
# Append a new video to existing markdown
ins video append existing.video.md new_recording.mp4

# With transcript
ins video append existing.video.md new_recording.mp4 --transcript recording.json

# Skip preprocessing
ins video append existing.video.md new.mp4 --no-preprocess

# Use auphonic for the appended video
ins video append existing.video.md new.mp4 --preprocessor auphonic
```

### `ins video transcribe <video> [options]`

Generate a transcript using WhisperX (without creating markdown).

```bash
# Basic transcription
ins video transcribe input.mp4

# Use GPU
ins video transcribe input.mp4 --device cuda

# Float16 precision
ins video transcribe input.mp4 --compute-type float16

# Use specific model
ins video transcribe input.mp4 --model large-v3

# Different VAD method
ins video transcribe input.mp4 --vad-method pyannote
```

### `ins video render <markdown> [options]`

Render a markdown file back to video.

```bash
# Basic render
ins video render input.video.md

# Custom output path
ins video render input.video.md --out-file final.mp4

# Overwrite existing output
ins video render input.video.md --force

# Pre-cache slides without rendering
ins video render input.video.md --precache-slides

# Show ffmpeg command without running
ins video render input.video.md --dry-run

# Render in vertical format (9:16 for Reels/TikTok)
ins video render input.video.md --reels

# Burn subtitles into video (works in both normal and reels mode)
ins video render input.video.md --subtitles
```

### `ins video slide <markdown> [options]`

Generate a single slide image from markdown.

```bash
# Generate slide from markdown
ins video slide slide.md

# Custom output path
ins video slide slide.md --out-file slide.jpg

# Vertical format (9:16)
ins video slide slide.md --reels
```

### `ins video check <markdown>`

Validate a video markdown file and summarize the planned output without rendering.

### `ins video stats <markdown>`

Display detailed statistics about how a markdown file will be rendered (timing, segments, slides, etc.).

### `ins video preprocess <input> [options]`

Process audio with the configured preprocessor.

```bash
# Local preprocessing (DeepFilterNet)
ins video preprocess input.mp4 --backend local

# Auphonic processing
ins video preprocess input.mp4 --backend auphonic --preset UUID --api-key KEY

# Skip preprocessing
ins video preprocess input.mp4 --backend none
```

### `ins video setup [--force]`

Download and configure video tools (WhisperX, local preprocessor, Auphonic). Use `--force` to reconfigure.

### `ins video menu`

Launch an interactive menu for guided video editing workflows. This provides a user-friendly interface for:

- Creating new projects
- Transcribing videos
- Managing existing projects
- Generating slides
- Preprocessing audio
- Setting up video tools

## Limitations

You can not edit the content of the words being said. The only AI being used is
for speech detection (and optionally auphonic for automatic EQ and background
noise removal), meaning this can not insert words into the video which were
never said. 

I sincerely believe there is no value in AI image, video and audio generation
outside of moodboards, so this will not be supported anytime soon. 

Multiple video sources are supported, but each source video is treated independently.

## Current notes

As of now (Tue Oct 7 03:28:14 PM CEST 2025) there is an issue with WhisperX
which needs a workaround for it to run on Arch Linux. Locate the libtranslate
4.4.so. It's in the uv cache and might not be called exactly that. Once you
found it, run the `patchelf --clear-execstack` command on it.

```
patchelf --clear-execstack ~/.cache/uv/archive-v0/NjcJvBGqk4Zf5Cd4pRw0E/ctranslate2.libs/libctranslate2-d3638643.so.4.4.0
```
