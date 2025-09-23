// =================================================================
// SECTION 1 - FIRST SECTION EFFECTS
// =================================================================

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

// =================================================================
// SECTION 2 - ABOUT US SECTION EFFECTS
// =================================================================

/**
 * Hiệu ứng hover cho danh sách dịch vụ - thay đổi ảnh tương ứng
 */
function initServiceHoverEffect() {
  const serviceItems = document.querySelectorAll(".service-item");
  const serviceImages = document.querySelectorAll(".service-image");

  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const imageType = this.getAttribute("data-image");

      // Ẩn tất cả ảnh
      serviceImages.forEach((img) => {
        img.classList.remove("active");
      });

      // Hiện ảnh tương ứng
      const targetImage = document.querySelector(
        `.service-image[data-service="${imageType}"]`
      );
      if (targetImage) {
        targetImage.classList.add("active");
      }
    });
  });
}

// =================================================================
// SECTION 3 - TIMELINE SECTION EFFECTS
// =================================================================

/**
 * Hiệu ứng fade in cho section khi scroll
 */
function initFadeInEffect() {
  const fadeElements = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Timeline auto-play functionality
 */
function initTimelineAutoPlay() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const contentItems = document.querySelectorAll(".content-item");
  const timeline = document.querySelector(".timeline");
  let currentIndex = 0;
  const totalItems = timelineItems.length;

  function showTimelineItem(index) {
    // Remove active class from all items
    timelineItems.forEach((item) => item.classList.remove("active"));
    contentItems.forEach((item) => item.classList.remove("active"));

    // Add active class to current items
    if (timelineItems[index]) {
      timelineItems[index].classList.add("active");
    }
    if (contentItems[index]) {
      contentItems[index].classList.add("active");
    }

    // Update timeline progress
    const progress = ((index + 1) / totalItems) * 100;
    if (timeline) {
      timeline.style.setProperty("--timeline-progress", progress + "%");
    }
  }

  function nextTimelineItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showTimelineItem(currentIndex);
  }

  // Auto-play every 3 seconds
  setInterval(nextTimelineItem, 3000);

  // Manual click functionality
  timelineItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      showTimelineItem(currentIndex);
    });
  });

  // Initialize with first item
  showTimelineItem(0);
}

// =================================================================
// SECTION 5 - EXPERTISE SECTION EFFECTS
// =================================================================

/**
 * Hiệu ứng accordion cho section 5 - chuyên môn
 */
function initExpertiseAccordion() {
  const expertiseBoxes = document.querySelectorAll(".scroll-video-desc-box");
  const expertiseImages = document.querySelectorAll(".expertise-image");

  expertiseBoxes.forEach((box) => {
    const header = box.querySelector(".accordion-header");
    const content = box.querySelector(".accordion-content");
    const expertiseType = box.getAttribute("data-expertise");

    header.addEventListener("click", () => {
      // Nếu box hiện tại đã active, không làm gì (không cho phép đóng)
      if (box.classList.contains("scroll-video-desc-box--active")) {
        return;
      }

      // Đóng tất cả các box khác
      expertiseBoxes.forEach((otherBox) => {
        otherBox.classList.remove("scroll-video-desc-box--active");
        otherBox
          .querySelector(".accordion-content")
          .classList.remove("accordion-content--active");
      });

      // Mở box hiện tại
      box.classList.add("scroll-video-desc-box--active");
      content.classList.add("accordion-content--active");

      // Thay đổi ảnh tương ứng
      expertiseImages.forEach((img) => {
        img.classList.remove("active");
      });

      const targetImage = document.querySelector(
        `.expertise-image[data-expertise="${expertiseType}"]`
      );
      if (targetImage) {
        targetImage.classList.add("active");
      }
    });
  });
}

// =================================================================
// INITIALIZATION
// =================================================================

