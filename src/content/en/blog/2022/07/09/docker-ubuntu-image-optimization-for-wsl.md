---
title: Docker Ubuntu Image Optimization for WSL
summary: Cleaning up your disk can be interesting, because we learn a lot about what it can contain.
tags:
  - wsl
  - windows
  - TIL
  - docker
date: 2022-07-19
---

In the company where I work, I was provided with a computer under _Windows 10_. Personally, I work on _OsX_. I’m no more attracted to Windows than that. And for web development, I’m more comfortable with _Linux_. All this to say, that I looked for an alternative to use only Windows. So I chose _Windows Subsytem for Linux_ (WSL). It’s been a while now and it’s pretty good (especially since WSL2).

The other day, I got an alert because my remaining disk space was very low. I found places to clean, but during my research, something caught my eye. In the `MyUserFolder/AppData/Local/Docker/wsl/data/` directory, there was a `ext4.vhdx` file with several gigabytes.

::: alert
**NOTE:** VHDX stands for Virtual Hard Disk
:::

Ok, so this file refers to a virtual hard drive and as mentioned in the path contents I provided earlier, this is associated with the Linux subsystem.

The problem is that this file only gets bigger even if data is deleted within the virtual machine.

While searching, I came across [this StackOverflow thread](https://stackoverflow.com/questions/70946140/docker-desktop-wsl-ext4-vhdx-too-large) and, in particular, a possible way to reduce the size of this file. To do this, I simply had to use _Docker Desktop_, and as the thread message indicated, click on the button to purge the data. I went from _28Go_ to _1.1Go_. Not bad for slimming.

I don’t know how fast this file is growing, but I know it’s going to be under my radar for a while, to make sure it doesn’t take up a lot of space again.

So, if you also use WSL and Windows 10 (not sure if it works the same for Windows 11), maybe you can check this place if you don’t have a large file that could hang out too and gain a few gigabytes.
