import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { siteContent } from "../content/site-content.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteOrigin = "https://matheusferraroni.com";
const expectedAlternates = new Map([
  ["pt-BR", `${siteOrigin}/`],
  ["en", `${siteOrigin}/en/`],
  ["x-default", `${siteOrigin}/`],
]);
const expectedSameAs = [
  "http://lattes.cnpq.br/7066133969704063",
  "https://scholar.google.com/citations?hl=pt-BR&user=ZCrxyHUAAAAJ",
  "https://github.com/MatheusFerraroni",
  "https://dblp.org/pid/165/3906.html",
  "https://bv.fapesp.br/pt/pesquisador/702639/matheus-ferraroni-sanches/",
];
const pages = [
  {
    locale: "pt-BR",
    path: "index.html",
    canonical: `${siteOrigin}/`,
    title: "Matheus Ferraroni Sanches | CTO e Pesquisador em IA",
    description:
      "Matheus Ferraroni Sanches é CTO, professor e pesquisador em Ciência da Computação, com atuação em IA, agtech, NLP, privacidade e sensoriamento remoto.",
    ogLocale: "pt_BR",
    socialCard: `${siteOrigin}/assets/image/social-card-pt-br.png`,
    linkedinUnavailable: "LinkedIn desativado temporariamente",
    toolsLabel: "Ferramentas",
  },
  {
    locale: "en",
    path: "en/index.html",
    canonical: `${siteOrigin}/en/`,
    title: "Matheus Ferraroni Sanches | CTO and AI Researcher",
    description:
      "Matheus Ferraroni Sanches is a CTO, professor and computer science researcher working on AI, agtech, NLP, privacy and remote sensing.",
    ogLocale: "en_US",
    socialCard: `${siteOrigin}/assets/image/social-card-en.png`,
    linkedinUnavailable: "LinkedIn temporarily unavailable",
    toolsLabel: "Tools",
  },
];
const analyticsConsentElementIds = [
  "analytics-consent-banner",
  "analytics-consent-accept",
  "analytics-consent-reject",
  "analytics-consent-privacy",
  "privacy-footer-button",
  "privacy-modal",
  "privacy-modal-title",
  "close-privacy-modal",
  "privacy-status",
  "privacy-allow",
  "privacy-deny",
  "privacy-contact-button",
];
const analyticsConsentButtonIds = [
  "analytics-consent-accept",
  "analytics-consent-reject",
  "analytics-consent-privacy",
  "privacy-footer-button",
  "close-privacy-modal",
  "privacy-allow",
  "privacy-deny",
  "privacy-contact-button",
];
const analyticsEvents = [
  "outbound_link_click",
  "document_download",
  "contact_open",
  "tools_open",
  "language_change",
  "flow_field_change",
];
const academicWorks = [
  {
    educationId: "msc-computer-science",
    title: "Alocação de RoadSide Units Ciente de Obstáculos e Diferentes Modelos de Propagação de Sinal",
    advisor: "Leandro Aparecido Villas",
    committee: ["Lucas Francisco Wanner", "Roberto Sadao Yokoyama"],
    defenseDate: { "pt-BR": "27 de abril de 2020", en: "April 27, 2020" },
    documents: [
      {
        id: "masters-dissertation",
        kind: "dissertation",
        path: "documents/dissertation.pdf",
        downloadName: "matheus-ferraroni-sanches-dissertacao-mestrado.pdf",
      },
      {
        id: "masters-presentation",
        kind: "presentation",
        path: "documents/slides_masters.pdf",
        downloadName: "matheus-ferraroni-sanches-apresentacao-mestrado.pdf",
      },
    ],
    records: [
      {
        id: "masters-doi",
        url: "https://doi.org/10.47749/T/UNICAMP.2020.1129126",
      },
      {
        id: "masters-unicamp-record",
        url: "https://repositorio.unicamp.br/acervo/detalhe/1129126",
      },
    ],
  },
  {
    educationId: "bsc-computer-science",
    title: "Processamento e Entendimento de Linguagem Natural no Gerenciamento de Emergências para Obtenção de Consciência Situacional",
    advisor: "Leonardo Castro Botega",
    committee: ["Fabio Piola Navarro", "Guilherme Rodrigues Bilar"],
    defenseDate: { "pt-BR": "27 de novembro de 2017", en: "November 27, 2017" },
    documents: [
      {
        id: "undergraduate-monograph",
        kind: "undergraduate-thesis",
        path: "documents/monograph.pdf",
        downloadName: "matheus-ferraroni-sanches-monografia-graduacao.pdf",
      },
    ],
    records: [
      {
        id: "undergraduate-univem-record",
        url: "https://aberto.univem.edu.br/handle/11077/1662",
      },
    ],
  },
];

