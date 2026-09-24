# Prompt: generate the PROJECT_DATA block for a new project page

Copy everything between the `=== PROMPT START ===` and `=== PROMPT END ===` markers into a
fresh AI chat, fill in the **INPUTS** block at the bottom, and send it. The reply is one
`PROJECT_DATA` object, ready to paste into the `<script id="projectConfig">` tag of a project
page. Nothing else changes: you copy an existing page in `projects/`, swap the object, and
you are done. It never touches `index.html`.

---

=== PROMPT START ===

You are writing the content object for one page of a static portfolio site (vanilla JS, Web
Components, no build step). Each project page holds a single JavaScript object named
`PROJECT_DATA` inside an inline `<script id="projectConfig">`, and a renderer
(`components/projectPageLayout.js`) walks that object and builds the DOM.

Your job: output **only that object**. I already have the page around it.

## Hard rules

1. Output `const PROJECT_DATA = { ... };` and nothing else — no surrounding HTML, no `<head>`,
   no `<script>` tags, no explanation of the schema.
2. It is **JavaScript, not JSON** — unquoted keys, trailing commas allowed, backtick template
   literals for multi-line text and for text containing quotes. Never `JSON.parse`, never
   quote the keys.
3. The object lives in `projects/<slug>.html`, so every asset path is relative and starts
   with `../`.
4. Do not invent asset files. Every image, clip and snippet comes from the asset list in the
   INPUTS, placed where my outline puts it. If something is missing (trailer, screenshots,
   embed), omit that field and say so in the notes.
5. Never put a literal `</script>` inside a code snippet string — it would close the tag.

## Schema

```js
const PROJECT_DATA = {
  title: "Project Name", // also becomes "<title> | Niels de Laat"
  title_i18n: "__NO_TRANSLATE__", // proper nouns stay untranslated
  // githubButtons: false,        // optional: hides the "View on GitHub" button on every code block

  sections: [
    /* rendered in order, see section types below */
  ],

  sidebar: {
    trailerUrl: "https://www.youtube-nocookie.com/embed/<11-char-id>",
    screenshots: [{ src: "../images/webp/ProjectScreenShots/<Folder>/<Name>.webp", alt: "<Project> Screenshot 1", thumbs: [400, 800], w: 1919, h: 1079 }],
    socialButtons: [{ url: "https://github.com/...", icon: "fab fa-github", title: "View on GitHub", target: "_blank", rel: "noreferrer" }],
  },

  embed: {
    // itch.io player; omit the whole key if there is none
    enabled: true,
    url: "https://itch.io/embed-upload/<id>?color=1E1E1E",
    playableOnMobile: false, // true only for portrait / touch-friendly builds
  },
};
```

`sidebar.socialButtons` must always be present (even as a single GitHub link): the renderer
reads it without a null check and throws if it is missing, which stops the page rendering
halfway.

### Section types

Every entry in `sections` is one of these four shapes.

**1. Text** (default — no `type` key). Renders an `<h3>` then a `<p>`.

```js
{ title: "Description", title_i18n: "projectPages.description",
  content: `Plain text. Backticks let you use "quotes" and apostrophes freely.`,
  content_i18n: "projectPages.<slug>.description" }
```

For a continuation paragraph under the previous heading, omit `title` and set
`title_i18n: "__NO_TRANSLATE__"` — the empty `<h3>` collapses visually.

**2. List**

```js
{ title_i18n: "__NO_TRANSLATE__", type: "list",
  content: "Optional lead-in paragraph above the list",
  items: ["First point.", "Second point."],
  items_i18n: ["projectPages.<slug>.point1", "projectPages.<slug>.point2"] }
```

`items_i18n` must be the same length and order as `items`.

**3. Code block** (syntax-highlighted card with a "View on GitHub" button)

```js
{ type: "codeblock",
  githubUrl: "https://github.com/<user>/<repo>/blob/main/<path>#L40-L45",
  language: "csharp",              // prism language id: csharp, javascript, glsl, json...
  buttonI18n: "projectPages.viewOnGitHub",
  buttonText: "View on github",
  buttonTitle: "View on GitHub",
  code: `
void Example() {
  // 5-15 lines, two-space indent, leading newline as shown
}` }
```

Keep snippets short — one idea each — and link the exact line range on GitHub.

**Turning the button off.** The card renders without the "View on GitHub" button when there
is nowhere to send the reader — useful for a private or client repo where the code is shown
but not published. Any one of these does it:

