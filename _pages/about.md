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

<center id='pin'><span style="color: gray; font-family: monospace;">May oneko <img src="images/android-chrome-512x512.png" style="width: 21px;height: auto;display: inline-block;vertical-align: top"> lead you to my latest work!</span></center>

Hello! I am **Zhenglin Cheng**, an incoming Ph.D. student of <img src="images/lab-logo.png" style="width: 19px;height: auto;display: inline-block;vertical-align: middle"> [LINs lab, Westlake University](https://lins-lab.github.io) (through joint program with ZJU), advised by [Prof. Tao LIN](https://tlin-taolin.github.io/). Before that, I received my bachelor's degree in Software Engineering from <img src="images/zju-logo.png" style="width: 20px;height: auto;display: inline-block;vertical-align: middle">  [Zhejiang University](http://www.zju.edu.cn/english/) (ZJU).

I love to write and post [something](https://qaqdev.github.io/notes) (from technical notes to life stuff). I also practice Chinese traditional calligraphy to relax occasionally.

# Research Interests

My research interests are generally within the scope of **efficiency and effectiveness of AI systems (such as large language models)**, specifically in <u>model architectural optimization</u>, <u>training accelerating techniques</u>, and <u>efficient inference paradigms</u>. Actively exploring! 🙌

<!-- <div style="width: 50%; height: 300px; display: center; justify-content: center; align-items: center;">
  <img src="images/scope.jpg" alt="scope" style="max-width: 100%; height: auto;">
</div> -->

# Publications/Manuscripts <span style="color: gray; font-size: 13px; font-family: monospace;">(* denotes equal contribution)</span>

<!-- DynMoE -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv'24</div><img src='images/adaptive.jpg' alt="sym" width="100%"></div></div>
<div id="dynmoe" class='paper-box-text' markdown="1">

[📖 Dynamic Mixture of Experts: An Auto-Tuning Approach for Efficient Transformer Models](https://arxiv.org/abs/2405.14297)

*Yongxin Guo\*, **Zhenglin Cheng\***, Xiaoying Tang, Tao Lin*

<a href="https://github.com/LINs-lab/DynMoE" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/LINs-lab/DynMoE?logo=github&label=LINs-lab%2FDynMoE" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/collections/LINs-lab/dynmoe-family-665ed5a331a7e84463cab01a" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Checkpoints" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Checkpoints-yellow
  " style="transition: none; box-shadow: none;" />
</a>

👉 DynMoE **frees the burden of pivotal hyper-parameter selection for MoE training** by enabling each token to activate different number of experts, and adjusting the number of experts automatically during training.
</div>
</div>

<!-- Mutimodal Self Instruct -->
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv'24</div><img src='images/MSI.png' alt="sym" width="100%"></div></div>
<div id="msi" class='paper-box-text' markdown="1">

[📖 Multimodal Self-Instruct: Synthetic Abstract Image and Visual Reasoning Instruction Using Language Model](https://arxiv.org/abs/2407.07053) (inherited from my undergrad thesis)

<!-- Zhenglin (listed as second co-first author) did ALL preliminary exploration, wrote ALL the code (pipeline and evaluation), did ALL model training, ALL experiments, 90% and more datasets generation and formatting while the first co-first author DID NONE OF THE ABOVE. -->

*Wenqi Zhang\*, **Zhenglin Cheng\***, Yuanyu He, Mengna Wang, Yongliang Shen, Zeqi Tan, Guiyang Hou, Mingqian He, Yanna Ma, Weiming Lu, Yueting Zhuang*

<a href="https://multi-modal-self-instruct.github.io/" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="Project" src="https://img.shields.io/badge/🌐 Project-blue" style="transition: none; box-shadow: none;" />
</a> <a href="https://github.com/zwq2018/Multi-modal-Self-instruct" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zwq2018/Multi-modal-Self-instruct?logo=github&label=Multi-modal-Self-instruct" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/datasets/zwq2018/Multi-modal-Self-instruct" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Datasets" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Datasets-yellow
  " style="transition: none; box-shadow: none;" />
</a> <a href="https://mp.weixin.qq.com/s/lebsZgdlp3iJRSaMXc5COg" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Datasets" src="https://img.shields.io/badge/-WeChat@%E6%96%B0%E6%99%BA%E5%85%83-FFFFF0?logo=wechat&logoColor=07C160" style="transition: none; box-shadow: none;" />
</a>


👉 Multimodal self-instruct utilizes LLMs and their code capabilities to **synthesize massive abstract images and visual reasoning instructions** across daily scenarios such as charts, graphs, visual puzzles, etc.
</div>
</div>

# News
- 2024/07: 👏 Excited to intern at Baichuan AI on multimodal LLM pretraining!
- 2024/06: 🔮 Successfully defended my [undergraduate thesis](https://arxiv.org/abs/2407.07053), ready to graduate.

# Educations
- *2020/09 - 2024/06*, Zhejiang University, College of Computer Science and Technology.

<hr>

<script type="text/javascript" src="//rf.revolvermaps.com/0/0/6.js?i=5fuz11wg2dh&m=7&c=e63100&cr1=ffffff&f=arial&l=0&bv=90&lx=-420&ly=420&hi=20&he=7&hc=a8ddff&rs=80" async="async"></script>

<script type="text/javascript" src="assets/js/oneko.js"></script>
