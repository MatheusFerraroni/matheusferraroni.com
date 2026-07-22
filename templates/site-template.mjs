import { SITE_URL, siteContent } from "../content/site-content.mjs";

const localeSettings = Object.freeze({
  "pt-BR": {
    assetBase: "./assets",
    canonical: `${SITE_URL}/`,
    ogLocale: "pt_BR",
    alternateOgLocale: "en_US",
    socialCard: "social-card-pt-br.png",
  },
  en: {
    assetBase: "../assets",
    canonical: `${SITE_URL}/en/`,
    ogLocale: "en_US",
    alternateOgLocale: "pt_BR",
    socialCard: "social-card-en.png",
  },
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const localized = (value, locale) => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.hasOwn(value, "pt-BR") &&
    Object.hasOwn(value, "en")
  ) {
    return value[locale];
  }

  return value;
};

const text = (value, locale) => escapeHtml(localized(value, locale));

const languageAttribute = (contentLanguage, pageLocale) =>
  contentLanguage && contentLanguage !== pageLocale
    ? ` lang="${escapeHtml(contentLanguage)}"`
    : "";

const externalLinkAttributes = ' target="_blank" rel="noopener noreferrer"';

const renderLanguageNavigation = (locale) => {
  const isPortuguese = locale === "pt-BR";
  const activeClass = "font-semibold text-white underline decoration-sky-300/80 underline-offset-4";
  const inactiveClass = "text-slate-300 transition hover:text-white";

  return `
        <nav class="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 text-xs uppercase tracking-[0.18em] backdrop-blur-md" aria-label="${text(siteContent.ui.languageNavigation, locale)}">
          <a class="${isPortuguese ? activeClass : inactiveClass}" href="/" hreflang="pt-BR" lang="pt-BR"${isPortuguese ? ' aria-current="page"' : ""}>${escapeHtml(siteContent.ui.portuguese)}</a>
          <span class="text-slate-500" aria-hidden="true">|</span>
          <a class="${isPortuguese ? inactiveClass : activeClass}" href="/en/" hreflang="en" lang="en"${isPortuguese ? "" : ' aria-current="page"'}>${escapeHtml(siteContent.ui.english)}</a>
        </nav>`;
};

const renderTopics = (locale) =>
  siteContent.topics
    .map(
      (topic) => `
              <span id="topic-${escapeHtml(topic.id)}" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                ${text(topic.label, locale)}
              </span>`,
    )
    .join("");

const renderQuickLinks = (locale) =>
  siteContent.quickLinks
    .map(
      (link) => `
              <a class="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/8" href="${escapeHtml(siteContent.links[link.linkKey])}"${externalLinkAttributes}>${text(link.label, locale)}</a>`,
    )
    .join("");

const renderToolLinks = () =>
  siteContent.tools
    .map(
      (tool) => `
          <a class="block rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/8" href="${escapeHtml(siteContent.links[tool.linkKey])}" id="tool-${escapeHtml(tool.id)}"${externalLinkAttributes}>${escapeHtml(tool.label)}</a>`,
    )
    .join("");

const renderCurrentExperience = (locale) =>
  siteContent.experience.current
    .map(
      (experience) => `
            <div id="experience-${escapeHtml(experience.id)}" class="rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 class="text-xl font-semibold text-white">${text(experience.role, locale)}</h3>
                <span class="text-sm text-sky-200/80">${text(experience.period, locale)}</span>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-300 sm:text-base">${text(experience.description, locale)}</p>
            </div>`,
    )
    .join("");

const renderPreviousExperience = (locale) =>
  siteContent.experience.previous
    .map(
      (experience) => `
                <li id="experience-${escapeHtml(experience.id)}"><span class="font-semibold text-white">${escapeHtml(experience.organization)}</span> · ${text(experience.role, locale)} · ${text(experience.period, locale)}</li>`,
    )
    .join("");

const renderEducation = (locale) =>
  siteContent.education
    .map((education) => {
      const work = education.workTitle
        ? ` ${text(siteContent.ui[education.workKind], locale)}: “<span${languageAttribute(education.workTitleLanguage, locale)}>${escapeHtml(education.workTitle)}</span>”.`
        : "";

      return `
            <div id="education-${escapeHtml(education.id)}" class="rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 class="text-xl font-semibold text-white">${text(education.degree, locale)}</h3>
                <span class="text-sm text-sky-200/80">${text(education.period, locale)}</span>
              </div>
              <p class="mt-3 text-sm leading-7 text-slate-300 sm:text-base">${escapeHtml(education.institution)}.${work} ${text(siteContent.ui.advisor, locale)}: ${escapeHtml(education.advisor)}.</p>
            </div>`;
    })
    .join("");