- leave `githubUrl` off the block (or set it to `""`),
- set `githubButton: false` on the block, when you have the URL but do not want it public,
- set `githubButtons: false` on `PROJECT_DATA` itself, which drops the button from every code
  block on that page.

`buttonI18n` / `buttonText` / `buttonTitle` are ignored while the button is hidden, so they
can stay in the object.

**Who picks the snippets.** The INPUTS have a _Snippets_ field set to one of:

- `manual` — I paste the exact code. Use it verbatim (only trimming blank edges); do not
  rewrite, reformat or "improve" it. If I gave a line range, use it; if not, leave the `#L..`
  fragment off the `githubUrl` and note that in the notes.
- `you pick` — choose them yourself from the repo/files I point you at. Pick 2-5 snippets
  that each show a distinct thing I built (not boilerplate, not `Start()`/`Update()`
  scaffolding, not generated code), 5-15 lines each, copied **exactly** as they appear in the
  source — same names, same braces, same indentation. Work out the real line range and put it
  in the `githubUrl`. In your notes, say which file and lines each one came from so I can
  check it.
- `you pick, I approve` — same as `you pick`, but first list the candidate snippets (file,
  lines, first line of each) and stop. Wait for my go-ahead before writing the object.

**4. Media** (inline image, local video, or YouTube clip)

```js
// local video (preferred for gameplay clips; .webm, autoplays muted + looped in view)
{ type: "media", mediaType: "video", src: "../videos/webm/<Folder>/<Clip>.webm",
  alt: "<what the clip shows>", loading: "lazy" }

// YouTube clip inline in the body (auto-detected from the URL, click-to-load)
{ type: "media", mediaType: "video",
  src: "https://www.youtube-nocookie.com/embed/<id>", alt: "<description>" }

// single image
{ type: "media", mediaType: "image", src: "../images/webp/<...>.webp",
  alt: "<description>", maxWidth: "800px" }

// side-by-side images: src / alt / maxWidth become parallel arrays
{ type: "media", mediaType: "image",
  src: ["../images/webp/a.webp", "../images/webp/b.webp"],
  alt: ["A", "B"], maxWidth: ["300px", "300px"] }
```

## Layout: my outline decides the page

The INPUTS contain an **asset list**, where every image, clip and snippet gets a short id
(`IMG1`, `VID1`, `CODE1`, ...), and an **outline** that places those ids in order. The
outline is authoritative:

- Build the `sections` array in exactly the outline's order.
- Use exactly the assets it names, in the places it names them. Never introduce an id that is
  not in the asset list, and never silently drop one that is.
- Do not add sections I did not ask for, and do not merge or reorder mine.
- If an id appears in the outline but not in the asset list (or vice versa), leave that spot
  out and flag it in the notes instead of guessing a path.

Outline shorthand — one instruction per line:

```
H: Enemy AI — The Chicken     -> text section, this heading, body from my feature notes
P: how the patrol works       -> continuation paragraph, no heading
LIST: raycast, flip, damage   -> list section, one item per comma-separated point
CODE2                         -> codeblock for snippet id CODE2
VID1                          -> local video clip, full width
IMG3                          -> single image
IMG1 + IMG2                   -> those two images side by side in one row
EMBED                         -> the itch.io player (otherwise it lands last by default)
```

`H:` and `P:` lines are prompts for you to write the prose from my feature notes, in first
person ("I implemented...", "I built..."), focused on my contribution rather than the
project's marketing pitch. Keep each to 2-4 sentences.

**If the outline field is empty**, fall back to this default order, which matches the
existing pages: `Description` (always `title_i18n: "projectPages.description"`) → `What I
Made` (heading only: `title_i18n: "projectPages.whatIMadeTitle"`,
`content_i18n: "__NO_TRANSLATE__"`, no `content`) → one block per feature I list, each as
text → codeblock → clip, consuming the assets in the order I listed them → embed last.

Sidebar assets are chosen separately from the body: only the ids I mark for the sidebar
become `sidebar.screenshots`, in that order. An image can appear in both if I place it in the
outline as well.

## Translation keys

The site runs EN / NL / MI through `js/translate.js`. Every rendered string carries a
`data-i18n` key, and **if you omit an `_i18n` field the renderer invents a bogus fallback
key** (`projects.wa_lch.sections.3.title`), which breaks language switching. So:

- Every text section needs both `title_i18n` and `content_i18n`.
- Every list needs `items_i18n`.
- Use `"__NO_TRANSLATE__"` for anything that must stay as written (proper nouns, empty
  headings, the page title).
