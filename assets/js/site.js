(() => {
  const linkedinLink = document.getElementById("linkedin-link");
  const toolsButton = document.getElementById("tools-button");
  const toolsModal = document.getElementById("tools-modal");
  const closeToolsModalButton = document.getElementById("close-tools-modal");
  const contactButton = document.getElementById("contact-button");
  const contactModal = document.getElementById("contact-modal");
  const closeContactModalButton = document.getElementById("close-contact-modal");
  const modals = [
    {
      trigger: toolsButton,
      modal: toolsModal,
      closeButton: closeToolsModalButton,
    },
    {
      trigger: contactButton,
      modal: contactModal,
      closeButton: closeContactModalButton,
    },
  ];
  let elementFocusedBeforeModal = null;
  let activeModal = null;

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

  const openModal = (modalDefinition) => {
    if (!modalDefinition?.modal) {
      return;
    }

    elementFocusedBeforeModal = document.activeElement;
    activeModal = modalDefinition;
    modalDefinition.modal.classList.remove("hidden");
    modalDefinition.modal.classList.add("flex");
    modalDefinition.modal.setAttribute("aria-hidden", "false");
    modalDefinition.modal.removeAttribute("inert");
    modalDefinition.closeButton?.focus();
  };

  const closeModal = (modalDefinition = activeModal) => {
    if (!modalDefinition?.modal || modalDefinition.modal.classList.contains("hidden")) {
      return;
    }

    modalDefinition.modal.classList.add("hidden");
    modalDefinition.modal.classList.remove("flex");
    modalDefinition.modal.setAttribute("aria-hidden", "true");
    modalDefinition.modal.setAttribute("inert", "");

    if (elementFocusedBeforeModal instanceof HTMLElement) {
      elementFocusedBeforeModal.focus();
    }

    if (activeModal === modalDefinition) {
      activeModal = null;
    }
  };

  const keepFocusInsideModal = (event) => {
    if (
      event.key !== "Tab" ||
      !activeModal?.modal ||
      activeModal.modal.classList.contains("hidden")
    ) {
      return;
    }

    const focusableElements = activeModal.modal.querySelectorAll(
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

  for (const modalDefinition of modals) {
    modalDefinition.trigger?.addEventListener("click", () => openModal(modalDefinition));
    modalDefinition.closeButton?.addEventListener("click", () => closeModal(modalDefinition));
    modalDefinition.modal?.addEventListener("click", (event) => {
      if (event.target === modalDefinition.modal) {
        closeModal(modalDefinition);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    keepFocusInsideModal(event);

    if (event.key === "Escape") {
      closeModal();
    }
  });
})();
