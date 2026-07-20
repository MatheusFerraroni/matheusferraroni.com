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

test("localized pages preserve the same unique public IDs", () => {
  const portugueseIds = extractIds(readRepositoryFile("index.html"));
  const englishIds = extractIds(readRepositoryFile("en/index.html"));

  assert.equal(new Set(portugueseIds).size, portugueseIds.length, "PT-BR IDs must be unique");
  assert.equal(new Set(englishIds).size, englishIds.length, "EN IDs must be unique");
  assert.deepEqual([...portugueseIds].sort(), [...englishIds].sort());
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
  assert.deepEqual(
    manifest.icons.map((icon) => icon.src),
    ["android-chrome-192x192.png", "android-chrome-512x512.png"]
  );
});
