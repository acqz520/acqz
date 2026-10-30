---
title: Hello, acqz：我的第一篇文章
description: 博客上线啦！顺便测试一下图片、GIF 动图、代码块和表格，看看这个主题都能怎么玩。
pubDatetime: "2026-10-31T01:00:00+08:00"
tags:
  - 随笔
  - 博客
featured: true
draft: false
---

![Hello banner](/images/hello-acqz/hello-banner.gif)

这是 **acqz** 的第一篇文章。博客基于 [Astro](https://astro.build/) 和 AstroPaper 主题搭建，托管在 Cloudflare Pages 上，用 Pages CMS 在网页里写文章。

这一篇主要是测试：图片、GIF、代码、表格、引用……能放的都放一点。

## 像素头像的进化史

给 GitHub 做头像的时候，前后画了好几版。

### 第一版：Q 版小人

![第一版像素头像：戴墨镜、穿橙色卫衣的小人](/images/hello-acqz/avatar-v1.png)

24×24 像素，配色是紫粉渐变，看起来有点呆萌。

### 第二版：飞机头

![第二版像素头像：飞机头、立领夹克、霓虹轮廓光](/images/hello-acqz/avatar-v2.png)

升级到 32×32，加了飞机头、斜眼、立领夹克和霓虹轮廓光，最后选了这一版当头像。

### 番外：一匹戴墨镜的马

![像素风格的马，戴着墨镜和耳机](/images/hello-acqz/avatar-horse.png)

## 会动的版本

静态图不过瘾，用 Python 逐帧生成了 GIF：

| 眨眼 + 星星闪烁 | 墨镜反光 |
| :-: | :-: |
| ![会眨眼的像素头像](/images/hello-acqz/avatar-blink.gif) | ![墨镜反光的像素马](/images/hello-acqz/horse-glint.gif) |

> 小知识：像素画放大时要用"最近邻"插值，不然边缘会被抹糊。

## 网上的现成方案

也试了开源的 [DiceBear](https://www.dicebear.com/) 像素头像（CC0 协议，可随意使用），一个种子生成一张：

![DiceBear 生成的 12 个像素头像候选](/images/hello-acqz/dicebear-candidates.png)

风格偏可爱，最后还是用了自己画的。

## 代码长什么样

画头像的核心其实就几行，把字符画逐格涂色再放大：

```python
for y, row in enumerate(ART):
    for x, ch in enumerate(row):
        img.putpixel((x, y), PALETTE[ch] if ch != "." else background(x, y))

img.resize((SIZE * SCALE, SIZE * SCALE), Image.NEAREST).save("avatar.png")
```

## 这个博客的技术栈

| 部分 | 用的什么 | 费用 |
| --- | --- | --- |
| 框架 | Astro + AstroPaper | 免费 |
| 托管 | Cloudflare Pages | 免费 |
| 写作后台 | Pages CMS | 免费 |
| 代码仓库 | GitHub | 免费 |

## 接下来

- [x] 博客上线
- [x] 像素头像
- [ ] 写点正经的技术文章
- [ ] 加个留言板（Cloudflare Workers + D1）

就先这样，下篇见 👋
