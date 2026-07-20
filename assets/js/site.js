(() => {
  const linkedinLink = document.getElementById("linkedin-link");
  const contactButton = document.getElementById("contact-button");
  const contactModal = document.getElementById("contact-modal");
  const closeContactModalButton = document.getElementById("close-contact-modal");
  let elementFocusedBeforeModal = null;

  if (linkedinLink) {
    linkedinLink.addEventListener("click", (event) => {
      event.preventDefault();
      const disabledMessage = linkedinLink.dataset.disabledMessage;

      if (disabledMessage) {
        linkedinLink.textContent = disabledMessage;
      }

      linkedinLink.setAttribute("aria-disabled", "true");
    });
  }

  const openContactModal = () => {
    if (!contactModal) {
      return;
    }

    elementFocusedBeforeModal = document.activeElement;
    contactModal.classList.remove("hidden");
    contactModal.classList.add("flex");
    contactModal.setAttribute("aria-hidden", "false");
    contactModal.removeAttribute("inert");
    closeContactModalButton?.focus();
  };

  const closeContactModal = () => {
    if (!contactModal || contactModal.classList.contains("hidden")) {
      return;
    }

    contactModal.classList.add("hidden");
    contactModal.classList.remove("flex");
    contactModal.setAttribute("aria-hidden", "true");
    contactModal.setAttribute("inert", "");

    if (elementFocusedBeforeModal instanceof HTMLElement) {
      elementFocusedBeforeModal.focus();
    }
  };

  const keepFocusInsideModal = (event) => {
    if (
      event.key !== "Tab" ||
      !contactModal ||
      contactModal.classList.contains("hidden")
    ) {
      return;
    }

    const focusableElements = contactModal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  };

  contactButton?.addEventListener("click", openContactModal);
  closeContactModalButton?.addEventListener("click", closeContactModal);

  contactModal?.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    keepFocusInsideModal(event);

    if (event.key === "Escape") {
      closeContactModal();
    }
  });
})();
