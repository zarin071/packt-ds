# 09 — Figma Rules
# Standards Claude must follow when reading or modifying Figma files via MCP

---

## Naming conventions

### Components
- Singular noun or noun phrase: `Button`, `Input`, `Navigation Item`
- Never plural: ~~`Buttons`~~, ~~`Inputs`~~
- Never suffixed with version: ~~`Button v2`~~, ~~`Button New`~~
- Slash grouping for categories: `Forms/Input`, `Forms/Select`, `Overlay/Modal`

### Layers inside components
Every layer must be named semantically. No generic names.

| Wrong | Correct |
|-------|---------|
| `Rectangle 12` | `background` |
| `Group 4` | `content` |
| `Frame 8` | `actions` |
| `Vector 3` | `icon` |
| `Text` | `label` |

### Variant properties
Exact property names must match React prop names:

| Figma property | React prop |
|---------------|-----------|
| `Variant` | `variant` |
| `Size` | `size` |
| `Disabled` | `disabled` |
| `Loading` | `loading` |
| `Hub` | `hub` |

Variant option values must also match:

| Figma option | React value |
|-------------|------------|
| `Primary` | `primary` |
| `Secondary` | `secondary` |
| `Small` | `sm` |
| `Medium` | `md` |
| `Large` | `lg` |

This mapping is required for Code Connect to work without custom transforms.

---

## Variable scopes

Every variable must have the correct Figma scope set:

| Variable type | Figma scope |
|--------------|------------|
| Background / fill colours | `FRAME_FILL`, `SHAPE_FILL` |
| Text colours | `TEXT_FILL`, `STROKE_COLOR` |
| Border / stroke colours | `STROKE_COLOR` |
| Border radius | `CORNER_RADIUS` |
| Spacing / padding | `GAP` |
| Stroke width | `STROKE_FLOAT` |
| Font size | `FONT_SIZE` |
| Line height | `LINE_HEIGHT` |
| Letter spacing | `LETTER_SPACING` |
| Font weight | `FONT_STYLE` |
| Font family | `FONT_FAMILY` |
| Breakpoints | `WIDTH_HEIGHT` |

Setting scopes incorrectly means variables won't appear in the right panels.

---

## Variable collections structure

```
Collection 1: Primitives / Color
  Mode: Default (single mode)
  Groups: Orange/, Teal/, Violet/, Neutral/, Base/

Collection 2: Semantic / Color
  Modes: Light, Dark
  Groups: Brand/, Hub-Learn/, Hub-News/, Content/,
          Background/, Border/, Icon/, Surface/, Overlay/

Collection 3: Semantic / Type
  Modes: Large Desktop, Desktop, Tablet, Mobile
  Groups: Heading/, Text/

Collection 4: Borders
  Mode: Default (single mode)
  Groups: Radius/, Width/

Collection 5: Space
  Mode: Default (single mode)
  Groups: Space/ (2XS through 12XL)

Collection 6: Layout
  Mode: Default (single mode)
  Groups: Breakpoint/, Unit/
```

---

## Component structure requirements

When auditing components via MCP, check for:

### 1. All layers are named
No layer should have a generic default name.
Flag: Any layer named `Rectangle`, `Group`, `Frame`, `Vector`, `Ellipse` followed by a number.

### 2. All fills use variables
No fill, stroke, or effect should use a raw hex value.
Flag: Any layer with a fill that is not linked to a variable from Collection 2.

### 3. Typography uses text styles or variables
All text layers must reference:
- A text style from the Library, OR
- Font-size, line-height, letter-spacing, and font-weight variables from Collection 3

Flag: Any text layer with manually-set type properties not linked to variables.

### 4. Autolayout is applied
Components should use Autolayout, not absolute positioning.
Flag: Components where child layers use fixed positioning when Autolayout would be appropriate.

### 5. Spacing uses variables
All padding and gap values inside Autolayout should reference Space/ variables.
Flag: Any padding or gap value that is a raw number, not a Space/ variable reference.

### 6. Component has a description
Every component and component set should have a description in the component panel.
Flag: Components with empty descriptions.

---

## Code Connect requirements

Every published component must have a Code Connect file.

File location: `src/components/[ComponentName]/[ComponentName].figma.ts`

Required content per component:
```ts
import { figma } from '@figma/code-connect';
import { ComponentName } from './ComponentName';

figma.connect(ComponentName, '[FIGMA_NODE_ID]', {
  props: {
    // Map every Figma variant property to its React prop
    // Map every Figma boolean to its React boolean prop
    // Map every Figma text layer to its React string prop
  },
  example: ({ ...props }) => (
    <ComponentName {...props} />
  ),
});
```

To get the `FIGMA_NODE_ID`, right-click the component in Figma → Copy/Paste as → Copy link.
The node ID is the portion after `node-id=` in the URL.

---

## What Claude should NOT do via Figma MCP

Claude can READ via Figma MCP:
- Component structure, layer names, variant properties
- Variable names, values, modes
- Text styles, fills, strokes

Claude should NOT attempt to:
- Create Auto Layout programmatically (use Tokens Studio for variable sync instead)
- Reposition layers (coordinate math in Figma units is error-prone at scale)
- Create new component sets (do this manually in Figma, then audit with Claude)

The correct workflow is:
1. Design in Figma manually
2. Use Claude MCP to AUDIT against the spec
3. Fix gaps in Figma manually
4. Use Tokens Studio to sync variable changes to code
