document.addEventListener("DOMContentLoaded", function() {
  var containers = document.querySelectorAll('.slideshow-container');

  containers.forEach(function(container) {
    var images = container.querySelectorAll('img');
    
    // 如果图片少于或等于1张，不需要轮播
    if (images.length <= 1) return;
    
    var currentIndex = 0;
      
    setInterval(function() {
      // 1. 隐藏当前图片
      // 移除 fade 类，防止下次显示时动画状态混乱
      images[currentIndex].style.display = 'none';
      images[currentIndex].classList.remove('fade');
      
      // 2. 计算下一张索引
      currentIndex = (currentIndex + 1) % images.length;
      
      // 3. 显示下一张
      // 添加 fade 类，让新出来的图片有淡入效果
      images[currentIndex].classList.add('fade');
      images[currentIndex].style.display = 'block';
    }, 5000); // 5秒切换
  });
});