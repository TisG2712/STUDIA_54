// SECTION 1
/**
 * Hiệu ứng 1: Ẩn/hiện Navbar khi cuộn.
 */
function initNavbarScroll() {
  const header = document.querySelector('.main-header');
  if (header) {
    let lastScrollTop = 0;
    let isNavTicking = false;

    window.addEventListener('scroll', function () {
      if (!isNavTicking) {
        window.requestAnimationFrame(function () {
          let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Nếu cuộn xuống và đã qua khỏi header
          if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.classList.add('is-hidden');
          } else {
            // Nếu cuộn lên hoặc ở gần đầu trang
            header.classList.remove('is-hidden');
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
          isNavTicking = false;
        });
        isNavTicking = true;
      }
    });
  }
}

/**
 * Hiệu ứng 2: Active state cho các mục trong Navbar.
 */
function initNavbarActiveState() {
  const navLinks = document.querySelectorAll('.main-nav a');
  const currentPageURL = window.location.href;

  navLinks.forEach(link => {
    // Thuộc tính 'link.href' sẽ trả về URL đầy đủ đã được phân giải của liên kết.
    // Chúng ta chỉ cần so sánh nó với URL của trang hiện tại.
    // Đây là cách đơn giản và đáng tin cậy nhất.
    if (link.href === currentPageURL) {
      link.classList.add('active');
      // Nếu bạn chỉ muốn một mục được active, bạn có thể thêm 'return' ở đây
      // để dừng vòng lặp sớm, nhưng với cấu trúc hiện tại thì không cần thiết.
    }
  });
}

/**
 * Hiệu ứng 3: Fade-in cho video nền khi đã sẵn sàng.
 */
function initBackgroundVideo() {
  const video = document.getElementById('bg-video');
  if (video) {
    video.addEventListener('canplay', function () {
      video.classList.add('is-loaded');
    });
  }
}

/**
 * Hiệu ứng Section 2: Làm hiện Text và ảnh khi cuộn tới.
 */
function initSecondSectionAnimation() {
  const secondSection = document.querySelector('.second-section');
  const secondSectionText = document.querySelector('.second-section-text');
  const secondSectionImage = document.querySelector('.second-section-image');

  if (!secondSection || !secondSectionText || !secondSectionImage) {
    console.warn('Second section elements not found. Animation skipped.');
    return;
  }

  const textObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          secondSectionText.classList.add('is-visible');
          secondSectionImage.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  textObserver.observe(secondSection);
}

/**
 * Hiệu ứng Section 3, 4, 5: Các section cuộn co giãn video.
 */
function initScrollVideoSections() {
  const scrollVideoSections = document.querySelectorAll(
    '.scroll-video-section'
  );
  let isTicking = false;

  if (scrollVideoSections.length > 0) {
    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;

          scrollVideoSections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 0 && rect.bottom > windowHeight) {
              // Section đang trong quá trình cuộn
              section.classList.add('is-active-scroll');
              const scrollableHeight = section.offsetHeight - windowHeight;
              const progress = Math.abs(rect.top) / scrollableHeight;
              // Video đạt vị trí cuối cùng khi cuộn 50% để mượt mà hơn
              const clampedProgress = Math.min(1, Math.max(0, progress * 2.0));
              section.style.setProperty('--scroll-progress', clampedProgress);
            } else if (rect.bottom <= windowHeight && rect.top < 0) {
              // Section đã cuộn hết
              section.classList.add('is-active-scroll');
              section.style.setProperty('--scroll-progress', 1);
            } else if (rect.top > 0) {
              // Section chưa bắt đầu cuộn - reset về trạng thái ban đầu
              section.classList.remove('is-active-scroll');
              section.style.setProperty('--scroll-progress', 0);
            } else {
              // Section đã qua khỏi màn hình
              section.classList.remove('is-active-scroll');
              section.style.setProperty('--scroll-progress', 0);
            }
          });
          isTicking = false;
        });
        isTicking = true;
      }
    });
  }
}

/**
 * Hiệu ứng Section 7: Section Project Stack (Reveal on Scroll).
 */
function initProjectStackAnimation() {
  const projectSection = document.querySelector('.project-section');
  let isStackTicking = false;

  if (projectSection && window.innerWidth > 1024) {
    const imageCards = projectSection.querySelectorAll('.project-image-card');

    if (imageCards.length > 0) {
      imageCards[0].classList.add('is-active');

      window.addEventListener('scroll', () => {
        if (!isStackTicking) {
          window.requestAnimationFrame(() => {
            const rect = projectSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const numImages = imageCards.length;

            if (rect.top <= 0 && rect.bottom > windowHeight) {
              const scrollableHeight =
                projectSection.offsetHeight - windowHeight;
              const scrolledAmount = Math.abs(rect.top);
              const progress = scrolledAmount / scrollableHeight;
              let activeIndex = Math.floor(progress * numImages);
              activeIndex = Math.min(numImages - 1, activeIndex);

              imageCards.forEach((card, index) => {
                card.classList.toggle('is-active', index === activeIndex);
              });
            }
            isStackTicking = false;
          });
          isStackTicking = true;
        }
      });
    }
  }
}

