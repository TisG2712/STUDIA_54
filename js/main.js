// SECTION 1
/**
 * Hiệu ứng 1: Ẩn/hiện Navbar khi cuộn.
 */
function initNavbarScroll() {
  const header = document.querySelector(".main-header");
  if (header) {
    let lastScrollTop = 0;
    let isNavTicking = false;

    window.addEventListener("scroll", function () {
      if (!isNavTicking) {
        window.requestAnimationFrame(function () {
          let scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          // Nếu cuộn xuống và đã qua khỏi header
          if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.classList.add("is-hidden");
          } else {
            // Nếu cuộn lên hoặc ở gần đầu trang
            header.classList.remove("is-hidden");
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
  const navLinks = document.querySelectorAll(".main-nav a");
  const currentPageURL = window.location.href;

  navLinks.forEach((link) => {
    // Thuộc tính 'link.href' sẽ trả về URL đầy đủ đã được phân giải của liên kết.
    // Chúng ta chỉ cần so sánh nó với URL của trang hiện tại.
    // Đây là cách đơn giản và đáng tin cậy nhất.
    if (link.href === currentPageURL) {
      link.classList.add("active");
      // Nếu bạn chỉ muốn một mục được active, bạn có thể thêm 'return' ở đây
      // để dừng vòng lặp sớm, nhưng với cấu trúc hiện tại thì không cần thiết.
    }
  });
}

/**
 * Hiệu ứng 3: Fade-in cho video nền khi đã sẵn sàng.
 */
function initBackgroundVideo() {
  const video = document.getElementById("bg-video");
  if (video) {
    video.addEventListener("canplay", function () {
      video.classList.add("is-loaded");
    });
  }
}

/**
 * Hiệu ứng Section 2: Làm hiện Text và ảnh khi cuộn tới.
 */
function initSecondSectionAnimation() {
  const secondSection = document.querySelector(".second-section");
  const secondSectionText = document.querySelector(".second-section-text");
  const secondSectionImage = document.querySelector(".second-section-image");

  if (!secondSection || !secondSectionText || !secondSectionImage) {
    console.warn("Second section elements not found. Animation skipped.");
    return;
  }

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          secondSectionText.classList.add("is-visible");
          secondSectionImage.classList.add("is-visible");
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
    ".scroll-video-section"
  );
  let isTicking = false;

  if (scrollVideoSections.length > 0) {
    window.addEventListener("scroll", () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;

          scrollVideoSections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 0 && rect.bottom > windowHeight) {
              section.classList.add("is-active-scroll");
              const scrollableHeight = section.offsetHeight - windowHeight;
              const progress = Math.abs(rect.top) / scrollableHeight;
              const clampedProgress = Math.min(1, Math.max(0, progress));
              section.style.setProperty("--scroll-progress", clampedProgress);
            } else if (rect.bottom <= windowHeight && rect.top < 0) {
              section.classList.add("is-active-scroll");
              section.style.setProperty("--scroll-progress", 1);
            } else {
              section.classList.remove("is-active-scroll");
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
  const projectSection = document.querySelector(".project-section");
  let isStackTicking = false;

  if (projectSection && window.innerWidth > 1024) {
    const imageCards = projectSection.querySelectorAll(".project-image-card");

    if (imageCards.length > 0) {
      imageCards[0].classList.add("is-active");

      window.addEventListener("scroll", () => {
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
                card.classList.toggle("is-active", index === activeIndex);
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

// =================================================================
// 3. INITIALIZATION
// =================================================================

/**
 * Chạy tất cả các hàm khởi tạo sau khi DOM đã tải xong.
 */
document.addEventListener("DOMContentLoaded", function () {
  // 1. Khởi tạo các thành phần UI chung
  initNavbarScroll();
  initNavbarActiveState();

  // 2. Khởi tạo các hiệu ứng theo từng section
  initBackgroundVideo(); // Section 1
  initSecondSectionAnimation(); // Section 2
  initScrollVideoSections(); // Section 3, 4, 5
  initProjectStackAnimation(); // Section 7
});