const renderSkillGroups = (locale) =>
  siteContent.skillGroups
    .map(
      (group) => `
            <div id="skill-group-${escapeHtml(group.id)}" class="rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
              <ul class="grid gap-4 text-sm leading-7 text-slate-300 sm:text-base">${group.items
                .map(
                  (skill) => `
                <li id="skill-${escapeHtml(skill.id)}"><span class="font-semibold text-white">${text(skill.label, locale)}</span> · ${text(skill.value, locale)}</li>`,
                )
                .join("")}
              </ul>
            </div>`,
    )
    .join("");

const renderPublicationLinks = () => `
            <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200 transition hover:bg-white/8 hover:text-sky-100" href="${escapeHtml(siteContent.links.scholar)}"${externalLinkAttributes}>Google Scholar</a>
            <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200 transition hover:bg-white/8 hover:text-sky-100" href="${escapeHtml(siteContent.links.lattes)}"${externalLinkAttributes}>Lattes</a>
            <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200 transition hover:bg-white/8 hover:text-sky-100" href="${escapeHtml(siteContent.links.dblp)}"${externalLinkAttributes}>DBLP</a>`;

const renderPublications = (locale) =>
  siteContent.publications
    .map(
      (yearGroup) => `
            <section id="${escapeHtml(yearGroup.id)}">
              <p class="text-sm font-medium uppercase tracking-[0.24em] text-sky-200/75">${escapeHtml(yearGroup.year)}</p>
              <div class="mt-3 space-y-5">${yearGroup.items
                .map(
                  (publication) => `
                <div id="publication-${escapeHtml(publication.id)}">
                  <h3 class="text-lg font-semibold text-white"${languageAttribute(publication.titleLanguage, locale)}>${escapeHtml(publication.title)}</h3>
                  <p class="mt-2">${escapeHtml(publication.venue)}${publication.description ? `. ${text(publication.description, locale)}` : ""}</p>${
                    publication.link
                      ? `
                  <a class="mt-2 inline-block text-sm text-sky-200 transition hover:text-sky-100" href="${escapeHtml(publication.link.url)}"${externalLinkAttributes}>${escapeHtml(publication.link.label)}</a>`
                      : ""
                  }
                </div>`,
                )
                .join("")}
              </div>
            </section>`,
    )
    .join("");

const renderProjects = (locale) =>
  siteContent.projects
    .map(
      (project) => `
            <div id="project-${escapeHtml(project.id)}" class="rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
              <h3 class="text-xl font-semibold text-white"${languageAttribute(project.nameLanguage, locale)}>${escapeHtml(project.name)}</h3>
              <p class="mt-1 text-sm text-sky-200/80">${text(project.subtitle, locale)}</p>
              <p class="mt-3 text-sm leading-7 text-slate-300">${text(project.description, locale)}</p>${
                project.technologies
                  ? `
              <p class="mt-3 text-sm leading-7 text-slate-300">${text(siteContent.ui.technologies, locale)}: ${escapeHtml(project.technologies)}.</p>`
                  : ""
              }${
                project.links?.length
                  ? `
              <div class="mt-3 flex flex-wrap gap-3">${project.links
                .map(
                  (link) => `
                <a class="text-sm text-sky-200 transition hover:text-sky-100" href="${escapeHtml(link.url)}"${externalLinkAttributes}>${link.kind === "repository" ? text(siteContent.ui.repository, locale) : escapeHtml(link.label)}</a>`,
                )
                .join("")}
              </div>`
                  : ""
              }
            </div>`,
    )
    .join("");

const renderFeaturedAwards = (locale) =>
  siteContent.awards.featured
    .map(
      (award) => `
            <div id="award-${escapeHtml(award.id)}" class="rounded-[1.5rem] border border-sky-300/20 bg-sky-300/8 p-5">
              <p class="text-sm font-medium uppercase tracking-[0.24em] text-sky-200/80">${escapeHtml(award.year)}</p>
              <h3 class="mt-3 text-xl font-semibold text-white"${languageAttribute(award.titleLanguage, locale)}>${text(award.title, locale)}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-300 sm:text-base">${text(siteContent.ui.work, locale)}: <span${languageAttribute(award.workTitleLanguage, locale)}>${escapeHtml(award.workTitle)}</span>.</p>
            </div>`,
    )
    .join("");

const renderOtherAwards = (locale) =>
  siteContent.awards.other
    .map(
      (award) => `
              <li id="award-${escapeHtml(award.id)}"><span class="font-semibold text-white">${escapeHtml(award.year)}:</span> ${text(award.description, locale)}</li>`,
    )
    .join("");

