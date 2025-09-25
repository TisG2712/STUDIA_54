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
        // Scroll to contact form in the same page
        const contactForm = document.querySelector(".contact-form-section");
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: "smooth" });
        }
      }
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

// WHATSAPP SECTION 2 FUNCTIONALITY
function initWhatsAppSection2() {
  const whatsappButton = document.querySelector(
    ".whatsapp-section .whatsapp-button"
  );

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (e) => {
      e.preventDefault();
      // Open WhatsApp with the same number as in contact dropdown
      window.open("https://wa.me/971585624554", "_blank");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Section 1 - First Section Effects
  initNavbarScroll();
  initBackgroundVideo();
  initContactDropdown();
  initPhonePopup();
  initWhatsAppSection2();
});
