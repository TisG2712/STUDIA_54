/**
 * Hiệu ứng 1: Làm hiện Text và ảnh ở Section 2 khi cuộn tới
 */
function initAboutAnimation() {
  const aboutSection = document.querySelector(".about-section");
  const aboutText = document.querySelector(".about-text");
  const imageContainer = document.getElementById("expanding-image-container");

  if (!aboutSection || !aboutText || !imageContainer) {
    console.warn("About section elements not found. Animation skipped.");
    return;
  }

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutText.classList.add("is-visible");
          imageContainer.classList.add("is-visible"); // Kích hoạt hiệu ứng cho ảnh
        }
      });
    },
    {
      threshold: 0.5, // Kích hoạt khi 50% của section hiện ra
    }
  );

  textObserver.observe(aboutSection);
}

/**
 * Hiệu ứng 2: Các section cuộn co giãn video
 */
function initScrollVideoSections() {
  const scrollVideoSections = document.querySelectorAll(
    ".scroll-video-section"
  );
  let isTicking = false; // Biến cờ để kiểm tra

  if (scrollVideoSections.length > 0) {
    window.addEventListener("scroll", () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;

          scrollVideoSections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            // Khi đang cuộn BÊN TRONG vùng active của section
            if (rect.top <= 0 && rect.bottom > windowHeight) {
              section.classList.add("is-active-scroll");

              // Tính toán quãng đường có thể cuộn bên trong section
              const scrollableHeight = section.offsetHeight - windowHeight;
              // Tính tiến trình cuộn (từ 0 đến 1)
              const progress = Math.abs(rect.top) / scrollableHeight;

              // Giới hạn giá trị progress trong khoảng 0 và 1
              const clampedProgress = Math.min(1, Math.max(0, progress));

              // Cập nhật biến CSS trên section hiện tại
              section.style.setProperty("--scroll-progress", clampedProgress);
            }
            // Khi đã cuộn QUA HẾT section (scroll down)
            else if (rect.bottom <= windowHeight && rect.top < 0) {
              // "Ghim" animation ở trạng thái cuối cùng
              section.classList.add("is-active-scroll");
              section.style.setProperty("--scroll-progress", 1);
            } else {
              // Trả về trạng thái ban đầu
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
 * Hiệu ứng 3: Section Project Stack (Reveal on Scroll)
 */
function initProjectStackAnimation() {
  const projectSection = document.querySelector(".project-section");
  let isStackTicking = false; // Biến cờ riêng cho hiệu ứng này
  if (projectSection && window.innerWidth > 1024) {
    const imageCards = projectSection.querySelectorAll(".project-image-card");

    if (imageCards.length > 0) {
      // Kích hoạt ảnh đầu tiên khi tải trang
      imageCards[0].classList.add("is-active");

      window.addEventListener("scroll", () => {
        if (!isStackTicking) {
          window.requestAnimationFrame(() => {
            const rect = projectSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const numImages = imageCards.length;

            // Chỉ tính toán khi section đang trong tầm nhìn và được "dính" lại
            if (rect.top <= 0 && rect.bottom > windowHeight) {
              // Quãng đường có thể cuộn trong khi section dính lại
              const scrollableHeight =
                projectSection.offsetHeight - windowHeight;
              // Lượng đã cuộn qua (giá trị dương)
              const scrolledAmount = Math.abs(rect.top);

              // Tính toán index của ảnh cần active
              // Chia quãng đường cuộn thành các phần bằng nhau cho mỗi ảnh
              const progress = scrolledAmount / scrollableHeight;
              let activeIndex = Math.floor(progress * numImages);

              // Đảm bảo index không vượt quá giới hạn
              activeIndex = Math.min(numImages - 1, activeIndex);

              // Cập nhật class 'is-active' cho tất cả các ảnh
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

/**
 * Hiệu ứng 4: Mở/đóng Mobile Sidebar
 */
function initMobileSidebar() {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const mobileSidebar = document.querySelector(".mobile-sidebar");

  if (menuToggle && mobileSidebar && closeMenu) {
    menuToggle.addEventListener("click", () => {
      mobileSidebar.classList.add("is-open");
    });

    closeMenu.addEventListener("click", () => {
      mobileSidebar.classList.remove("is-open");
    });
  }
}

/**
 * Hiệu ứng 5: Ẩn/hiện Navbar khi cuộn
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
 * Hiệu ứng 6: Active state cho navbar links
 */
function initNavbarActiveState() {
  const navLinks = document.querySelectorAll(".main-nav a");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  // Hàm để xóa active state khỏi tất cả links
  function removeActiveState() {
    navLinks.forEach((link) => link.classList.remove("active"));
    mobileNavLinks.forEach((link) => link.classList.remove("active"));
  }

  // Hàm để thêm active state cho link được click
  function addActiveState(clickedLink) {
    removeActiveState();
    clickedLink.classList.add("active");
  }

  // Xử lý click cho desktop navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định
      addActiveState(this);
    });
  });

  // Xử lý click cho mobile navbar
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định
      addActiveState(this);

      // Đóng mobile sidebar sau khi click
      const mobileSidebar = document.querySelector(".mobile-sidebar");
      if (mobileSidebar) {
        mobileSidebar.classList.remove("is-open");
      }
    });
  });

  // Xử lý focus state (khi dùng keyboard navigation)
  [...navLinks, ...mobileNavLinks].forEach((link) => {
    link.addEventListener("focus", function () {
      removeActiveState();
      this.classList.add("active");
    });
  });
}

/**
 * Chạy tất cả các hàm khởi tạo sau khi DOM đã tải xong
 */
document.addEventListener("DOMContentLoaded", function () {
  initAboutAnimation();
  initScrollVideoSections();
  initProjectStackAnimation();
  initMobileSidebar();
  initNavbarScroll();
  initNavbarActiveState();
});
