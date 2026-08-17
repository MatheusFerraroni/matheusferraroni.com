(() => {
  const GOOGLE_ANALYTICS_ID = "G-RSJNZZF2XW";
  const ANALYTICS_CONSENT_KEY = "personal-website:analytics-consent:v1";
  const CONSENT_GRANTED = "granted";
  const CONSENT_DENIED = "denied";
  const pageLanguage = document.body.dataset.pageLanguage || "pt-BR";
  const supportedPageLanguages = new Set(["pt-BR", "en"]);
  const outboundGroups = new Set([
    "academic-record",
    "professional-profile",
    "publication",
    "project",
    "tool",
  ]);
  const documentKinds = new Set([
    "dissertation",
    "presentation",
    "undergraduate-thesis",
  ]);
  const eventParameterAllowlist = Object.freeze({
    outbound_link_click: new Set(["target_id", "target_group", "page_language"]),
    document_download: new Set(["document_id", "document_kind", "page_language"]),
    contact_open: new Set(["page_language"]),
    tools_open: new Set(["page_language"]),
    language_change: new Set(["target_language"]),
    flow_field_change: new Set(["enabled", "page_language"]),
  });

  const linkedinLink = document.getElementById("linkedin-link");
  const flowFieldToggle = document.getElementById("toggle-flow-field");
  const toolsButton = document.getElementById("tools-button");
  const toolsModal = document.getElementById("tools-modal");
  const closeToolsModalButton = document.getElementById("close-tools-modal");
  const contactButton = document.getElementById("contact-button");
  const contactModal = document.getElementById("contact-modal");
  const closeContactModalButton = document.getElementById("close-contact-modal");
  const consentBanner = document.getElementById("analytics-consent-banner");
  const consentAcceptButton = document.getElementById("analytics-consent-accept");
  const consentRejectButton = document.getElementById("analytics-consent-reject");
  const consentPrivacyButton = document.getElementById("analytics-consent-privacy");
  const privacyFooterButton = document.getElementById("privacy-footer-button");
  const privacyModal = document.getElementById("privacy-modal");
  const closePrivacyModalButton = document.getElementById("close-privacy-modal");
  const privacyStatus = document.getElementById("privacy-status");
  const privacyAllowButton = document.getElementById("privacy-allow");
  const privacyDenyButton = document.getElementById("privacy-deny");
  const privacyContactButton = document.getElementById("privacy-contact-button");

  let currentConsentStatus = null;
  let analyticsInitialized = false;
  let analyticsScriptRequested = false;
  let elementFocusedBeforeModal = null;
  let activeModal = null;
  let suspendedModalContext = null;
  let modalBackgroundState = null;
  let consentBannerResizeObserver = null;

  const hasValidConsentTimestamp = (value) => {
    if (
      typeof value !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
    ) {
      return false;
    }

    const parsedTimestamp = new Date(value);
    return (
      !Number.isNaN(parsedTimestamp.getTime()) &&
      parsedTimestamp.toISOString() === value
    );
  };

  const clearPersistedConsent = () => {
    try {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
      return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === null;
    } catch {
      return false;
    }
  };

  const readConsent = () => {
    try {
      const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
      if (!storedValue) {
        return null;
      }

      const consent = JSON.parse(storedValue);
      const hasValidStatus = consent?.status === CONSENT_GRANTED;
      const hasValidTimestamp = hasValidConsentTimestamp(consent?.updatedAt);

      if (hasValidStatus && hasValidTimestamp) {
        return CONSENT_GRANTED;
      }

      clearPersistedConsent();
      return null;
    } catch {
      clearPersistedConsent();
      return null;
    }
  };

  const persistGrantedConsent = () => {
    try {
      const serializedConsent = JSON.stringify({
        status: CONSENT_GRANTED,
        updatedAt: new Date().toISOString(),
      });
      window.localStorage.setItem(
        ANALYTICS_CONSENT_KEY,
        serializedConsent
      );
      if (window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === serializedConsent) {
        return true;
      }

      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
      return false;
    } catch {
      try {
        window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
      } catch {
        // Storage is unavailable. The in-memory decision remains valid for this document only.
      }

      return false;
    }
  };

  const updateConsentBannerOffset = () => {
    if (!consentBanner || consentBanner.classList.contains("hidden")) {
      document.body.style.removeProperty("padding-bottom");
      return;
    }

    const bannerHeight = Math.ceil(consentBanner.getBoundingClientRect().height);
    document.body.style.paddingBottom = `${bannerHeight}px`;
  };

  const showConsentBanner = () => {
    if (!consentBanner) {
      return;
    }

    consentBanner.classList.remove("hidden");
    consentBanner.setAttribute("aria-hidden", "false");
    consentBanner.removeAttribute("inert");
    window.requestAnimationFrame(updateConsentBannerOffset);

    if (typeof window.ResizeObserver === "function") {
      consentBannerResizeObserver ??= new window.ResizeObserver(updateConsentBannerOffset);
      consentBannerResizeObserver.observe(consentBanner);
    }
  };

  const hideConsentBanner = () => {
    if (!consentBanner) {
      return;
    }

    consentBanner.classList.add("hidden");
    consentBanner.setAttribute("aria-hidden", "true");
    consentBanner.setAttribute("inert", "");
    consentBannerResizeObserver?.disconnect();
    document.body.style.removeProperty("padding-bottom");
  };

  const updatePrivacyStatus = () => {
    const statusValue = privacyStatus?.querySelector("span");
    if (!privacyStatus || !statusValue) {
      return;
    }

    if (currentConsentStatus === CONSENT_GRANTED) {
      statusValue.textContent = privacyStatus.dataset.statusGranted;
    } else if (currentConsentStatus === CONSENT_DENIED) {
      statusValue.textContent = privacyStatus.dataset.statusDenied;
    } else {
      statusValue.textContent = privacyStatus.dataset.statusUndecided;
    }
  };

  const initializeAnalytics = () => {
    if (currentConsentStatus !== CONSENT_GRANTED) {
      return;
    }

    if (!analyticsInitialized) {
      analyticsInitialized = true;
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        window.dataLayer.push(arguments);
      }

      window.gtag = gtag;
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "denied",
      });
      window.gtag("js", new Date());
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "denied",
      });
      window.gtag("config", GOOGLE_ANALYTICS_ID, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: `${window.location.origin}${window.location.pathname}`,
        page_referrer: "",
        send_page_view: false,
      });
      window.gtag("event", "page_view");
    }

    if (
      analyticsScriptRequested ||
      document.querySelector("script[data-google-analytics-tag]")
    ) {
      return;
    }

    analyticsScriptRequested = true;
    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GOOGLE_ANALYTICS_ID
    )}`;
    analyticsScript.dataset.googleAnalyticsTag = GOOGLE_ANALYTICS_ID;
    analyticsScript.addEventListener("error", () => {
      analyticsScriptRequested = false;
      analyticsScript.remove();
    });
    document.head.append(analyticsScript);
  };

  const sanitizeEventParameter = (parameterName, value) => {
    if (parameterName === "enabled") {
      return typeof value === "boolean" ? value : undefined;
    }

    if (parameterName === "page_language" || parameterName === "target_language") {
      return supportedPageLanguages.has(value) ? value : undefined;
    }

    if (parameterName === "target_group") {
      return outboundGroups.has(value) ? value : undefined;
    }

    if (parameterName === "document_kind") {
      return documentKinds.has(value) ? value : undefined;
    }

    if (parameterName === "target_id" || parameterName === "document_id") {
      return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
        ? value
        : undefined;
    }

    return undefined;
  };

  const sendAnalyticsEvent = (eventName, parameters, controls = {}) => {
    const allowedParameters = eventParameterAllowlist[eventName];
    if (
      currentConsentStatus !== CONSENT_GRANTED ||
      !analyticsInitialized ||
      typeof window.gtag !== "function" ||
      !allowedParameters
    ) {
      return false;
    }

    const safeParameters = {};
    for (const parameterName of allowedParameters) {
      const safeValue = sanitizeEventParameter(parameterName, parameters[parameterName]);
      if (safeValue !== undefined) {
        safeParameters[parameterName] = safeValue;
      }
    }

    if (typeof controls.eventCallback === "function") {
      safeParameters.event_callback = controls.eventCallback;
      safeParameters.event_timeout = controls.eventTimeout ?? 500;
    }

    window.gtag("event", eventName, safeParameters);
    return true;
  };

  const modalDefinitions = [
    {
      modal: toolsModal,
      closeButton: closeToolsModalButton,
      analyticsEvent: "tools_open",
      triggers: [{ element: toolsButton }],
    },
    {
      modal: contactModal,
      closeButton: closeContactModalButton,
      analyticsEvent: "contact_open",
      triggers: [
        { element: contactButton },
        {
          element: privacyContactButton,
          restorePreviousModal: true,
        },
      ],
    },
    {
      modal: privacyModal,
      closeButton: closePrivacyModalButton,
      triggers: [
        { element: consentPrivacyButton },
        { element: privacyFooterButton },
      ],
    },
  ];

  const deactivateModalBackground = (modal) => {
    const elementsMadeInactive = [];

    for (const element of document.body.children) {
      if (
        element === modal ||
        !(element instanceof HTMLElement) ||
        element.matches("script, style") ||
        element.hasAttribute("inert")
      ) {
        continue;
      }

      const previousAriaHidden = element.getAttribute("aria-hidden");
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
      elementsMadeInactive.push({ element, previousAriaHidden });
    }

    modalBackgroundState = {
      bodyOverflow: document.body.style.overflow,
      elementsMadeInactive,
    };
    document.body.style.overflow = "hidden";
  };

  const restoreModalBackground = () => {
    if (!modalBackgroundState) {
      return;
    }

    for (const { element, previousAriaHidden } of
      modalBackgroundState.elementsMadeInactive) {
      element.removeAttribute("inert");

      if (previousAriaHidden === null) {
        element.removeAttribute("aria-hidden");
      } else {
        element.setAttribute("aria-hidden", previousAriaHidden);
      }
    }

    if (modalBackgroundState.bodyOverflow) {
      document.body.style.overflow = modalBackgroundState.bodyOverflow;
    } else {
      document.body.style.removeProperty("overflow");
    }

    modalBackgroundState = null;
  };

  const closeModal = (modalDefinition = activeModal, options = {}) => {
    if (!modalDefinition?.modal || modalDefinition.modal.classList.contains("hidden")) {
      return;
    }

    const modalWasActive = activeModal === modalDefinition;
    const modalContextToRestore =
      modalWasActive && options.restoreSuspendedModal !== false
        ? suspendedModalContext
        : null;

    modalDefinition.modal.classList.add("hidden");
    modalDefinition.modal.classList.remove("flex");
    modalDefinition.modal.setAttribute("aria-hidden", "true");
    modalDefinition.modal.setAttribute("inert", "");
    restoreModalBackground();

    if (modalWasActive) {
      activeModal = null;
      suspendedModalContext = null;
    }

    if (modalContextToRestore) {
      openModal(modalContextToRestore.modalDefinition, {
        returnFocus: modalContextToRestore.returnFocus,
        track: false,
      });
      modalContextToRestore.focusElement?.focus();
      return;
    }

    if (
      options.restoreFocus !== false &&
      elementFocusedBeforeModal instanceof HTMLElement &&
      elementFocusedBeforeModal.isConnected &&
      !elementFocusedBeforeModal.closest("[inert]")
    ) {
      elementFocusedBeforeModal.focus();
    }
  };

  const openModal = (modalDefinition, triggerDefinition) => {
    if (!modalDefinition?.modal) {
      return;
    }

    const triggeringElement = document.activeElement;
    const previousModal = activeModal;
    const previousReturnFocus = elementFocusedBeforeModal;

    if (activeModal && activeModal !== modalDefinition) {
      closeModal(activeModal, {
        restoreFocus: false,
        restoreSuspendedModal: false,
      });
    }

    elementFocusedBeforeModal =
      triggerDefinition?.returnFocus || triggeringElement;
    suspendedModalContext =
      triggerDefinition?.restorePreviousModal && previousModal
        ? {
            modalDefinition: previousModal,
            returnFocus: previousReturnFocus,
            focusElement: triggerDefinition.element,
          }
        : null;
    activeModal = modalDefinition;
    modalDefinition.modal.classList.remove("hidden");
    modalDefinition.modal.classList.add("flex");
    modalDefinition.modal.setAttribute("aria-hidden", "false");
    modalDefinition.modal.removeAttribute("inert");
    deactivateModalBackground(modalDefinition.modal);
    modalDefinition.closeButton?.focus();

    if (modalDefinition.analyticsEvent && triggerDefinition?.track !== false) {
      sendAnalyticsEvent(modalDefinition.analyticsEvent, {
        page_language: pageLanguage,
      });
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

  const expireAnalyticsCookies = () => {
    const analyticsCookieNames = document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0].trim())
      .filter((cookieName) => cookieName.startsWith("_ga"));
    const domainCandidates = new Set([
      window.location.hostname,
      "matheusferraroni.com",
      ".matheusferraroni.com",
    ]);

    for (const cookieName of analyticsCookieNames) {
      document.cookie = `${cookieName}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;

      for (const domain of domainCandidates) {
        document.cookie = `${cookieName}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; SameSite=Lax`;
      }
    }
  };

  const focusVisiblePageContent = () => {
    const viewportHeight = document.documentElement.clientHeight;
    const candidates = Array.from(
      document.querySelectorAll(
        "main h1, main h2, main h3, main p, main article, #privacy-footer-button"
      )
    )
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        return (
          !element.closest('[inert], [aria-hidden="true"]') &&
          rect.width > 0 &&
          rect.height > 0 &&
          visibleHeight >= Math.min(rect.height, 24)
        );
      })
      .sort((firstElement, secondElement) => {
        const priority = (element) => {
          if (/^H[1-3]$/.test(element.tagName)) {
            return 0;
          }

          if (element.tagName === "P") {
            return 1;
          }

          return 2;
        };
        const priorityDifference = priority(firstElement) - priority(secondElement);
        if (priorityDifference !== 0) {
          return priorityDifference;
        }

        const viewportCenter = viewportHeight / 2;
        const firstRect = firstElement.getBoundingClientRect();
        const secondRect = secondElement.getBoundingClientRect();
        const firstDistance = Math.abs(
          firstRect.top + firstRect.height / 2 - viewportCenter
        );
        const secondDistance = Math.abs(
          secondRect.top + secondRect.height / 2 - viewportCenter
        );
        return firstDistance - secondDistance;
      });
    const focusTarget = candidates[0];

    if (!(focusTarget instanceof HTMLElement)) {
      return;
    }

    const previousTabIndex = focusTarget.getAttribute("tabindex");
    if (previousTabIndex === null) {
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.addEventListener(
        "blur",
        () => focusTarget.removeAttribute("tabindex"),
        { once: true }
      );
    }

    focusTarget.focus({ preventScroll: true });
  };

  const finishConsentInteraction = () => {
    const shouldRestoreFooterFocus =
      activeModal?.modal === privacyModal &&
      elementFocusedBeforeModal === privacyFooterButton;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (activeModal?.modal === privacyModal) {
      closeModal(activeModal, {
        restoreFocus: false,
        restoreSuspendedModal: false,
      });
    }

    hideConsentBanner();

    if (shouldRestoreFooterFocus) {
      privacyFooterButton?.focus();
    } else {
      window.requestAnimationFrame(focusVisiblePageContent);
    }
  };

  const allowAnalytics = () => {
    currentConsentStatus = CONSENT_GRANTED;
    persistGrantedConsent();
    updatePrivacyStatus();
    finishConsentInteraction();
    initializeAnalytics();
  };

  const denyAnalytics = () => {
    const shouldReload = analyticsInitialized;
    currentConsentStatus = CONSENT_DENIED;
    const consentCleared = clearPersistedConsent();
    const canReloadFailClosed =
      consentCleared || readConsent() !== CONSENT_GRANTED;
    updatePrivacyStatus();
    finishConsentInteraction();

    expireAnalyticsCookies();

    if (shouldReload && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "denied",
      });
    }

    if (!shouldReload || !canReloadFailClosed) {
      return;
    }

    window.setTimeout(() => {
      expireAnalyticsCookies();
      window.location.reload();
    }, 100);
  };

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

  for (const modalDefinition of modalDefinitions) {
    for (const triggerDefinition of modalDefinition.triggers) {
      triggerDefinition.element?.addEventListener("click", () =>
        openModal(modalDefinition, triggerDefinition)
      );
    }

    modalDefinition.closeButton?.addEventListener("click", () => closeModal(modalDefinition));
    modalDefinition.modal?.addEventListener("click", (event) => {
      if (event.target === modalDefinition.modal) {
        closeModal(modalDefinition);
      }
    });
  }

  consentAcceptButton?.addEventListener("click", allowAnalytics);
  privacyAllowButton?.addEventListener("click", allowAnalytics);
  consentRejectButton?.addEventListener("click", denyAnalytics);
  privacyDenyButton?.addEventListener("click", denyAnalytics);

  for (const outboundLink of document.querySelectorAll(
    'a[data-analytics-id][data-analytics-group]'
  )) {
    if (!outboundGroups.has(outboundLink.dataset.analyticsGroup)) {
      continue;
    }

    outboundLink.addEventListener("click", () => {
      sendAnalyticsEvent("outbound_link_click", {
        target_id: outboundLink.dataset.analyticsId,
        target_group: outboundLink.dataset.analyticsGroup,
        page_language: pageLanguage,
      });
    });
  }

  for (const documentLink of document.querySelectorAll(
    'a[download][data-document-id][data-document-kind]'
  )) {
    documentLink.addEventListener("click", () => {
      sendAnalyticsEvent("document_download", {
        document_id: documentLink.dataset.documentId,
        document_kind: documentLink.dataset.documentKind,
        page_language: pageLanguage,
      });
    });
  }

  for (const languageLink of document.querySelectorAll(
    'a[data-analytics-group="language"][data-analytics-id]'
  )) {
    languageLink.addEventListener("click", (event) => {
      const targetLanguage = languageLink.dataset.analyticsId;
      if (
        targetLanguage === pageLanguage ||
        currentConsentStatus !== CONSENT_GRANTED ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      let navigationStarted = false;
      const navigate = () => {
        if (navigationStarted) {
          return;
        }

        navigationStarted = true;
        window.location.assign(languageLink.href);
      };
      const navigationFallback = window.setTimeout(navigate, 600);
      const eventQueued = sendAnalyticsEvent(
        "language_change",
        { target_language: targetLanguage },
        {
          eventCallback: () => {
            window.clearTimeout(navigationFallback);
            navigate();
          },
          eventTimeout: 500,
        }
      );

      if (!eventQueued) {
        window.clearTimeout(navigationFallback);
        navigate();
      }
    });
  }

  flowFieldToggle?.addEventListener("change", () => {
    sendAnalyticsEvent("flow_field_change", {
      enabled: flowFieldToggle.checked,
      page_language: pageLanguage,
    });
  });

  document.addEventListener("keydown", (event) => {
    keepFocusInsideModal(event);

    if (event.key === "Escape") {
      closeModal();
    }
  });
  window.addEventListener("resize", updateConsentBannerOffset);

  currentConsentStatus = readConsent();
  updatePrivacyStatus();

  if (currentConsentStatus === CONSENT_GRANTED) {
    hideConsentBanner();
    initializeAnalytics();
  } else if (currentConsentStatus === CONSENT_DENIED) {
    hideConsentBanner();
    expireAnalyticsCookies();
  } else {
    showConsentBanner();
  }
})();
