# Component Spec — FileUpload
# 03-component-specs/FileUpload.md
# Version: 1.0.0

---

## Purpose

A drag-and-drop / click-to-browse drop zone for selecting files, with a list of selected files shown below it (each removable).
Use FileUpload for profile photos, document attachments, and bulk import flows.
Use a plain `<input type="file">` when no visual affordance or file list is needed.

---

## Anatomy

```
┌─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─┐  ← dropZone (dashed border)
│          [ UploadIcon ]             │
│        Drop files here              │
│        or click to browse           │
│     image/png, image/jpeg           │  ← accept hint (optional)
└─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─  ─┘

┌──────────────────────────────────┐
│ [ FileIcon ]  filename.pdf       │  ← fileRow
│               12.4 KB        [×] │
└──────────────────────────────────┘
```

Named parts:
- `root` — outer `<div>` flex column with `gap-s`
- `dropZone` — `role="button"` div; handles drag/click/keyboard; contains hidden `<input type="file">`
- `uploadIcon` — UploadIcon (48×48) shown in the zone
- `zoneLabel` — "Drop files here" + "or click to browse" text
- `acceptHint` — the `accept` string displayed as tiny text
- `fileList` — `<ul aria-label="Uploaded files">` rendered below the zone
- `fileRow` — `<li>` per file: FileIcon, name/size, remove button

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accept` | `string` | — | No | MIME types or extensions passed to `<input accept>`. Also displayed as a hint inside the zone. |
| `multiple` | `boolean` | `false` | No | Allow selecting/dropping more than one file. |
| `onChange` | `(files: UploadedFile[]) => void` | — | No | Called with the full current file list on every change. |
| `disabled` | `boolean` | `false` | No | Disables the zone and prevents file selection. |

### `UploadedFile` shape

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | File name |
| `size` | `number` | File size in bytes |
| `file` | `File` | Native File object |

---

## States

### Drop zone states

| State | Visual change | Token used |
|-------|--------------|-----------|
| Default | Dashed border | `border-default`, `bg-surface` |
| Hover | Brand border + tinted bg | `brand-border-default`, `brand-bg-hover` |
| Dragging | Same as hover | `brand-border-default`, `brand-bg-hover` |
| Disabled | Muted, no pointer | `border-disabled`, `bg-disabled`, opacity-60 |
| Focus | 2px ring | `focus-ring` |

### File row states

| State | Visual change |
|-------|--------------|
| Default | Bordered row, filename + size |
| Remove hover | Remove button turns red | `status-bg-error`, `status-text-error` |
| Remove focus | 2px ring on button | `focus-ring` |

---

## Token consumption map

```
Layout
  --radius-s               drop zone border-radius
  --radius-xs              file row border-radius, remove button border-radius
  --space-2xl              drop zone padding (both axes)
  --space-s                gap between zone and file list
  --space-xs               gap between file rows
  --space-l                file row horizontal padding
  --space-m                file row vertical padding
  --space-s                gap inside file row
  --space-2xs              remove button padding

Colors — drop zone
  --border-default         default dashed border
  --bg-surface             zone background
  --brand-border-default   hover/drag active border
  --brand-bg-hover         hover/drag active background
  --border-disabled        disabled border
  --bg-disabled            disabled background
  --brand-icon-default     upload icon colour

Colors — zone text
  --content-primary        "Drop files here"
  --content-tertiary       "or click to browse", accept hint

Colors — file row
  --border-default         row border
  --bg-surface             row background
  --content-secondary      file icon, file size
  --content-primary        file name

Colors — remove button
  --content-secondary      default icon colour
  --content-primary        hovered icon colour
  --status-bg-error        remove button hover background
  --status-text-error      remove button hover icon colour

Focus
  --focus-ring             focus ring (zone + remove button)
```

---

## Accessibility

### Drop zone
```tsx
<div
  role="button"
  tabIndex={disabled ? -1 : 0}
  aria-label="Drop files here or click to upload"
  aria-disabled={disabled || undefined}
  onKeyDown={/* Enter/Space → inputRef.click() */}
>
  <input type="file" aria-hidden="true" tabIndex={-1} />
</div>
```

- The `role="button"` makes the zone keyboard-activatable
- The hidden `<input>` is excluded from tab order and AT with `aria-hidden`
- `aria-disabled` is used (not `disabled`) so the element stays focusable

### File list
```tsx
<ul aria-label="Uploaded files">
  <li>
    <button aria-label={`Remove ${f.name}`}>…</button>
  </li>
</ul>
```

- `aria-label` on the list gives it a meaningful region name
- Each remove button has an `aria-label` naming the specific file

### Keyboard behaviour
| Key | Action |
|-----|--------|
| `Tab` | Focus the drop zone |
| `Enter` or `Space` | Open file picker |
| `Tab` (in list) | Move through remove buttons |
| `Enter` (on remove) | Remove the file |

---

## Usage rules

### Do
- Always set `accept` when file type matters (e.g. `"image/*"` or `".pdf,.docx"`)
- Show an `onChange` handler — the component manages its own file list, but callers typically need it for upload
- Use `multiple={false}` for avatar/profile photo flows (one file at a time)
- Validate file size and type after `onChange` — this component does no validation

### Don't
- Don't rely on the `accept` string for security validation — it is advisory only
- Don't omit the `disabled` prop during upload — re-enabling mid-upload causes confusing file accumulation
- Don't use FileUpload inside a small container — the zone needs room to breathe

---

## Content / copy guidelines

- Zone labels are fixed: "Drop files here" / "or click to browse"
- `accept` hint: use human-readable formats if possible — "image/png, image/jpeg" rather than raw MIME strings in consumer UI; the component renders whatever string is passed

---

## Figma Code Connect

```ts
import { figma } from '@figma/code-connect';
import { FileUpload } from './FileUpload';

figma.connect(FileUpload, 'FIGMA_NODE_ID', {
  props: {
    disabled: figma.boolean('Disabled'),
  },
  example: ({ disabled }) => (
    <FileUpload disabled={disabled} accept="image/*" />
  ),
});
```

---

## Storybook stories to generate

1. `Playground` — all controls enabled
2. `Default` — empty zone, no files
3. `WithFiles` — zone + pre-populated file list
4. `MultipleFiles` — multiple={true} with several files
5. `WithAcceptFilter` — accept="image/*" hint shown
6. `Disabled` — zone in disabled state
7. `DragActive` — simulate dragging state (Storybook decorator)
8. `LightAndDark` — both themes

---

## Related components

- `Button` — can be used as an alternative trigger ("Browse files")
- `Input` — for text-based file paths when drag-and-drop is not desired
