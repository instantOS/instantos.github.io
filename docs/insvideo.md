
# Introduction

`ins video` is a markdown based video editor

# Current notes

As of now (Tue Oct  7 03:28:14 PM CEST 2025) there is an issue with whisperx which needs a workaround for it to run on arch
linux. Locate the libtranslate 4.4.so. It's in the uv cache and might not be
called exactly that. Once you found it, run the `patchelf --clear-execstack` command on it. 

```
patchelf --clear-execstack ~/.cache/uv/archive-v0/NjcJvBGqk4Zf5Cd4pRw0E/ctranslate2.libs/libctranslate2-d3638643.so.4.4.0
```

