# El Eraky Furniture — The Collection 2026

A complete, static catalogue website built with HTML, CSS and vanilla JavaScript. No npm, framework, database, API keys, external font service or build step is needed. All 530 image assets are included locally.

## Open it on your computer

Extract the ZIP, then double-click `index.html`. Keep the other files and the `assets` folder beside it. For sharing product links and the most consistent favourites behaviour, use the published HTTPS site. Clipboard permissions depend on the browser; a manual copy instruction appears when copying is unavailable.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `el-eraky-catalogue`. A public repository works with GitHub Free.
2. Put the **contents** of this extracted folder into the repository root. `index.html` must be at the top level, alongside `app.js`, `products.js`, `styles.css`, `favicon.svg`, `.nojekyll`, and `assets/`. Upload the extracted files, not the ZIP itself.
3. Because there are more than 500 files, GitHub Desktop is a convenient way to commit and push the whole folder. Alternatively, upload the assets in batches through GitHub's web interface, preserving the folder structure.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose **main** and **/(root)**, then click **Save**.
7. Wait for the deployment to finish. The Pages settings will show the published URL, usually `https://YOUR-USERNAME.github.io/el-eraky-catalogue/`.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

No special domain setup is required. All local links are relative, so both repository subpaths and a custom domain are supported. Product links use URL fragments rather than server routes, so refreshing a product URL does not require rewrite rules.

## What is included

- 171 product entries extracted from the supplied 207-page catalogue.
- Living Room: 63; Dining & Kitchen: 20; Bedroom & Bath: 78; Work & Entry: 10.
- 354 product photographs, 171 smaller card thumbnails and 5 editorial/room images.
- Product descriptions, original product codes, indicative sizes, finishes and source page numbers.
- Search, room/style filters, alphabetical sorting and progressive product loading.
- Product detail dialogs, thumbnail galleries, enlarged images and arrow-key navigation.
- Favourites stored only in the visitor's browser; they are not synced between devices.
- Shareable product URLs and prefilled WhatsApp enquiry links.
- Responsive layouts, keyboard-accessible controls, reduced-motion support and lazy-loaded product images.

This is an enquiry catalogue. It does not process payments or submit orders. Prices, final measurements, customisation and delivery are confirmed with the business. The source PDF is not bundled into the website; its product content and photography have been extracted into the site.

## Make changes

- `index.html`: home page, brand story, navigation and contact information.
- `styles.css`: colours, typography, spacing and responsive layouts.
- `products.js`: the product list. Edit product fields inside `PRODUCTS`, preserving valid JavaScript and unique IDs/codes. Image paths are relative to `index.html`.
- `app.js`: search, filtering, favourites, product galleries and enquiry links.
- `assets/`: WebP product photography and thumbnails.
- `favicon.svg`: browser tab icon.

The WhatsApp number is `201550068051`; it appears in both `index.html` and `app.js`. The telephone number is `+201007000710`. These were taken from page 207 of the supplied PDF.

Product names can repeat for coordinated pieces. Their codes and URLs are unique. Keep these IDs unchanged to preserve existing shared links and saved favourites.

## Validation

JavaScript syntax, asset existence, unique IDs and complete product specification fields were checked. Logic checks covered room/style filtering, search, sorting, saved pieces, detail content, WhatsApp links, gallery navigation and empty results. Browser-based visual QA was not available in the build environment. Before launch, open the site in your preferred desktop and mobile browsers and check the layout, galleries and contact links.

All supplied furniture imagery and catalogue text remain the property of their respective owner. No stock product imagery or invented pricing has been added.