function readRepositoryFile(relativePath) {
  return readFileSync(resolve(repositoryRoot, relativePath), "utf8");
}

function attributesFromTag(tag) {
  return new Map(
    [...tag.matchAll(/([:\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]])
  );
}

function tagsWithAttributes(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "g"))].map((match) => ({
    source: match[0],
    attributes: attributesFromTag(match[0]),
  }));
}

function findTag(html, tagName, attributeName, attributeValue) {
  return tagsWithAttributes(html, tagName).find(
    (tag) => tag.attributes.get(attributeName) === attributeValue
  );
}

function findTagById(html, id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(`<([a-z][\\w:-]*)\\b[^>]*\\sid="${escapedId}"[^>]*>`, "i")
  );

  if (!match) {
    return undefined;
  }

  return {
    name: match[1].toLowerCase(),
    source: match[0],
    attributes: attributesFromTag(match[0]),
  };
}

function textFromElementById(html, id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(
      `<([a-z][\\w:-]*)\\b[^>]*\\sid="${escapedId}"[^>]*>([\\s\\S]*?)<\\/\\1>`,
      "i"
    )
  );

  assert.ok(match, `Element #${id} must have text content`);
  return match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractJsonLd(html) {
  const match = html.match(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
  );
  assert.ok(match, "JSON-LD script must be present");
  return JSON.parse(match[1]);
}

function extractIds(html) {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
}

function collectLocalizedStringPairs(value, pairs = []) {
  if (!value || typeof value !== "object") {
    return pairs;
  }

  if (typeof value["pt-BR"] === "string" && typeof value.en === "string") {
    pairs.push(value);
    return pairs;
  }

  for (const child of Object.values(value)) {
    collectLocalizedStringPairs(child, pairs);
  }

  return pairs;
}

