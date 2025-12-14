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

Hello! I am **Zhenglin Cheng**, a second-year Ph.D. student of <img src="images/lab-logo.png" style="width: 19px;height: auto;display: inline-block;vertical-align: middle"> [LINs lab, Westlake University](https://lins-lab.github.io) (through joint program with ZJU), advised by [Prof. Tao LIN](https://tlin-taolin.github.io/). I am also honored to be affiliated with <img src="images/sii-logo.png" style="width: 21px;height: auto;display: inline-block;vertical-align: middle"> Shanghai Innovation Institute (SII), a new force in the GenAI era. Before that, I received my bachelor's degree in Software Engineering from Zhejiang University (ZJU).

I love to write and post [something](https://qaqdev.github.io/notes) (from technical notes to life stuff). I also practice Chinese traditional calligraphy to relax occasionally.

# News
- *2025/12*, 🚀 We release [TwinFlow](https://www.arxiv.org/abs/2512.05150), a simple and effective framework for **one-step generation!**
- *2025/01*, 🥳 [Dynamic Mixture of Experts (DynMoE)](https://openreview.net/forum?id=T26f9z2rEe) is accepted to ICLR'25, see you in Singapore 🇸🇬 !
<!-- - 2024/09: 🥳 [Mutimodal Self-Instruct](https://arxiv.org/abs/2407.07053) is accepted to EMNLP'24 (Main) as **Oral**! -->
<!-- - 2024/07: 👏 Excited to intern at Baichuan AI on multimodal LLM pretraining. -->
<!-- - 2024/06: 🔮 Successfully defended my [undergraduate thesis](https://arxiv.org/abs/2407.07053), ready to graduate. -->

# Research Interests

My long-term research goal is to build efficient multimodal agents that can **<u>understand</u>** the physical world, **<u>reason</u>** on real-world problems, and **<u>generate</u>** novel ideas, which could also learn from experience and evolve themselves in the constantly changing environment.

Looking at the present, I put my focus on:

- **Unified multimodal models**: how to effectively and efficiently combine diffusion and autoregressive paradigm?
- **Few-step generation**: how can we effectively train/distill continuous diffusion generators into 1-NFE ones—and can the same be done for dLLMs?
<!-- - **LLM reasoning in the deep thinking era**, such as ChatGPT o-series and Deepseek-R1. -->

<!-- <div style="width: 50%; height: 300px; display: center; justify-content: center; align-items: center;">
  <img src="images/scope.jpg" alt="scope" style="max-width: 100%; height: auto;">
</div> -->

# Publications/Manuscripts <span style="color: gray; font-size: 13px; font-family: monospace;">(* denotes equal contribution)</span>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div class="slideshow-container">
      <div class="badge">arXiv'25</div>
      <img src='images/twinflow.png' alt="sym" width="100%">
      <img src='images/twinflow_qwen.jpg' alt="sym2" width="100%">
    </div>
  </div>
<div id="twinflow" class='paper-box-text' markdown="1">

[📖 TwinFlow: Realizing One-step Generation on Large Models with Self-adversarial Flows](https://www.arxiv.org/abs/2512.05150)

***Zhenglin Cheng**\*, Peng Sun\*, Jianguo Li, Tao Lin*

<a href="https://zhenglin-cheng.com/twinflow" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="Project Page" src="https://img.shields.io/badge/Project%20Page-133399.svg?logo=homepage" style="transition: none; box-shadow: none;" />
</a> <a href="https://github.com/inclusionAI/TwinFlow" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/inclusionAI/TwinFlow?logo=github&label=inclusionAI%2FTwinFlow" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/inclusionAI/TwinFlow" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Checkpoints" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Checkpoints-yellow
  " style="transition: none; box-shadow: none;" />
</a>

👉 TwinFlow tames **large-scale few-step training** through self-adversarial flows, **eliminating the need for any auxiliary networks (discriminators, teachers, fake scores) by one-model design.** This scalable approach transforms **Qwen-Image-20B** into a high-quality few-step generator.
</div>
</div>

<!-- ## LLM with MoE -->

<!-- DynMoE -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ICLR'25</div><img src='images/adaptive.jpg' alt="sym" width="100%"></div></div>

<div id="dynmoe" class='paper-box-text' markdown="1">

[📖 Dynamic Mixture of Experts: An Auto-Tuning Approach for Efficient Transformer Models](https://openreview.net/forum?id=T26f9z2rEe)

*Yongxin Guo\*, **Zhenglin Cheng\***, Xiaoying Tang, Zhaopeng Tu, Tao Lin*

<a href="https://github.com/LINs-lab/DynMoE" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/LINs-lab/DynMoE?logo=github&label=LINs-lab%2FDynMoE" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/collections/LINs-lab/dynmoe-family-665ed5a331a7e84463cab01a" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Checkpoints" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Checkpoints-yellow
  " style="transition: none; box-shadow: none;" />
</a>

👉 DynMoE **frees the burden of pivotal hyper-parameter selection for MoE training** by enabling each token to activate different number of experts, and adjusting the number of experts automatically, acheiving stronger sparsity well maintaining performance.
</div>
</div>

<!-- ## Efficient Diffusion -->

<!-- GMem -->

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv'24</div><img src='images/gmem.jpg' alt="sym" width="100%"></div></div>
<div id="dynmoe" class='paper-box-text' markdown="1">

[📖 GMem: A Modular Approach for Ultra-Efficient Generative Models](https://arxiv.org/abs/2412.08781)

*Yi Tang\*, Peng Sun\*, **Zhenglin Cheng\***, Tao Lin*

<a href="https://github.com/LINs-lab/GMem" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/LINs-lab/GMem?logo=github&label=LINs-lab%2FGMem" style="transition: none; box-shadow: none;" />
</a> <a href="https://huggingface.co/Tangentone/GMem" style="text-decoration: none; color: inherit; background-color: transparent;">
  <img alt="HF Checkpoints" src="https://img.shields.io/badge/%F0%9F%A4%97-HF_Checkpoints-yellow
  " style="transition: none; box-shadow: none;" />
</a>

👉 GMem decouples diffusion modeling by **network for generalizatio**n and external **memory bank for memorization**, achieving **50×** training speedup compared to SiT, **25×** speed up to REPA.

</div>
</div>

<!-- ## Multimodal Data Engineering -->

<!-- Mutimodal Self Instruct -->

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">EMNLP'24 (Main)</div><img src='images/MSI.png' alt="sym" width="100%"></div></div>
<div id="msi" class='paper-box-text' markdown="1">

[📖 Multimodal Self-Instruct: Synthetic Abstract Image and Visual Reasoning Instruction Using Language Model](https://arxiv.org/abs/2407.07053) (inherited from my undergrad thesis) -->

<!-- Zhenglin (listed as second co-first author) did ALL preliminary exploration, wrote ALL the code (pipeline and evaluation), did ALL model training, ALL experiments, 90% and more datasets generation and formatting while the first co-first author DID NONE OF THE ABOVE. -->

<!-- *Wenqi Zhang\*, **Zhenglin Cheng\***, Yuanyu He, ... , Weiming Lu, Yueting Zhuang*

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
</div> -->

# Experiences
- *2025/07 - Present*, [Ant Research](https://www.antresearch.com/) (Tech Leader: Dr. [Jianguo Li](https://sites.google.com/site/leeplus/)).

# Academic Services
- Conference Reviewer: ICLR.

# Educations
- *2024/09 - 2029/06*, Westlake University, College of Engineering.
- *2020/09 - 2024/06*, Zhejiang University, College of Computer Science and Technology.

<hr>

<script type="text/javascript" src="assets/js/oneko.js?v=<?php echo filemtime('assets/js/oneko.js'); ?>"></script>