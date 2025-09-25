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

// Hiệu ứng 2: Fade-in cho video nền khi đã sẵn sàng.
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

// SECTION 2 - ABOUT US SECTION EFFECTS
//Hiệu ứng hover cho danh sách dịch vụ - thay đổi ảnh tương ứng
function initServiceHoverEffect() {
  const serviceItems = document.querySelectorAll(".service-item");
  const serviceImages = document.querySelectorAll(".service-image");

  if (serviceItems.length === 0) return;

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

// SECTION 4 - DESIGN PHILOSOPHY SECTION EFFECTS
function initPhilosophyFadeIn() {
  const philosophyText = document.querySelector(".philosophy-text");

  if (!philosophyText) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Khi section 4 xuất hiện trong viewport, thêm class fade-in
          philosophyText.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.3, // Kích hoạt khi 30% của element hiển thị
      rootMargin: "0px 0px -100px 0px", // Kích hoạt sớm hơn 100px
    }
  );

  observer.observe(philosophyText);
}

// SECTION 5 - EXPERTISE SECTION EFFECTS
function initExpertiseAccordion() {
  const expertiseBoxes = document.querySelectorAll(".expertise-desc-box");
  const expertiseImages = document.querySelectorAll(".expertise-image");

  if (expertiseBoxes.length === 0) return;

  expertiseBoxes.forEach((box) => {
    const header = box.querySelector(".accordion-header");
    const content = box.querySelector(".accordion-content");
    const expertiseType = box.getAttribute("data-expertise");

    header.addEventListener("click", () => {
      // Nếu box hiện tại đã active, không làm gì (không cho phép đóng)
      if (box.classList.contains("expertise-desc-box--active")) {
        return;
      }

      // Đóng tất cả các box khác
      expertiseBoxes.forEach((otherBox) => {
        otherBox.classList.remove("expertise-desc-box--active");
        otherBox
          .querySelector(".accordion-content")
          .classList.remove("accordion-content--active");
      });

      // Mở box hiện tại
      box.classList.add("expertise-desc-box--active");
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
  initContactDropdown();
  // Section 2 - About Us Section Effects
  initServiceHoverEffect();

  // Section 4 - Design Philosophy Section Effects
  initPhilosophyFadeIn();

  // Section 5 - Expertise Section Effects
  initExpertiseAccordion();

  // Section 6 - Team Marquee Effects
  initTeamMarquee();

  // Section 7 - Service Section Effects
  initServiceClickEffect();

  // Initialize phone popup
  initPhonePopup();
});
