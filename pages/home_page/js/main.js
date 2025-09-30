// SECTION 1 - FIRST SECTION EFFECTS
// Hiệu ứng 1: Ẩn/hiện Navbar khi cuộn.
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
 * Hiệu ứng 2: Fade-in cho video nền khi đã sẵn sàng.
 */
function initBackgroundVideo() {
  const video = document.getElementById("bg-video");
  if (video) {
    video.addEventListener("canplay", function () {
      video.classList.add("is-loaded");
    });
  }
}

// CONTACT DROPDOWN EFFECTS
function initContactDropdown() {
  const contactDropdown = document.querySelector(".contact-dropdown");
  const contactMainBtn = document.querySelector(".contact-main-btn");
  const contactDropdownMenu = document.querySelector(".contact-dropdown-menu");
  const header = document.querySelector(".main-header");

  if (!contactDropdown || !contactMainBtn || !contactDropdownMenu) return;

  // Toggle dropdown on button click
  contactMainBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    contactDropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!contactDropdown.contains(e.target)) {
      contactDropdown.classList.remove("active");
    }
  });

  // Close dropdown when navbar is hidden
  if (header) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (header.classList.contains("is-hidden")) {
            contactDropdown.classList.remove("active");
          }
        }
      });
    });

    observer.observe(header, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  // Close dropdown when clicking on dropdown items
  const dropdownItems = document.querySelectorAll(".contact-dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      contactDropdown.classList.remove("active");

      // Handle specific actions
      if (item.classList.contains("whatsapp-btn")) {
        // Open WhatsApp (you can customize the phone number)
        window.open("https://wa.me/971585624554", "_blank");
      } else if (item.classList.contains("submit-btn")) {
        // Scroll to contact form or open contact page
        const contactSection = document.querySelector(".team-consultation");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

// SECTION 2 - SECOND SECTION EFFECTS
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
      threshold: 0.3, // Kích hoạt khi 100% section hiển thị
    }
  );

  textObserver.observe(secondSection);
}

// SECTION 3 - SCROLL VIDEO SECTION EFFECTS
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
              // Section đang trong quá trình cuộn
              section.classList.add("is-active-scroll");
              const scrollableHeight = section.offsetHeight - windowHeight;
              const progress = Math.abs(rect.top) / scrollableHeight;
              // Video đạt vị trí cuối cùng khi cuộn 50% để mượt mà hơn
              const clampedProgress = Math.min(1, Math.max(0, progress * 2.0));
              section.style.setProperty("--scroll-progress", clampedProgress);
            } else if (rect.bottom <= windowHeight && rect.top < 0) {
              // Section đã cuộn hết
              section.classList.add("is-active-scroll");
              section.style.setProperty("--scroll-progress", 1);
            } else if (rect.top > 0) {
              // Section chưa bắt đầu cuộn - reset về trạng thái ban đầu
              section.classList.remove("is-active-scroll");
              section.style.setProperty("--scroll-progress", 0);
            } else {
              // Section đã qua khỏi màn hình
              section.classList.remove("is-active-scroll");
              section.style.setProperty("--scroll-progress", 0);
            }
          });
          isTicking = false;
        });
        isTicking = true;
      }
    });
  }
}

//Hiệu ứng Accordion cho Section 3, 4, 5: Xổ xuống/thu gọn nội dung
function initAccordionEffect() {
  // Lấy tất cả các section có accordion
  const scrollVideoSections = document.querySelectorAll(
    ".scroll-video-section"
  );

  scrollVideoSections.forEach((section) => {
    const accordionBoxes = section.querySelectorAll(".scroll-video-desc-box");

    accordionBoxes.forEach((box, index) => {
      const header = box.querySelector(".accordion-header");
      const content = box.querySelector(".accordion-content");

      if (header && content) {
        header.addEventListener("click", () => {
          // Mục đầu tiên (index 0) luôn mở, không thể đóng
          if (index === 0) {
            // Nếu click vào mục đầu tiên, chỉ mở nó và đóng các mục khác trong cùng section
            accordionBoxes.forEach((otherBox, otherIndex) => {
              if (otherIndex !== 0) {
                otherBox.classList.remove("scroll-video-desc-box--active");
                const otherContent =
                  otherBox.querySelector(".accordion-content");
                if (otherContent) {
                  otherContent.classList.remove("accordion-content--active");
                }
              }
            });
            // Đảm bảo mục đầu tiên luôn mở
            box.classList.add("scroll-video-desc-box--active");
            content.classList.add("accordion-content--active");
          } else {
            // Các mục khác hoạt động bình thường
            const isActive = box.classList.contains(
              "scroll-video-desc-box--active"
            );

            // Đóng tất cả các mục khác trong cùng section
            accordionBoxes.forEach((otherBox) => {
              otherBox.classList.remove("scroll-video-desc-box--active");
              const otherContent = otherBox.querySelector(".accordion-content");
              if (otherContent) {
                otherContent.classList.remove("accordion-content--active");
              }
            });

            // Mở mục được click
            box.classList.add("scroll-video-desc-box--active");
            content.classList.add("accordion-content--active");
          }
        });
      }
    });
  });
}

