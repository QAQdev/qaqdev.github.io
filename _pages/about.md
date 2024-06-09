---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

# About Me

Hi! I am **Zhenglin Cheng**, a senior undergraduate student at [Zhejiang University](http://www.zju.edu.cn/english/). I am also an incoming Ph.D. student at [LINs lab, Westlake University](https://lins-lab.github.io) (joint program with Zhejiang University). I love to write and share [something](https://qaqdev.github.io/notes) (in Chinese), which could bring me a sense of accomplishment.

# Research Interests

My research interests are generally within the scope of **efficiency of AI systems (such as large language models)**, specifically in <u>model architectural design</u>, <u>training accelerating techniques</u>, and <u>deploying / inference paradigms</u>. Still exploring! 🙌

# Publications/Manuscripts

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2024</div><img src='images/adaptive.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[📖 Dynamic Mixture of Experts: An Auto-Tuning Approach for Efficient Transformer Models](https://arxiv.org/abs/2405.14297)

Yongxin Guo*, **Zhenglin Cheng\***, Xiaoying Tang, Tao Lin

<a href="https://github.com/LINs-lab/DynMoE" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/LINs-lab/DynMoE?logo=github&label=LINs-lab%2FDynMoE" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/collections/LINs-lab/dynmoe-family-665ed5a331a7e84463cab01a" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Checkpoints" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Checkpoints-yellow
  " style="transition: none; box-shadow: none;" />
</a>

👉 DynMoE enables each token to ***automatically determine the number of experts to activate*** and ***automatically adjusts the number of experts*** during training.
</div>
</div>

# News
- 2024/06/04: 🔮 Successfully defended my undergraduate thesis!

# Educations
- *2020/09 - 2024/07 (now)*, Zhejiang University, College of Computer Science and Technology.

<hr>

<script type="text/javascript" src="//rf.revolvermaps.com/0/0/6.js?i=5fuz11wg2dh&m=7&c=e63100&cr1=ffffff&f=arial&l=0&bv=90&lx=-420&ly=420&hi=20&he=7&hc=a8ddff&rs=80" async="async"></script>