/**
 * Chạy tất cả các hàm khởi tạo sau khi DOM đã tải xong.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Section 1 - First Section Effects
  initNavbarScroll();
  initNavbarActiveState();
  initBackgroundVideo();

  // Section 2 - About Us Section Effects
  initServiceHoverEffect();

  // Section 3 - Timeline Section Effects
  initFadeInEffect();
  initTimelineAutoPlay();

  // Section 5 - Expertise Section Effects
  initExpertiseAccordion();

  // Section 7 - Service Section Effects
  initServiceScrollEffect();
  initServiceClickEffect();
});

/**
 * Section 7 - Service Section: Hiệu ứng scroll và highlight
 */
function initServiceScrollEffect() {
  const serviceSection = document.querySelector(".seventh-section");
  const serviceItems = serviceSection.querySelectorAll(".service-desc-item");
  const serviceImages = serviceSection.querySelectorAll(".service-image");

  if (!serviceSection || serviceItems.length === 0) return;

  let isTicking = false;
  let isManualClick = false; // Flag để biết có click thủ công không

  window.addEventListener("scroll", () => {
    if (!isTicking && !window.isManualClick) {
      // Chỉ chạy scroll effect khi không có click thủ công
      window.requestAnimationFrame(() => {
        const rect = serviceSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= 0 && rect.bottom > windowHeight) {
          // Section đang trong viewport
          const scrollableHeight = serviceSection.offsetHeight - windowHeight;
          const scrolledAmount = Math.abs(rect.top);
          const progress = Math.min(scrolledAmount / scrollableHeight, 1);

          // Tính toán item nào đang active dựa trên scroll progress
          const itemCount = serviceItems.length;
          const activeIndex = Math.floor(progress * itemCount);
          const clampedIndex = Math.min(activeIndex, itemCount - 1);

          // Update active states với smooth transition
          serviceItems.forEach((item, index) => {
            if (index === clampedIndex) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });

          serviceImages.forEach((image, index) => {
            if (index === clampedIndex) {
              image.classList.add("active");
            } else {
              image.classList.remove("active");
            }
          });
        } else if (rect.top > 0) {
          // Section chưa vào viewport - reset về item đầu tiên
          serviceItems.forEach((item, index) => {
            if (index === 0) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });

          serviceImages.forEach((image, index) => {
            if (index === 0) {
              image.classList.add("active");
            } else {
              image.classList.remove("active");
            }
          });
        }
        isTicking = false;
      });
      isTicking = true;
    }
  });

  // Reset manual click flag sau 2 giây
  setInterval(() => {
    isManualClick = false;
  }, 2000);
}

/**
 * Section 7 - Service Section: Hiệu ứng click
 */
function initServiceClickEffect() {
  const serviceSection = document.querySelector(".seventh-section");
  if (!serviceSection) return;

  const serviceItems = serviceSection.querySelectorAll(".service-desc-item");
  const serviceImages = serviceSection.querySelectorAll(".service-image");

  console.log("Service items found:", serviceItems.length);
  console.log("Service images found:", serviceImages.length);

  serviceItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log(`Clicking item ${index}`);

      // Set manual click flag
      window.isManualClick = true;

      // Remove active class from all items
      serviceItems.forEach((si) => {
        si.classList.remove("active");
        console.log("Removed active from item");
      });

      serviceImages.forEach((si) => {
        si.classList.remove("active");
        console.log("Removed active from image");
      });

      // Lấy giá trị data-service từ mục được click
      const serviceType = item.getAttribute("data-service");

      // Tìm ảnh tương ứng bằng data-service
      const targetImage = serviceSection.querySelector(
        `.service-image[data-service="${serviceType}"]`
      );

      // Thêm class active cho mục được click và ảnh tương ứng
      item.classList.add("active");
      if (targetImage) {
        targetImage.classList.add("active");
        console.log(`Image with data-service="${serviceType}" is now active`);
      }

      console.log(`Item ${index} is now active`);

      // Reset flag after a short delay
      setTimeout(() => {
        window.isManualClick = false;
        console.log("Manual click flag reset");
      }, 1000);
    });
  });
}
