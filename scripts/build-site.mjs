#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { siteContent, supportedLocales } from "../content/site-content.mjs";
import { renderPage, renderRobots, renderSitemap } from "../templates/site-template.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const unknownArguments = process.argv.slice(2).filter((argument) => argument !== "--check");

if (unknownArguments.length > 0) {
  throw new Error(`Unknown argument${unknownArguments.length > 1 ? "s" : ""}: ${unknownArguments.join(", ")}`);
}

const isNonEmpty = (value) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.every(isNonEmpty);
  }

  return value !== null && value !== undefined;
};

const validateContent = (value, path = "siteContent") => {
  if (!value || typeof value !== "object") {
    return;
  }

  if (!Array.isArray(value)) {
    const localeKeys = supportedLocales.filter((locale) => Object.hasOwn(value, locale));

    if (localeKeys.length > 0) {
      for (const locale of supportedLocales) {
        if (!Object.hasOwn(value, locale) || !isNonEmpty(value[locale])) {
          throw new Error(`Missing or empty ${locale} content at ${path}`);
        }
      }

      return;
    }
  }

  if (Array.isArray(value)) {
    const records = value.filter(
      (item) => item && typeof item === "object" && !Array.isArray(item),
    );
    const recordsWithIds = records.filter((item) => Object.hasOwn(item, "id"));

    if (recordsWithIds.length > 0) {
      if (recordsWithIds.length !== records.length) {
        throw new Error(`Every sibling record must have an id at ${path}`);
      }

      const ids = recordsWithIds.map((item) => item.id);
      if (new Set(ids).size !== ids.length) {
        throw new Error(`Duplicate sibling record id at ${path}`);
      }

      for (const id of ids) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
          throw new Error(`Invalid stable id "${id}" at ${path}`);
        }
      }
    }

    value.forEach((item, index) => validateContent(item, `${path}[${index}]`));
    return;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    validateContent(nestedValue, `${path}.${key}`);
  }
};

validateContent(siteContent);

const expectedMetadata = {
  "pt-BR": {
    title: "Matheus Ferraroni Sanches | CTO e Pesquisador em IA",
    description:
      "Matheus Ferraroni Sanches é CTO, professor e pesquisador em Ciência da Computação, com atuação em IA, agtech, NLP, privacidade e sensoriamento remoto.",
  },
  en: {
    title: "Matheus Ferraroni Sanches | CTO and AI Researcher",
    description:
      "Matheus Ferraroni Sanches is a CTO, professor and computer science researcher working on AI, agtech, NLP, privacy and remote sensing.",
  },
};

for (const locale of supportedLocales) {
  if (siteContent.person.title[locale] !== expectedMetadata[locale].title) {
    throw new Error(`Unexpected ${locale} page title`);
  }

  if (siteContent.person.description[locale] !== expectedMetadata[locale].description) {
    throw new Error(`Unexpected ${locale} meta description`);
  }
}

const generatedFiles = new Map([
  ["index.html", renderPage("pt-BR")],
  ["en/index.html", renderPage("en")],
  ["sitemap.xml", renderSitemap()],
  ["robots.txt", renderRobots()],
]);

const readExistingFile = async (absolutePath) => {
  try {
    return await readFile(absolutePath, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
};

const staleFiles = [];

for (const [relativePath, expectedContent] of generatedFiles) {
  const absolutePath = resolve(projectRoot, relativePath);
  const existingContent = await readExistingFile(absolutePath);

  if (existingContent === expectedContent) {
    continue;
  }

  if (checkOnly) {
    staleFiles.push(relativePath);
    continue;
  }

  await mkdir(dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, expectedContent, "utf8");
  console.log(`generated ${relativePath}`);
}

if (checkOnly && staleFiles.length > 0) {
  console.error(`Generated files are stale or missing: ${staleFiles.join(", ")}`);
  console.error("Run `npm run build:pages` to regenerate them.");
  process.exitCode = 1;
} else if (checkOnly) {
  console.log("Generated pages and SEO files are current.");
}
