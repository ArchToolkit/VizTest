# The Visualization Playbook — Website

A single-page website edition of the Visualization Playbook (van Groll & Associates Inc.).
No build step, no frameworks — plain HTML, CSS, and JavaScript. Open `index.html`
in a browser, or upload the whole folder to any web server as-is.

## What's here

| Path | What it is |
|---|---|
| `index.html` | The entire playbook: cover + all 9 sections. All text lives here — edit it directly. |
| `css/styles.css` | All styling. Colors, fonts, cards, layout, responsive rules. No inline styles. |
| `js/main.js` | Sticky table-of-contents behavior: scroll-spy highlighting, smooth scrolling, the mobile contents menu. |
| `images/` | Every image as its own file, loaded via normal `<img src="images/...">` tags. |
| `images/course-thumbs/` | Thumbnails for the Section 6 training course cards. |
| `images/icons/` | Small UI icons (`*-white.png` for dark/colored backgrounds, `*-dark.png` for light ones). |

## How to edit

- **Change wording:** open `index.html`, find the text, edit it. Sections are marked with
  comments like `<!-- ============ SECTION 5 · THE RECIPES ============ -->` and each
  section element has an `id` (`our-position`, `ai-in-practice`, `client-experience`,
  `workflow`, `recipes`, `skills`, `prompting`, `gallery`, `last-word`).
- **Swap an image:** replace the file in `images/` with a new file of the **same name**,
  or put the new file in `images/` and update the `src="images/..."` in `index.html`.
  Keep web images under ~1600px on the long edge and JPEG quality ~80 to stay fast.
- **Add a section to the contents:** add a `<section id="...">` in `index.html`, then add
  a matching link in the sidebar `<nav class="toc">` list **and** in the mobile menu —
  the scroll-spy picks it up automatically via the `data-section` attribute.
- **Restyle:** design tokens (colors, fonts, widths) are CSS variables at the top of
  `css/styles.css` under `:root`. Change once, apply everywhere.

## Notes

- Links in Section 6 point to Chaos Academy courses and YouTube videos.
- The sidebar table of contents is desktop-only; small screens get a compact
  "Contents" bar with the same links.