/**
 * Hiệu ứng Accordion cho Section 3, 4, 5: Xổ xuống/thu gọn nội dung
 */
function initAccordionEffect() {
  // Lấy tất cả các section có accordion
  const scrollVideoSections = document.querySelectorAll(
    '.scroll-video-section'
  );

  scrollVideoSections.forEach(section => {
    const accordionBoxes = section.querySelectorAll('.scroll-video-desc-box');

    accordionBoxes.forEach((box, index) => {
      const header = box.querySelector('.accordion-header');
      const content = box.querySelector('.accordion-content');

      if (header && content) {
        header.addEventListener('click', () => {
          // Mục đầu tiên (index 0) luôn mở, không thể đóng
          if (index === 0) {
            // Nếu click vào mục đầu tiên, chỉ mở nó và đóng các mục khác trong cùng section
            accordionBoxes.forEach((otherBox, otherIndex) => {
              if (otherIndex !== 0) {
                otherBox.classList.remove('scroll-video-desc-box--active');
                const otherContent =
                  otherBox.querySelector('.accordion-content');
                if (otherContent) {
                  otherContent.classList.remove('accordion-content--active');
                }
              }
            });
            // Đảm bảo mục đầu tiên luôn mở
            box.classList.add('scroll-video-desc-box--active');
            content.classList.add('accordion-content--active');
          } else {
            // Các mục khác hoạt động bình thường
            const isActive = box.classList.contains(
              'scroll-video-desc-box--active'
            );

            // Đóng tất cả các mục khác trong cùng section
            accordionBoxes.forEach(otherBox => {
              otherBox.classList.remove('scroll-video-desc-box--active');
              const otherContent = otherBox.querySelector('.accordion-content');
              if (otherContent) {
                otherContent.classList.remove('accordion-content--active');
              }
            });

            // Mở mục được click
            box.classList.add('scroll-video-desc-box--active');
            content.classList.add('accordion-content--active');
          }
        });
      }
    });
  });
}

/**
 * Hiệu ứng Drag cho Section 6: Kéo thả để xem ảnh marquee
 */
function initTeamMarqueeDrag() {
  const marqueeWrapper = document.querySelector('.image-marquee-wrapper');
  const marquee = document.querySelector('.image-marquee');

  if (!marqueeWrapper || !marquee) {
    console.warn('Team marquee elements not found. Drag effect skipped.');
    return;
  }

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let initialTransform = 0;

  // Mouse events
  marqueeWrapper.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    marquee.classList.add('dragging');

    // Lấy transform hiện tại
    const computedStyle = window.getComputedStyle(marquee);
    const matrix = computedStyle.transform;
    if (matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      initialTransform = parseFloat(values[4]) || 0;
    }

    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    currentX = e.clientX - startX;
    const newTransform = initialTransform + currentX;
    marquee.style.transform = `translateX(${newTransform}px)`;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      marquee.classList.remove('dragging');
      marquee.style.transform = '';
    }
  });

  // Touch events for mobile
  marqueeWrapper.addEventListener('touchstart', e => {
    isDragging = true;
    startX = e.touches[0].clientX;
    marquee.classList.add('dragging');

    // Lấy transform hiện tại
    const computedStyle = window.getComputedStyle(marquee);
    const matrix = computedStyle.transform;
    if (matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      initialTransform = parseFloat(values[4]) || 0;
    }

    e.preventDefault();
  });

  document.addEventListener('touchmove', e => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX - startX;
    const newTransform = initialTransform + currentX;
    marquee.style.transform = `translateX(${newTransform}px)`;

    e.preventDefault();
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      marquee.classList.remove('dragging');
      marquee.style.transform = '';
    }
  });
}

// =================================================================
// 3. INITIALIZATION
// =================================================================

/**
 * Chạy tất cả các hàm khởi tạo sau khi DOM đã tải xong.
 */
document.addEventListener('DOMContentLoaded', function () {
  // 1. Khởi tạo các thành phần UI chung
  initNavbarScroll();
  initNavbarActiveState();

  // 2. Khởi tạo các hiệu ứng theo từng section
  initBackgroundVideo(); // Section 1
  initSecondSectionAnimation(); // Section 2
  initScrollVideoSections(); // Section 3, 4, 5
  initAccordionEffect(); // Section 3, 4, 5 - Accordion effect
  initTeamMarqueeDrag(); // Section 6 - Drag effect
  initProjectStackAnimation(); // Section 7
});