function pngDimensions(relativePath) {
  const png = readFileSync(resolve(repositoryRoot, relativePath));
  assert.equal(png.toString("ascii", 1, 4), "PNG", `${relativePath} must be a PNG`);
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

for (const page of pages) {
  test(`${page.locale} page exposes complete localized SEO metadata`, () => {
    const html = readRepositoryFile(page.path);
    const htmlTag = tagsWithAttributes(html, "html")[0];
    const canonical = findTag(html, "link", "rel", "canonical");
    const description = findTag(html, "meta", "name", "description");
    const ogTitle = findTag(html, "meta", "property", "og:title");
    const ogDescription = findTag(html, "meta", "property", "og:description");
    const ogUrl = findTag(html, "meta", "property", "og:url");
    const ogLocale = findTag(html, "meta", "property", "og:locale");
    const ogAlternateLocale = findTag(html, "meta", "property", "og:locale:alternate");
    const ogImage = findTag(html, "meta", "property", "og:image");
    const ogImageWidth = findTag(html, "meta", "property", "og:image:width");
    const ogImageHeight = findTag(html, "meta", "property", "og:image:height");
    const ogImageAlt = findTag(html, "meta", "property", "og:image:alt");
    const twitterCard = findTag(html, "meta", "name", "twitter:card");
    const twitterTitle = findTag(html, "meta", "name", "twitter:title");
    const twitterDescription = findTag(html, "meta", "name", "twitter:description");
    const twitterImage = findTag(html, "meta", "name", "twitter:image");
    const themeColor = findTag(html, "meta", "name", "theme-color");
    const linkedinLink = findTag(html, "a", "id", "linkedin-link");
    const toolsButton = findTag(html, "button", "id", "tools-button");
    const toolsModal = findTag(html, "div", "id", "tools-modal");

    assert.match(
      html,
      /<!-- (?:This file is generated|Generated) by scripts\/build-site\.mjs\. Do not edit (?:this file )?directly\. -->/
    );
    assert.equal(htmlTag.attributes.get("lang"), page.locale);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], page.title);
    assert.equal(description?.attributes.get("content"), page.description);
    assert.equal(canonical?.attributes.get("href"), page.canonical);
    assert.equal(ogTitle?.attributes.get("content"), page.title);
    assert.equal(ogDescription?.attributes.get("content"), page.description);
    assert.equal(ogUrl?.attributes.get("content"), page.canonical);
    assert.equal(ogLocale?.attributes.get("content"), page.ogLocale);
    assert.equal(
      ogAlternateLocale?.attributes.get("content"),
      page.locale === "pt-BR" ? "en_US" : "pt_BR"
    );
    assert.equal(ogImage?.attributes.get("content"), page.socialCard);
    assert.equal(ogImageWidth?.attributes.get("content"), "1200");
    assert.equal(ogImageHeight?.attributes.get("content"), "630");
    assert.ok(ogImageAlt?.attributes.get("content"));
    assert.equal(twitterCard?.attributes.get("content"), "summary_large_image");
    assert.equal(twitterTitle?.attributes.get("content"), page.title);
    assert.equal(twitterDescription?.attributes.get("content"), page.description);
    assert.equal(twitterImage?.attributes.get("content"), page.socialCard);
    assert.equal(themeColor?.attributes.get("content"), "#020617");
    assert.equal(linkedinLink?.attributes.get("aria-disabled"), "true");
    assert.equal(
      linkedinLink?.attributes.get("data-disabled-message"),
      page.linkedinUnavailable
    );
    assert.equal(linkedinLink?.attributes.get("title"), page.linkedinUnavailable);
    assert.equal(
      html.match(/<button\b[^>]*id="tools-button"[^>]*>([^<]+)<\/button>/)?.[1],
      page.toolsLabel
    );
    assert.equal(toolsButton?.attributes.get("aria-haspopup"), "dialog");
    assert.equal(toolsButton?.attributes.get("aria-controls"), "tools-modal");
    assert.equal(toolsModal?.attributes.get("role"), "dialog");
    assert.equal(toolsModal?.attributes.get("aria-modal"), "true");
    assert.match(html, /<script\b[^>]*src="(?:\.\.\/|\.\/)assets\/js\/site\.js"/);

    const alternateTags = tagsWithAttributes(html, "link").filter(
      (tag) => tag.attributes.get("rel") === "alternate" && tag.attributes.has("hreflang")
    );
    assert.equal(alternateTags.length, expectedAlternates.size);
    for (const [hreflang, href] of expectedAlternates) {
      const alternate = alternateTags.find(
        (tag) => tag.attributes.get("hreflang") === hreflang
      );
      assert.equal(alternate?.attributes.get("href"), href);
    }

    const jsonLd = extractJsonLd(html);
    const graph = jsonLd["@graph"];
    assert.ok(Array.isArray(graph));
    assert.ok(graph.some((entry) => entry["@type"] === "WebSite"));
    const profilePage = graph.find((entry) => entry["@type"] === "ProfilePage");
    const person = graph.find((entry) => entry["@type"] === "Person");
    assert.equal(profilePage?.url, page.canonical);
    assert.equal(profilePage?.inLanguage, page.locale);
    assert.equal(profilePage?.mainEntity?.["@id"], `${siteOrigin}/#person`);
    assert.equal(person?.["@id"], `${siteOrigin}/#person`);
    assert.deepEqual(person?.sameAs, expectedSameAs);
    assert.ok(!person?.image, "Person must not claim a profile image that is not present");
  });

  test(`${page.locale} page only references existing local assets`, () => {
    const absolutePagePath = resolve(repositoryRoot, page.path);
    const html = readFileSync(absolutePagePath, "utf8");
    const assetReferences = [...html.matchAll(/(?:href|src)="((?:\.\.\/|\.\/)assets\/[^"?#]+)"/g)].map(
      (match) => match[1]
    );

    assert.ok(assetReferences.length > 0);
    for (const assetReference of assetReferences) {
      const assetPath = resolve(dirname(absolutePagePath), assetReference);
      assert.ok(existsSync(assetPath), `${page.path} references missing ${assetReference}`);
    }
  });
}

