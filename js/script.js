document.addEventListener("DOMContentLoaded", function() {
    // 获取所有的 .inner 元素
    const innerContainers = document.querySelectorAll('.inner');

    innerContainers.forEach(innerContainer => {
        const carouselBut = innerContainer.querySelector('.carousel-but');
        const carouselContainer = innerContainer.querySelector('.carousel-container');
        
        if (carouselBut && carouselContainer) {
            initCarousel(carouselContainer, carouselBut);
        }
    });
});

function initCarousel(carouselContainer, carouselBut) {
    let currentIndex = 0;
    const itemWidth = 420; // 根据实际情况调整
    const margin = 15; // 根据实际情况调整
    const slideContainer = carouselContainer.querySelector('.carousel-slide');
    const totalItems = slideContainer.querySelectorAll('.carousel-item').length;

    const prevBtn = carouselBut.querySelector('.prevBtn');
    const nextBtn = carouselBut.querySelector('.nextBtn');

    prevBtn.addEventListener('click', function() {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = Math.min(currentIndex + 1, totalItems - 1);
        updateCarousel();
    });

    function updateCarousel() {
        const offset = (itemWidth + margin) * currentIndex;
        slideContainer.style.transform = `translateX(-${offset}px)`;
    }
}



// .....产品列表轮播图.................................................
document.addEventListener('DOMContentLoaded', () => {
  // 对每个轮播图容器进行操作
  document.querySelectorAll('.produs-container').forEach((container) => {
    let slideIndex = 0;
    const wrapper = container.querySelector('.carousel-wrapper');
    const slides = wrapper.getElementsByClassName('carousel-slide');
    const totalSlides = slides.length;
    const dotsContainer = container.querySelector('.slick-dots');

    // 创建导航点
    const dots = [];
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('li');
      const button = document.createElement('button');
      dots.push(dot);
      button.addEventListener('click', () => {
        changeSlide(wrapper, dots, i);
        slideIndex = i; // 更新当前slideIndex
      });
      dot.appendChild(button);
      dotsContainer.appendChild(dot);
    }

    // 获取前进和后退按钮
    const prevButton = container.querySelector('.prev');
    const nextButton = container.querySelector('.next');

    // 为按钮添加事件监听器
    prevButton.addEventListener('click', () => {
      slideIndex = slideIndex > 0 ? slideIndex - 1 : totalSlides - 1;
      changeSlide(wrapper, dots, slideIndex);
    });

    nextButton.addEventListener('click', () => {
      slideIndex = slideIndex < totalSlides - 1 ? slideIndex + 1 : 0;
      changeSlide(wrapper, dots, slideIndex);
    });

    // 初始化
    changeSlide(wrapper, dots, 0);
  });

  // 定义切换幻灯片的函数
  function changeSlide(wrapper, dots, slideIndex) {
    wrapper.style.transform = 'translateX(' + (-slideIndex * 277) + 'px)';
    updateDots(dots, slideIndex);
  }

  // 更新导航点的激活状态
  function updateDots(dots, slideIndex) {
    for (let i = 0; i < dots.length; i++) {
      if (i === slideIndex) {
        dots[i].className = 'slick-active';
      } else {
        dots[i].className = '';
      }
    }
  }
});
// ...........................................................

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    return isVisible;
}

function setupVideo(videoId, coverClass) {
    const video = document.getElementById(videoId);
    const cover = video.parentNode.querySelector('.' + coverClass);

    video.alreadyPlayed = false;

    video.onplay = function() {
        // 使用透明度过渡淡出封面
        cover.style.opacity = 0;
        cover.style.transition = "opacity 0.3s ease";
    };

    video.onended = function() {
        // 使用透明度过渡淡入封面
        cover.style.opacity = 1;
        cover.style.transition = "opacity 0.3s ease";
        video.alreadyPlayed = true;
    };
}

function checkVideos() {
    const videos = document.querySelectorAll('.video-container video');

    videos.forEach(video => {
        if (isInViewport(video) && !video.alreadyPlayed) {
            video.play().catch(error => console.error("视频自动播放失败：", error));
        }
    });
}

window.addEventListener('load', function() {
    setupVideo("myVideo1", "cover1"); // 确保这里的封面类名与 HTML 中的匹配
	setupVideo("myVideo2", "cover2");
	setupVideo("myVideo3", "cover3");
    // 为其他视频重复此过程
    checkVideos();
});

window.addEventListener('scroll', checkVideos);

// 在窗口大小变化时重新检查视频是否在视口中
window.addEventListener('resize', checkVideos);  









