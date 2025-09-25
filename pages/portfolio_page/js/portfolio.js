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
        // Redirect to contacts page
        window.location.href = "../contacts_page/contacts.html";
      }
    });
  });
}

// FILTER SIDEBAR FUNCTIONALITY
function initFilterSidebar() {
  const filterSidebar = document.getElementById("filterSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const closeSidebar = document.getElementById("closeSidebar");
  const filtersHeader = document.querySelector(".filters-header");
  const filterOptions = document.querySelectorAll(".filter-option");
  const resetFilters = document.getElementById("resetFilters");
  const applyFilters = document.getElementById("applyFilters");
  const searchInput = document.querySelector(".search-input");

  // Open sidebar when clicking filter button
  if (filtersHeader) {
    filtersHeader.addEventListener("click", () => {
      openSidebar();
    });
  }

  // Close sidebar functions
  function closeSidebarFunc() {
    filterSidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function openSidebar() {
    filterSidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close sidebar events
  if (closeSidebar) {
    closeSidebar.addEventListener("click", closeSidebarFunc);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebarFunc);
  }

  // ESC key to close sidebar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && filterSidebar.classList.contains("active")) {
      closeSidebarFunc();
    }
  });

  // Filter option selection
  filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const parent = option.closest(".filter-options");
      const siblings = parent.querySelectorAll(".filter-option");

      // Remove active class from siblings
      siblings.forEach((sibling) => sibling.classList.remove("active"));

      // Add active class to clicked option
      option.classList.add("active");
    });
  });

  // Reset filters
  if (resetFilters) {
    resetFilters.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset all filter options
      filterOptions.forEach((option) => {
        option.classList.remove("active");
      });

      // Set default active options
      const defaultOptions = document.querySelectorAll(
        '[data-filter="all"], [data-filter="100-300"], [data-filter="hotels"]'
      );
      defaultOptions.forEach((option) => {
        option.classList.add("active");
      });

      // Clear search input
      if (searchInput) {
        searchInput.value = "";
      }
    });
  }

  // Apply filters
  if (applyFilters) {
    applyFilters.addEventListener("click", () => {
      const selectedFilters = getSelectedFilters();
      console.log("Selected filters:", selectedFilters);

      // Here you can implement the actual filtering logic
      // For now, we'll just close the sidebar
      closeSidebarFunc();

      // You can add filtering logic here based on selectedFilters
      filterProjects(selectedFilters);
    });
  }

  // Get selected filters
  function getSelectedFilters() {
    const filters = {
      direction: null,
      square: null,
      objectType: null,
      tone: null,
      search: searchInput ? searchInput.value.trim() : "",
    };

    filterOptions.forEach((option) => {
      if (option.classList.contains("active")) {
        const filterValue = option.getAttribute("data-filter");
        const parent = option.closest(".filter-section");
        const title = parent.querySelector(".filter-title").textContent;

        if (title.includes("HƯỚNG")) {
          filters.direction = filterValue;
        } else if (title.includes("DIỆN TÍCH")) {
          filters.square = filterValue;
        } else if (title.includes("LOẠI ĐỐI TƯỢNG")) {
          filters.objectType = filterValue;
        } else if (title.includes("TÔNG MÀU")) {
          filters.tone = filterValue;
        }
      }
    });

    return filters;
  }

  // Filter projects based on selected criteria
  function filterProjects(filters) {
    const projectItems = document.querySelectorAll(".project-item");

    projectItems.forEach((item) => {
      let shouldShow = true;

      // You can implement more sophisticated filtering logic here
      // For now, we'll just show all projects
      // In a real implementation, you would check project attributes
      // against the selected filters

      if (shouldShow) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
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

// Portfolio Slideshow
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto-advance slides every 3 seconds
  setInterval(nextSlide, 3000);

  // Initialize first slide
  showSlide(0);

  // Initialize contact dropdown
  initContactDropdown();

  // Initialize filter sidebar
  initFilterSidebar();

  // Initialize phone popup
  initPhonePopup();
});