test("English page does not retain Portuguese interface placeholders", () => {
  const html = readRepositoryFile("en/index.html");
  const forbiddenLabels = [
    "Histórico Profissional",
    "Histórico Acadêmico",
    "Habilidades",
    "Publicações selecionadas",
    "Projetos",
    "Prêmios e reconhecimentos",
    "Acesso Rápido",
    "Contato",
    "Fechar",
    "Repositório",
    "atual",
  ];

  for (const label of forbiddenLabels) {
    assert.ok(!html.includes(label), `English output still contains: ${label}`);
  }

  const translatedPairs = collectLocalizedStringPairs(siteContent).filter(
    (localizedText) => localizedText["pt-BR"] !== localizedText.en
  );

  assert.ok(translatedPairs.length > 0);
  for (const localizedText of translatedPairs) {
    assert.ok(
      !html.includes(localizedText["pt-BR"]),
      `English output still contains localized PT-BR text: ${localizedText["pt-BR"]}`
    );
  }
});

test("tools modal exposes the intended external tools without a direct quick link", () => {
  const expectedTools = [
    ["tool-visual-algorithms", "https://matheusferraroni.github.io/visual_algo/"],
    ["tool-field-map", "https://www.mapadasparcelas.com.br/"],
  ];

  assert.ok(
    !siteContent.quickLinks.some((link) => link.linkKey === "visualAlgorithms"),
    "Visual Algorithms must not remain a direct quick link"
  );

  for (const page of pages) {
    const html = readRepositoryFile(page.path);
    for (const [id, href] of expectedTools) {
      const tool = findTag(html, "a", "id", id);
      assert.equal(tool?.attributes.get("href"), href);
      assert.equal(tool?.attributes.get("target"), "_blank");
      assert.equal(tool?.attributes.get("rel"), "noopener noreferrer");
    }
  }
});

test("localized pages preserve the same unique public IDs", () => {
  const portugueseIds = extractIds(readRepositoryFile("index.html"));
  const englishIds = extractIds(readRepositoryFile("en/index.html"));

  assert.equal(new Set(portugueseIds).size, portugueseIds.length, "PT-BR IDs must be unique");
  assert.equal(new Set(englishIds).size, englishIds.length, "EN IDs must be unique");
  assert.deepEqual([...portugueseIds].sort(), [...englishIds].sort());
});

test("completed education cards expose academic metadata, downloads, and records", () => {
  for (const expectedWork of academicWorks) {
    const education = siteContent.education.find(
      (entry) => entry.id === expectedWork.educationId
    );

    assert.ok(education?.academicWork, `${expectedWork.educationId} needs academic work data`);
    assert.equal(education.academicWork.title, expectedWork.title);
    assert.equal(education.advisor, expectedWork.advisor);
    assert.deepEqual(education.academicWork.committee, expectedWork.committee);
    assert.ok(!Object.hasOwn(education, "workTitle"), "Legacy workTitle must not remain");
  }

  for (const page of pages) {
    const html = readRepositoryFile(page.path);
    const assetBase = page.locale === "pt-BR" ? "./assets" : "../assets";
    const localizedLabels = page.locale === "pt-BR"
      ? ["Trabalho acadêmico", "Defesa", "Orientador", "Banca examinadora"]
      : ["Academic work", "Defense", "Advisor", "Examination committee"];

    for (const expectedWork of academicWorks) {
      const labelledBy = `academic-work-${expectedWork.educationId}-title`;
      const escapedLabelledBy = labelledBy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const section = html.match(
        new RegExp(`<section\\b[^>]*aria-labelledby="[^"]*${escapedLabelledBy}[^"]*"[^>]*>[\\s\\S]*?<\\/section>`)
      )?.[0];

      assert.ok(section, `${page.path} needs the ${expectedWork.educationId} work section`);
      assert.ok(section.includes(expectedWork.title));
      if (page.locale === "en") {
        assert.ok(section.includes('lang="pt-BR"'), "Original titles must retain their language");
      }
      assert.ok(section.includes(expectedWork.defenseDate[page.locale]));
      assert.ok(section.includes(expectedWork.advisor));
      for (const committeeMember of expectedWork.committee) {
        assert.ok(section.includes(committeeMember));
      }
      for (const label of localizedLabels) {
        assert.ok(section.includes(label), `${page.path} needs localized ${label}`);
      }

      if (expectedWork.grade) {
        assert.ok(section.includes(page.locale === "pt-BR" ? "Nota:" : "Grade:"));
        assert.ok(section.includes(expectedWork.grade[page.locale]));
      } else {
        assert.ok(!section.includes(page.locale === "pt-BR" ? "Nota:" : "Grade:"));
      }

      for (const document of expectedWork.documents) {
        const link = findTagById(html, `academic-document-${document.id}`);
        assert.equal(link?.name, "a");
        assert.equal(link?.attributes.get("href"), `${assetBase}/${document.path}`);
        assert.equal(link?.attributes.get("download"), document.downloadName);
        assert.equal(link?.attributes.get("data-document-id"), document.id);
        assert.equal(link?.attributes.get("data-document-kind"), document.kind);
        assert.ok(!link?.attributes.has("data-analytics-id"));
        assert.ok(existsSync(resolve(repositoryRoot, "assets", document.path)));
      }

      for (const record of expectedWork.records) {
        const link = findTagById(html, `academic-record-${record.id}`);
        assert.equal(link?.name, "a");
        assert.equal(link?.attributes.get("href"), record.url);
        assert.equal(link?.attributes.get("target"), "_blank");
        assert.equal(link?.attributes.get("rel"), "noopener noreferrer");
        assert.equal(link?.attributes.get("data-analytics-id"), record.id);
        assert.equal(link?.attributes.get("data-analytics-group"), "academic-record");
      }
    }
  }
});