// SECTION 6 - TEAM MARQUEE EFFECTS
function initTeamMarquee() {
  const marquee = document.getElementById("team-marquee");
  if (!marquee) return;

  const items = marquee.querySelectorAll(".marquee-item");
  if (items.length === 0) return;

  let currentPosition = 0;
  const speed = 1.2; // pixels per frame - có thể điều chỉnh tốc độ
  let isPaused = false;

  // Tính toán chiều rộng của một ảnh (bao gồm gap)
  const itemWidth = items[0].offsetWidth + 16; // width + gap (1rem = 16px)
  const totalWidth = itemWidth * 5; // 5 ảnh đầu tiên

  function animate() {
    if (!isPaused) {
      currentPosition -= speed;

      // Khi đã di chuyển qua 5 ảnh đầu tiên, reset về 0 để tạo vòng lặp seamless
      if (currentPosition <= -totalWidth) {
        currentPosition = 0;
      }

      marquee.style.transform = `translateX(${currentPosition}px)`;
    }

    requestAnimationFrame(animate);
  }

  // Bắt đầu animation
  animate();

  // Pause animation on hover
  marquee.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  marquee.addEventListener("mouseleave", () => {
    isPaused = false;
  });
}

// SECTION 7 - PROJECT SECTION EFFECTS
function initProjectStackAnimation() {
  const projectSection = document.querySelector(".project-section");
  let isStackTicking = false;

  if (projectSection) {
    const imageCards = projectSection.querySelectorAll(".project-image-card");
    console.log("Project section found with", imageCards.length, "cards");

    if (imageCards.length > 0) {
      // Khởi tạo: chỉ ảnh đầu tiên hiển thị
      imageCards.forEach((card, index) => {
        card.classList.toggle("is-active", index === 0);
      });

      window.addEventListener("scroll", () => {
        if (!isStackTicking) {
          window.requestAnimationFrame(() => {
            const rect = projectSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const numImages = imageCards.length;

            console.log(
              "Section rect:",
              rect.top,
              rect.bottom,
              "Window height:",
              windowHeight
            );

            if (rect.top <= 0 && rect.bottom > 0) {
              const scrollableHeight =
                projectSection.offsetHeight - windowHeight;
              const scrolledAmount = Math.abs(rect.top);
              const progress = Math.min(scrolledAmount / scrollableHeight, 1);

              // Tính toán index dựa trên progress
              let activeIndex = Math.floor(progress * numImages);
              activeIndex = Math.min(numImages - 1, Math.max(0, activeIndex));

              console.log("Progress:", progress, "Active index:", activeIndex);

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

// PHONE POPUP FUNCTIONALITY
function initPhonePopup() {
  const phonePopup = document.getElementById("phonePopup");
  const phonePopupOverlay = document.getElementById("phonePopupOverlay");
  const closePhonePopup = document.getElementById("closePhonePopup");
  const fixedCallButton = document.querySelector(".fixed-call-button");
  const whatsappButton = document.getElementById("whatsappButton");

  // Open popup when clicking fixed call button
  if (fixedCallButton) {
    fixedCallButton.addEventListener("click", (e) => {
      e.preventDefault();
      openPhonePopup();
    });
  }

  // Close popup functions
  function closePhonePopupFunc() {
    phonePopup.classList.remove("active");
    phonePopupOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function openPhonePopup() {
    phonePopup.classList.add("active");
    phonePopupOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close popup events
  if (closePhonePopup) {
    closePhonePopup.addEventListener("click", closePhonePopupFunc);
  }

  if (phonePopupOverlay) {
    phonePopupOverlay.addEventListener("click", closePhonePopupFunc);
  }

  // ESC key to close popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && phonePopup.classList.contains("active")) {
      closePhonePopupFunc();
    }
  });

  // WhatsApp button functionality
  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
      // Open WhatsApp with the same number as in contact dropdown
      window.open("https://wa.me/971585624554", "_blank");
      // Close popup after clicking
      closePhonePopupFunc();
    });
  }
}

// Chạy tất cả các hàm khởi tạo sau khi DOM đã tải xong.
document.addEventListener("DOMContentLoaded", function () {
  // Section 1 - First Section Effects
  initNavbarScroll();
  initBackgroundVideo();
  initContactDropdown(); // Contact Dropdown Effects

  // Section 2 - Second Section Effects
  initSecondSectionAnimation();

  // Section 3 - Scroll Video Sections Effects
  initScrollVideoSections();
  initAccordionEffect();

  // Section 6 - Team Marquee Effects
  initTeamMarquee();

  // Section 7 - Project Section Effects
  initProjectStackAnimation();

  // Initialize phone popup
  initPhonePopup();

  // Initialize hamburger menu
  initHamburgerMenu();
});

// HAMBURGER MENU FUNCTIONALITY
function initHamburgerMenu() {
  const hamburgerMenu = document.querySelector(".mobile-menu-toggle");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const mobileSidebarClose = document.querySelector(".mobile-sidebar-close");
  const mobileSidebarOverlay = document.querySelector(
    ".mobile-sidebar-overlay"
  );
  const body = document.body;

  if (!hamburgerMenu || !mobileSidebar) return;

  // Toggle mobile menu
  function toggleMobileMenu() {
    const isActive = mobileSidebar.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Open mobile menu
  function openMobileMenu() {
    hamburgerMenu.classList.add("active");
    mobileSidebar.classList.add("active");
    body.style.overflow = "hidden";
  }

  // Close mobile menu
  function closeMobileMenu() {
    hamburgerMenu.classList.remove("active");
    mobileSidebar.classList.remove("active");
    body.style.overflow = "auto";
  }

  // Event listeners
  hamburgerMenu.addEventListener("click", toggleMobileMenu);

  if (mobileSidebarClose) {
    mobileSidebarClose.addEventListener("click", closeMobileMenu);
  }

  if (mobileSidebarOverlay) {
    mobileSidebarOverlay.addEventListener("click", closeMobileMenu);
  }

  // Close menu when clicking on navigation links
  const navLinks = mobileSidebar.querySelectorAll(".mobile-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileSidebar.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close menu when window is resized to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}
