# instantVideo editor

`ins video` is a markdown based video editor. 
It works by transcribing your video to a markdown file, which you can edit using
any text editor, and then render the edited markdown back to a video.

You can cut out parts of the video, add title cards, text overlays and more
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

Here is an example of how a markdown file generated from a video looks like:

```markdown
---
video:
  hash: '4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9'
  name: 'distro.mkv'
  source: '/home/benjamin/Videos/distrotest/distro.mkv'
transcript:
  source: './insvideodata/4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9.srt'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---
`00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
`00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 
`00:28.9-00:30.1` mollit anim id est laborum sed ut perspiciatis unde omnis iste natus 
...
```

### Cuts

Each line represents a segment of the video with timestamps and the transcribed text.
You can comment out or delete lines to cut those segments from the video. You
can also rearrange lines. You can not edit the text itself, edits will be
ignored, and you cannot cut within a line. 

### Slides

You can put arbitrary markdown between the transcript lines to create slides.
This can contain text, images, code blocks, latex and more. 

```markdown
---
video:
  hash: '4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9'
  name: 'distro.mkv'
  source: '/home/benjamin/Videos/distrotest/distro.mkv'
transcript:
  source: './insvideodata/4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9.srt'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---
`00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

Hi, this is the first slide

`00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 

Hi, this is the second slide

`00:28.9-00:30.1` mollit anim id est laborum sed ut perspiciatis unde omnis iste natus 
`00:30.6-00:33.2` error sit voluptatem accusantium doloremque laudantium totam rem aperiam 
`00:33.6-00:35.0` eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 

---

`00:35.3-00:37.4` dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur 
`00:38.0-00:39.9` aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione 
`00:40.3-00:47.0` voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet 
```

Slides will start being shown during the segment immediately before their
content. They will stay on screen until the next slide or until a separator line
`---` is reached.

You can also pause the video entirely by placing slides between two separator lines.
Multiple slides can be shown while the video is paused by placing separator
lines between them. The amount of time a slide is shown is calculated based on
the number of words it contains. 

```markdown
---
video:
  hash: '4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9'
  name: 'distro.mkv'
  source: '/home/benjamin/Videos/distrotest/distro.mkv'
transcript:
  source: './insvideodata/4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9.srt'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---

`00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

---

Hi, this is the first slide, source the video is paused 

---

Hi, this is the second slide, after this the video will continue

---
`00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 
```


Slides will be styled differently depending on their content. If they just
contain a single header (h1, h2 ...) they will act as title cards. If they
contain lots of content, they wil not be center aligned and the layout is
adjusted to make the larger amount of content more readable. 

### Background music


````markdown
---
video:
  hash: '4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9'
  name: 'distro.mkv'
  source: '/home/benjamin/Videos/distrotest/distro.mkv'
transcript:
  source: './insvideodata/4b59412a676f5994b916dd983e3315cb8ebfed8f99cf1b609310d6dda39db3d9.srt'
generated_at: '2025-12-21T00:37:04.161349597+00:00'
---

`00:00.0-00:03.4` quick brown fox jumps over the lazy dog consectetur adipiscing elit 
`00:03.4-00:13.8` elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

```music
https://www.youtube.com/watch?v=example
```

`00:14.6-00:19.3` ut enim ad minim veniam quis nostrud exercitation ullamco laboris 
`00:24.9-00:26.2` nisi ut aliquip ex ea commodo consequat duis aute irure dolor
`00:26.4-00:27.0` in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur 
`00:27.2-00:28.7` excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt 
````


You can put a file or music url in a code block with the language set to `music`
to set the music for the video. The music will be looped if it is shorter than
the video, and will play until the next music block or the end of the video.
Setting music to `none` or an empty code block will disable music from that point. 


## Limitations

You can not edit the content of the words being said. The only AI being used is
for speech detection (and optionally auphonic for automatic EQ and background
noise removal), meaning this can not insert words into the video which were
never said. 

I sincerely believe there is no value in AI image, video and audio generation
outside of moodboards, so this will not be supported anytime soon. 

As of now, only editing a single video file is supported. 

## Current notes

As of now (Tue Oct 7 03:28:14 PM CEST 2025) there is an issue with WhisperX
which needs a workaround for it to run on Arch Linux. Locate the libtranslate
4.4.so. It's in the uv cache and might not be called exactly that. Once you
found it, run the `patchelf --clear-execstack` command on it.

```
patchelf --clear-execstack ~/.cache/uv/archive-v0/NjcJvBGqk4Zf5Cd4pRw0E/ctranslate2.libs/libctranslate2-d3638643.so.4.4.0
```