test("sitemap and robots expose only the intended public routes", () => {
  const sitemap = readRepositoryFile("sitemap.xml");
  const robots = readRepositoryFile("robots.txt");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.deepEqual(locations, [`${siteOrigin}/`, `${siteOrigin}/en/`]);
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, new RegExp(`^Sitemap: ${siteOrigin}/sitemap\\.xml$`, "m"));
});

test("social cards have the required dimensions", () => {
  assert.deepEqual(pngDimensions("assets/image/social-card-pt-br.png"), {
    width: 1200,
    height: 630,
  });
  assert.deepEqual(pngDimensions("assets/image/social-card-en.png"), {
    width: 1200,
    height: 630,
  });
});

test("web manifest is valid and keeps icon paths relative to itself", () => {
  const manifest = JSON.parse(readRepositoryFile("assets/favicon_io/site.webmanifest"));
  const manifestDirectory = resolve(repositoryRoot, "assets/favicon_io");

  assert.equal(manifest.name, "Matheus Ferraroni Sanches");
  assert.equal(manifest.short_name, "Matheus Ferraroni");
  assert.equal(manifest.start_url, "../../");
  assert.equal(manifest.scope, "../../");
  assert.equal(manifest.theme_color, "#020617");
  assert.equal(manifest.background_color, "#020617");
  assert.deepEqual(
    manifest.icons.map((icon) => icon.src),
    ["web-app-manifest-192x192.png", "web-app-manifest-512x512.png"]
  );

  for (const icon of manifest.icons) {
    assert.ok(existsSync(resolve(manifestDirectory, icon.src)), `Missing manifest icon: ${icon.src}`);
  }
});

for (const page of pages) {
  test(`${page.locale} exposes the localized analytics consent interface`, () => {
    const html = readRepositoryFile(page.path);

    for (const id of analyticsConsentElementIds) {
      const occurrences = html.match(new RegExp(`\\sid="${id}"`, "g")) || [];
      assert.equal(occurrences.length, 1, `${page.path} must expose #${id} exactly once`);
      assert.ok(findTagById(html, id), `${page.path} must expose #${id}`);
    }

    for (const id of analyticsConsentButtonIds) {
      const button = findTagById(html, id);
      assert.equal(button?.name, "button", `#${id} must be a button`);
      assert.equal(button?.attributes.get("type"), "button", `#${id} must not submit forms`);
      assert.ok(textFromElementById(html, id), `#${id} must have a localized label`);
    }

    for (const id of ["analytics-consent-privacy", "privacy-footer-button"]) {
      const trigger = findTagById(html, id);
      assert.equal(trigger?.attributes.get("aria-haspopup"), "dialog");
      assert.equal(trigger?.attributes.get("aria-controls"), "privacy-modal");
    }

    const privacyModal = findTagById(html, "privacy-modal");
    assert.equal(privacyModal?.attributes.get("role"), "dialog");
    assert.equal(privacyModal?.attributes.get("aria-modal"), "true");
    assert.equal(privacyModal?.attributes.get("aria-hidden"), "true");
    assert.equal(privacyModal?.attributes.get("aria-labelledby"), "privacy-modal-title");
    assert.match(privacyModal?.source || "", /\binert(?:[\s=>]|$)/);

    const contactTrigger = findTagById(html, "privacy-contact-button");
    assert.equal(contactTrigger?.attributes.get("aria-haspopup"), "dialog");
    assert.equal(contactTrigger?.attributes.get("aria-controls"), "contact-modal");

    assert.ok(textFromElementById(html, "analytics-consent-banner"));
    assert.ok(textFromElementById(html, "privacy-modal-title"));
    assert.ok(textFromElementById(html, "privacy-status"));
    assert.match(
      html,
      /<footer\b[\s\S]*\sid="privacy-footer-button"[\s\S]*<\/footer>/,
      "Privacy settings must remain reachable from the footer"
    );

    const sourcedScripts = tagsWithAttributes(html, "script").filter((tag) =>
      tag.attributes.has("src")
    );
    const siteScripts = sourcedScripts.filter((tag) =>
      /(?:^|\/)assets\/js\/site\.js$/.test(tag.attributes.get("src"))
    );

    assert.equal(siteScripts.length, 1, `${page.path} must load the local site.js once`);
    assert.ok(
      sourcedScripts.every((tag) => /^(?:\.\.\/|\.\/)/.test(tag.attributes.get("src"))),
      `${page.path} must only load local scripts`
    );
    assert.doesNotMatch(html, /googletagmanager\.com|google-analytics\.com/i);
  });
}