- New keys go under `projectPages.<projectSlugCamelCase>` and are nested by feature, e.g.
  `projectPages.mazeCollector.enemy.enemyTitle`.
- Reuse the shared keys where they fit: `projectPages.description`,
  `projectPages.whatIMadeTitle`, `projectPages.viewOnGitHub`, `projectPages.trailer`,
  `projectPages.screenshots`, `projectPages.exploreCode`, `projectPages.tryItOut`,
  `projectPages.credits`, `projectPages.developers`, `projectPages.artists`.

Only write the translation files themselves if I asked for them in the INPUTS; otherwise just
use the keys in the object and list the new ones in your notes.

## Asset conventions (do not invent files)

- Screenshots live in `images/webp/ProjectScreenShots/<ProjectFolder>/` as `.webp`.
- `thumbs: [400, 800]` means `<name>-400.webp` and `<name>-800.webp` **must already exist**
  next to the original. If the INPUTS do not say the resized copies exist, leave `thumbs` out
  entirely and give only `src`, `alt`, `w`, `h`.
- `w` / `h` are the original pixel dimensions; they reserve layout space so the sidebar does
  not jump. If unknown, omit both rather than guessing.
- Videos live in `videos/webm/<ProjectFolder>/` as `.webm`.
- Any YouTube trailer or inline YouTube clip needs a local poster at
  `images/video-thumbs/<11-char-video-id>.jpg` — the player is click-to-load and never touches
  Google on page load. Flag this in your notes for every YouTube id you use.

## Output format

Reply with exactly two parts, nothing else before or after:

1. One fenced ```js block containing `const PROJECT_DATA = { ... };` — complete, paste-ready.
2. **Notes** — a short bullet list of: the new translation keys I need to add, assets I still
   need to create (video-thumb jpgs, `-400`/`-800` screenshot variants), any outline line or
   asset id you could not honour and why, the file + line range behind each snippet you picked
   yourself, and any guess you made.

Do not output HTML. Do not explain the schema back to me. Do not ask clarifying questions —
where the INPUTS are silent, pick the safest option and list it in the notes. The one
exception is `Snippets: you pick, I approve`, where you stop after listing the candidates.

---

## INPUTS

### 1. Project

- **Project name:**
- **Slug (file name without .html):**
- **What it is (2-4 sentences, incl. jam/course/team context and any award):**
- **What I personally built (one line per feature):**
- **GitHub repo URL:**
- **Also write the en/nl/mi translation blocks?** no (default) / yes

### 2. Assets — give each one an id

Images (`IMG1`, `IMG2`, ...). `thumbs` column: yes only if the `-400.webp` and `-800.webp`
copies already exist on disk.

| id   | path                                                   | alt | w x h     | thumbs? | sidebar? |
| ---- | ------------------------------------------------------ | --- | --------- | ------- | -------- |
| IMG1 | ../images/webp/ProjectScreenShots/<Folder>/<Name>.webp |     | 1919x1080 | yes     | yes      |

Video clips (`VID1`, `VID2`, ...):

| id   | path                                | what it shows |
| ---- | ----------------------------------- | ------------- |
| VID1 | ../videos/webm/<Folder>/<Clip>.webm |               |

- **Trailer YouTube URL (sidebar):**
- **itch.io embed URL:** — **playable on touch?** yes / no

### 3. Code snippets

- **Snippets:** `manual` | `you pick` | `you pick, I approve`

If `manual`, one block per id:

```
CODE1
language: csharp
file: Assets/Niels/Scripts/BasicEnemy.cs   lines: 40-45
<paste the code here>
```

If `you pick`, tell it where to look instead:

- **Look in:** (repo paths, folders or files — e.g. `Assets/Niels/Scripts/`)
- **Aim for:** (how many snippets, and which features they should cover)

### 4. Outline — the page order

Leave blank for the default layout. Otherwise one instruction per line, using the shorthand
from the _Layout_ section (`H:` `P:` `LIST:` `CODE1` `VID1` `IMG1 + IMG2` `EMBED`):

```
H: Description
P: what the game is and the jam it was made for
H: What I Made
H: Enemy AI — The Chicken
P: patrol logic, raycasts, what happens on contact
CODE1
LIST: raycasts around walls, flips direction, damages player, dies to the box
VID1
H: Finish System
P: saves damage state, plays the animation, loads the next scene
CODE2
VID2
EMBED
```

=== PROMPT END ===
