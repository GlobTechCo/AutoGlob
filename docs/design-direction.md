# AutoGlob design direction

Reference reviewed: https://www.caranddriver.com/ (2026-10-12).

Observed editorial structure: latest-news area, prominent lead story, comparison/test coverage, shopping advice, reviews and features. The recommendation below adapts that content hierarchy to AutoGlob's present scale.

## Proposed homepage

1. Compact AutoGlob masthead and clear News / Reviews / Classics & Stories / Tools navigation.
2. A real lead article with a large image and two or three secondary stories. Replace the permanent generic welcome banner with editorial content.
3. Separate Latest News and Reviews blocks, with publication dates and direct section links.
4. A visible ownership-tools block linking to the seven current calculators and VIN decoder.
5. A Classics & Automotive History block using the site's existing features.

Retain the AutoGlob name and original brand identity. Use original images and content. Do not reproduce another publication's masthead, page markup, branding or editorial copy.

## Article layout

Use a compact headline, accurate byline and date, restrained hero sizing, readable line lengths, captioned images, a useful specifications table where sourced, related stories and context-specific tools. Increase contrast for supporting text.

## Scale and implementation

The present static HTML implementation can support this redesign. A multi-page static generator with shared templates would reduce duplicated head, navigation and footer markup as the archive grows. Migrating to a framework is optional and should be driven by the publishing workflow rather than appearance alone.

For the next iteration, create a reviewable homepage redesign first; preserve article URLs and canonical URLs, and validate desktop and mobile views. A full redesign has not been deployed by the SEO update.