test("analytics consent copy and controls are localized in PT-BR and English", () => {
  const portugueseHtml = readRepositoryFile("index.html");
  const englishHtml = readRepositoryFile("en/index.html");
  const localizedElementIds = [
    "analytics-consent-banner",
    "analytics-consent-accept",
    "analytics-consent-reject",
    "analytics-consent-privacy",
    "privacy-footer-button",
    "privacy-modal-title",
    "close-privacy-modal",
    "privacy-status",
    "privacy-allow",
    "privacy-deny",
    "privacy-contact-button",
  ];

  assert.match(
    textFromElementById(portugueseHtml, "analytics-consent-banner"),
    /Usamos o Google Analytics para medir visitas e melhorar o site\./
  );
  assert.match(
    textFromElementById(englishHtml, "analytics-consent-banner"),
    /Google Analytics/i
  );

  for (const id of localizedElementIds) {
    const portugueseText = textFromElementById(portugueseHtml, id);
    const englishText = textFromElementById(englishHtml, id);

    assert.ok(portugueseText, `PT-BR #${id} must not be empty`);
    assert.ok(englishText, `EN #${id} must not be empty`);
    assert.notEqual(englishText, portugueseText, `#${id} must be localized`);
  }
});

test("tracked outbound links expose opaque analytics identifiers only", () => {
  const untrackedConsentIds = [
    "analytics-consent-accept",
    "analytics-consent-reject",
    "analytics-consent-privacy",
    "privacy-footer-button",
    "privacy-allow",
    "privacy-deny",
  ];

  for (const page of pages) {
    const html = readRepositoryFile(page.path);
    const trackedLinks = tagsWithAttributes(html, "a").filter(
      (tag) =>
        tag.attributes.has("data-analytics-id") ||
        tag.attributes.has("data-analytics-group")
    );

    assert.ok(trackedLinks.length > 0, `${page.path} must expose tracked links`);

    for (const link of trackedLinks) {
      const targetId = link.attributes.get("data-analytics-id");
      const targetGroup = link.attributes.get("data-analytics-group");

      assert.ok(targetId, `Tracked link ${link.attributes.get("href")} needs data-analytics-id`);
      assert.ok(
        targetGroup,
        `Tracked link ${link.attributes.get("href")} needs data-analytics-group`
      );
      assert.match(targetId, /^[A-Za-z0-9][A-Za-z0-9_-]*$/);
      assert.match(targetGroup, /^[A-Za-z0-9][A-Za-z0-9_-]*$/);
      assert.doesNotMatch(targetId, /(?:https?:|\/|\?|@|\s)/i);
      assert.doesNotMatch(targetGroup, /(?:https?:|\/|\?|@|\s)/i);
    }

    const trackedGroups = new Set(
      trackedLinks.map((link) => link.attributes.get("data-analytics-group"))
    );
    for (const expectedGroup of [
      "academic-record",
      "professional-profile",
      "publication",
      "project",
      "tool",
    ]) {
      assert.ok(trackedGroups.has(expectedGroup), `${page.path} must track ${expectedGroup} links`);
    }

    for (const id of untrackedConsentIds) {
      const control = findTagById(html, id);
      assert.ok(!control?.attributes.has("data-analytics-id"));
      assert.ok(!control?.attributes.has("data-analytics-group"));
    }
  }
});

