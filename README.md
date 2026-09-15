# Being-Civil---Notes-Sharing-Website

 A dependency-free HTML/CSS/JS recreation of the BEing Civil IIEST resource
index, structured as a real multi-page site (134 pages) rather than a single
long page.

## Structure

```
index.html                 Homepage
about-us-forms.html        Feedback / Join Us / app download placeholders
pages/                     One HTML file per section & sub-section
assets/css/style.css       All styling (design tokens at the top)
assets/js/nav-data.js      The entire site map as one data structure
assets/js/nav.js           Renders the dropdown nav from nav-data.js
```

There's no build step and no framework — open `index.html` directly in a
browser, or serve the folder with any static file server.

## Editing the navigation

The whole nav tree (titles, slugs, nesting) lives in one place:
`assets/js/nav-data.js`. Every page's dropdown menu is rendered from this
file at load time, so adding, renaming, or reordering a section means
editing that one array — you don't need to touch 130 HTML files.

```js
{ title: "New Section", slug: "new-section", children: [] }
```

If you add an entry here, also create a matching `pages/new-section.html`
(copy an existing leaf page as a starting point) or the link will 404.

## Adding real resources

Leaf pages currently show placeholder rows:

```html
<ul class="resource-list">
  <li>
    <span class="file-tag">PDF</span>
    <span class="r-name">Lecture notes — compiled set</span>
    <a class="r-link" href="#" onclick="return false;">Add link</a>
  </li>
  ...
</ul>
```

Replace the `href="#"` with a real Google Drive / PDF link and drop the
`onclick="return false;"` attribute.


## Notes

- Actual notes/PDFs are not included — those belong to individual
  contributors and were never part of this template. Only placeholder rows
  are provided; swap in real links as you populate content.
- Design: IBM Plex Sans/Serif/Mono, a blueprint/drafting-sheet visual
  language (see the top of `assets/css/style.css` for the full token list).