const createStructuredData = (locale, canonical) => {
  const localizedPersonDescription = localized(siteContent.person.description, locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: siteContent.person.name,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${canonical}#profile-page`,
        url: canonical,
        name: localized(siteContent.person.title, locale),
        description: localizedPersonDescription,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: siteContent.person.name,
        url: `${SITE_URL}/`,
        description: localizedPersonDescription,
        jobTitle: localized(siteContent.person.jobTitles, locale),
        knowsAbout: localized(siteContent.person.knowsAbout, locale),
        worksFor: [
          { "@type": "Organization", name: "Orion Sistemas Agrícolas" },
          { "@type": "CollegeOrUniversity", name: "Universidade de Marília (UNIMAR)" },
        ],
        affiliation: {
          "@type": "CollegeOrUniversity",
          name: "Universidade Estadual de Campinas (UNICAMP)",
        },
        sameAs: [
          siteContent.links.lattes,
          siteContent.links.scholar,
          siteContent.links.github,
          siteContent.links.dblp,
          siteContent.links.fapesp,
        ],
      },
    ],
  };
};

export const renderPage = (locale) => {
  const settings = localeSettings[locale];

  if (!settings) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const title = localized(siteContent.person.title, locale);
  const description = localized(siteContent.person.description, locale);
  const socialCardAlt = localized(siteContent.person.socialCardAlt, locale);
  const socialCardUrl = `${SITE_URL}/assets/image/${settings.socialCard}`;
  const structuredData = JSON.stringify(
    createStructuredData(locale, settings.canonical),
    null,
    2,
  ).replaceAll("<", "\\u003c");

  return `<!DOCTYPE html>
<!-- Generated by scripts/build-site.mjs. Do not edit this file directly. -->
<html lang="${escapeHtml(locale)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="author" content="${escapeHtml(siteContent.person.name)}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#020617">
    <title>${escapeHtml(title)}</title>

    <link rel="canonical" href="${escapeHtml(settings.canonical)}">
    <link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/">
    <link rel="alternate" hreflang="en" href="${SITE_URL}/en/">
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">

    <meta property="og:type" content="profile">
    <meta property="og:site_name" content="${escapeHtml(siteContent.person.name)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(settings.canonical)}">
    <meta property="og:locale" content="${escapeHtml(settings.ogLocale)}">
    <meta property="og:locale:alternate" content="${escapeHtml(settings.alternateOgLocale)}">
    <meta property="og:image" content="${escapeHtml(socialCardUrl)}">
    <meta property="og:image:secure_url" content="${escapeHtml(socialCardUrl)}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(socialCardAlt)}">
    <meta property="profile:first_name" content="Matheus">
    <meta property="profile:last_name" content="Ferraroni Sanches">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(socialCardUrl)}">
    <meta name="twitter:image:alt" content="${escapeHtml(socialCardAlt)}">

    <link rel="icon" type="image/svg+xml" href="${settings.assetBase}/favicon_io/favicon.svg">
    <link rel="icon" type="image/png" sizes="96x96" href="${settings.assetBase}/favicon_io/favicon-96x96.png">
    <link rel="apple-touch-icon" sizes="180x180" href="${settings.assetBase}/favicon_io/apple-touch-icon.png">
    <link rel="manifest" href="${settings.assetBase}/favicon_io/site.webmanifest">
    <link rel="icon" href="${settings.assetBase}/favicon_io/favicon.ico" sizes="any">
    <link rel="stylesheet" href="${settings.assetBase}/css/styles.css">

    <script type="application/ld+json">
${structuredData}
    </script>
  </head>
  <body>
    <div class="canvas-layer" id="sketch-root" aria-hidden="true"></div>

    <main class="relative z-10 min-h-screen">
      <div class="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-3 px-6 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
${renderLanguageNavigation(locale)}
        <label class="z-20 flex items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 text-xs font-medium uppercase tracking-[0.24em] text-slate-100 backdrop-blur-md sm:justify-start">
          <input id="toggle-flow-field" type="checkbox" class="h-4 w-4 rounded border-white/20 bg-transparent accent-sky-300">
          <span>${text(siteContent.ui.flowField, locale)}</span>
        </label>
      </div>

      <section class="mx-auto flex min-h-[calc(100vh-3.75rem)] w-full max-w-7xl items-end px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
        <div class="mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
          <div>
            <h1 class="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">${escapeHtml(siteContent.person.name)}</h1>
            <p class="mt-6 max-w-4xl text-justify text-base leading-8 text-slate-200/90 sm:text-lg">${text(siteContent.person.summary, locale)}</p>
            <div class="mt-8 flex flex-wrap gap-3">${renderTopics(locale)}
            </div>
          </div>

          <aside class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
            <p class="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-amber-300/80">${text(siteContent.ui.quickAccess, locale)}</p>
            <div class="grid gap-3 text-sm leading-6 text-slate-200">${renderQuickLinks(locale)}
              <a class="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/8" href="#" id="linkedin-link" aria-disabled="true" data-disabled-message="${text(siteContent.ui.linkedinUnavailable, locale)}" title="${text(siteContent.ui.linkedinUnavailable, locale)}">LinkedIn</a>
              <button class="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-left transition hover:bg-white/8" id="tools-button" type="button" aria-haspopup="dialog" aria-controls="tools-modal">${text(siteContent.ui.tools, locale)}</button>
              <button class="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-left transition hover:bg-white/8" id="contact-button" type="button">${text(siteContent.ui.contact, locale)}</button>
            </div>
          </aside>
        </div>
      </section>

      <section class="mx-auto grid w-full max-w-7xl gap-5 px-6 pb-24 sm:px-10 lg:px-16">
        <article id="experience" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.experience, locale)}</h2>
          <div class="mt-6 grid gap-6">${renderCurrentExperience(locale)}
            <div class="rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
              <h3 class="text-xl font-semibold text-white">${text(siteContent.sectionTitles.previousExperience, locale)}</h3>
              <ul class="mt-4 grid gap-3 text-sm leading-7 text-slate-300 sm:text-base">${renderPreviousExperience(locale)}
              </ul>
            </div>
          </div>
        </article>

        <article id="education" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.education, locale)}</h2>
          <div class="mt-6 grid gap-5">${renderEducation(locale)}
          </div>
        </article>

        <article id="skills" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.skills, locale)}</h2>
          <div class="mt-6 grid gap-5 lg:grid-cols-2">${renderSkillGroups(locale)}
          </div>
        </article>

        <article id="publications" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.publications, locale)}</h2>
          <div class="mt-6 flex flex-wrap gap-3">${renderPublicationLinks()}
          </div>
          <div class="mt-6 space-y-8 text-sm leading-7 text-slate-300 sm:text-base">${renderPublications(locale)}
          </div>
        </article>

        <article id="projects" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.projects, locale)}</h2>
          <div class="mt-6 grid gap-5 lg:grid-cols-2">${renderProjects(locale)}
          </div>
        </article>

        <article id="awards" class="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-md sm:p-8">
          <h2 class="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">${text(siteContent.sectionTitles.awards, locale)}</h2>
          <div class="mt-6 grid gap-5 lg:grid-cols-2">${renderFeaturedAwards(locale)}
          </div>
          <div class="mt-5 rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
            <ul class="grid gap-3 text-sm leading-7 text-slate-300 sm:text-base">${renderOtherAwards(locale)}
            </ul>
          </div>
        </article>
      </section>
    </main>

    <div class="fixed inset-0 z-30 hidden items-center justify-center bg-slate-950/75 px-6 backdrop-blur-sm" id="tools-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="tools-modal-title" inert>
      <div class="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/60 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.28em] text-amber-300/80">${text(siteContent.ui.quickAccess, locale)}</p>
            <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white" id="tools-modal-title">${text(siteContent.ui.tools, locale)}</h2>
          </div>
          <button class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10" id="close-tools-modal" type="button">${text(siteContent.ui.close, locale)}</button>
        </div>
        <div class="mt-6 grid gap-3 text-sm leading-6 text-slate-200">${renderToolLinks()}
        </div>
      </div>
    </div>

    <div class="fixed inset-0 z-30 hidden items-center justify-center bg-slate-950/75 px-6 backdrop-blur-sm" id="contact-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="contact-modal-title" inert>
      <div class="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/60 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.28em] text-amber-300/80">${text(siteContent.ui.contact, locale)}</p>
            <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white" id="contact-modal-title">${text(siteContent.ui.email, locale)}</h2>
          </div>
          <button class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10" id="close-contact-modal" type="button">${text(siteContent.ui.close, locale)}</button>
        </div>
        <div class="mt-6">
          <img class="h-auto max-w-full rounded-xl border border-white/10 bg-white/5 p-3" src="${settings.assetBase}/image/email_white.png" alt="${text(siteContent.ui.contactEmailAlt, locale)}">
        </div>
      </div>
    </div>

    <script defer src="${settings.assetBase}/vendor/p5/p5.min.js"></script>
    <script defer src="${settings.assetBase}/js/sketch.js"></script>
    <script defer src="${settings.assetBase}/js/site.js"></script>
  </body>
</html>
`;
};

export const renderSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
  </url>
  <url>
    <loc>${SITE_URL}/en/</loc>
  </url>
</urlset>
`;

export const renderRobots = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