test("site script implements consent-gated GA4 with the approved event contract", () => {
  const siteScript = readRepositoryFile("assets/js/site.js");

  assert.match(siteScript, /G-RSJNZZF2XW/);
  assert.match(siteScript, /personal-website:analytics-consent:v1/);
  assert.match(siteScript, /googletagmanager\.com\/gtag\/js/);
  assert.equal((siteScript.match(/googletagmanager\.com\/gtag\/js/g) || []).length, 1);
  assert.equal((siteScript.match(/createElement\(["']script["']\)/g) || []).length, 1);
  assert.match(siteScript, /localStorage\.getItem/);
  assert.match(siteScript, /localStorage\.setItem/);
  assert.match(siteScript, /JSON\.parse/);
  assert.match(siteScript, /JSON\.stringify/);
  assert.match(siteScript, /updatedAt/);
  assert.match(siteScript, /hasValidConsentTimestamp/);
  assert.match(siteScript, /parsedTimestamp\.toISOString\(\)\s*===\s*value/);
  assert.match(siteScript, /document\.cookie/);
  assert.match(siteScript, /startsWith\(["']_ga["']\)/);
  assert.match(siteScript, /location\.reload\(\)/);

  assert.match(siteScript, /["']?analytics_storage["']?\s*:\s*["']denied["']/);
  assert.match(siteScript, /["']?analytics_storage["']?\s*:\s*["']granted["']/);
  for (const deniedField of [
    "ad_storage",
    "ad_user_data",
    "ad_personalization",
    "functionality_storage",
    "personalization_storage",
    "security_storage",
  ]) {
    assert.match(
      siteScript,
      new RegExp(`["']?${deniedField}["']?\\s*:\\s*["']denied["']`),
      `${deniedField} must remain denied`
    );
  }
  assert.match(siteScript, /["']?allow_google_signals["']?\s*:\s*false/);
  assert.match(siteScript, /["']?allow_ad_personalization_signals["']?\s*:\s*false/);
  assert.match(siteScript, /["']?send_page_view["']?\s*:\s*false/);
  assert.match(
    siteScript,
    /["']?page_location["']?\s*:\s*`\$\{window\.location\.origin\}\$\{window\.location\.pathname\}`/
  );
  assert.match(siteScript, /["']?page_referrer["']?\s*:\s*["']["']/);
  assert.match(siteScript, /["']event["']\s*,\s*["']page_view["']/);
  assert.match(siteScript, /["']consent["']\s*,\s*["']default["']/);
  assert.match(siteScript, /["']consent["']\s*,\s*["']update["']/);

  assert.match(siteScript, /dataset\.analyticsId|getAttribute\(["']data-analytics-id["']\)/);
  assert.match(siteScript, /dataset\.analyticsGroup|getAttribute\(["']data-analytics-group["']\)/);
  assert.match(siteScript, /dataset\.documentId|getAttribute\(["']data-document-id["']\)/);
  assert.match(siteScript, /dataset\.documentKind|getAttribute\(["']data-document-kind["']\)/);
  assert.match(siteScript, /document\.documentElement\.lang|document\.body\.dataset\.pageLanguage/);
  assert.match(siteScript, /event_callback/);
  assert.match(siteScript, /setTimeout/);
  assert.match(siteScript, /\.checked/);

  for (const eventName of analyticsEvents) {
    assert.match(siteScript, new RegExp(`["']${eventName}["']`));
  }
  for (const parameterName of [
    "target_id",
    "target_group",
    "document_id",
    "document_kind",
    "page_language",
    "target_language",
    "enabled",
  ]) {
    assert.match(siteScript, new RegExp(`\\b${parameterName}\\b`));
  }

  assert.doesNotMatch(
    siteScript,
    /\b(?:email|href|url|link_url|link_text|search|query)\s*:/i,
    "Analytics payloads must not expose URLs, free text, email, or query data"
  );
  assert.match(
    siteScript,
    /(?:getElementById|querySelector)\([^)]*(?:script|gtag\.js|google-analytics-script)[^)]*\)|\b(?:analytics|gtag|googleAnalytics)\w*(?:Loaded|Loading|Requested|Promise)\b/i,
    "The GA script loader must have an idempotency guard"
  );
});
