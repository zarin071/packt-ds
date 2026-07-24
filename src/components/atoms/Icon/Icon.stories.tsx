import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MaterialIcon } from './MaterialIcon';
import { Icon } from './Icon';
import {
  CheckIcon, CloseIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
  ChevronUpIcon, EllipsisIcon, SearchIcon, InfoIcon, WarningIcon, ErrorIcon,
  SuccessIcon, MenuIcon, CartIcon, BookIcon, PlayIcon, HeadphonesIcon,
  StarIcon, StarOutlineIcon, StarHalfIcon, UserIcon, FileIcon, UploadIcon,
  GitHubIcon, TwitterIcon, LinkedInIcon, YouTubeIcon, ExternalLinkIcon,
} from '../../../lib/icons';

const meta: Meta<typeof MaterialIcon> = {
  title: 'Foundation/Icons',
  component: MaterialIcon,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fill: { control: 'boolean' },
    weight: { control: 'select', options: [100, 200, 300, 400, 500, 600, 700] },
    grade: { control: 'select', options: [-25, 0, 200] },
  },
};

export default meta;
type Story = StoryObj<typeof MaterialIcon>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { name: 'check_circle', size: 'lg', fill: false, weight: 400, grade: 0 },
};

// ─── System Icons (design-system named exports) ───────────────────────────────

export const SystemIcons: Story = {
  name: 'System Icons',
  parameters: { controls: { disable: true } },
  render: () => {
    const groups: { label: string; icons: { name: string; el: React.ReactNode }[] }[] = [
      {
        label: 'Semantic / Status',
        icons: [
          { name: 'InfoIcon', el: <InfoIcon size="lg" /> },
          { name: 'WarningIcon', el: <WarningIcon size="lg" /> },
          { name: 'ErrorIcon', el: <ErrorIcon size="lg" /> },
          { name: 'SuccessIcon', el: <SuccessIcon size="lg" /> },
        ],
      },
      {
        label: 'Navigation',
        icons: [
          { name: 'MenuIcon', el: <MenuIcon size="lg" /> },
          { name: 'ChevronDownIcon', el: <ChevronDownIcon size="lg" /> },
          { name: 'ChevronUpIcon', el: <ChevronUpIcon size="lg" /> },
          { name: 'ChevronLeftIcon', el: <ChevronLeftIcon size="lg" /> },
          { name: 'ChevronRightIcon', el: <ChevronRightIcon size="lg" /> },
          { name: 'EllipsisIcon', el: <EllipsisIcon size="lg" /> },
          { name: 'SearchIcon', el: <SearchIcon size="lg" /> },
          { name: 'CloseIcon', el: <CloseIcon size="lg" /> },
          { name: 'ExternalLinkIcon', el: <ExternalLinkIcon size="lg" /> },
        ],
      },
      {
        label: 'E-Commerce',
        icons: [
          { name: 'CartIcon', el: <CartIcon size="lg" /> },
        ],
      },
      {
        label: 'Content & Media',
        icons: [
          { name: 'BookIcon', el: <BookIcon size="lg" /> },
          { name: 'PlayIcon', el: <PlayIcon size="lg" /> },
          { name: 'HeadphonesIcon', el: <HeadphonesIcon size="lg" /> },
          { name: 'FileIcon', el: <FileIcon size="lg" /> },
          { name: 'UploadIcon', el: <UploadIcon size="lg" /> },
        ],
      },
      {
        label: 'Rating',
        icons: [
          { name: 'StarIcon', el: <StarIcon size="lg" /> },
          { name: 'StarHalfIcon', el: <StarHalfIcon size="lg" /> },
          { name: 'StarOutlineIcon', el: <StarOutlineIcon size="lg" /> },
        ],
      },
      {
        label: 'User',
        icons: [
          { name: 'UserIcon', el: <UserIcon size="lg" /> },
          { name: 'CheckIcon', el: <CheckIcon size="lg" /> },
        ],
      },
      {
        label: 'Brand (SVG)',
        icons: [
          { name: 'GitHubIcon', el: <span style={{ fontSize: 24 }}><GitHubIcon /></span> },
          { name: 'TwitterIcon', el: <span style={{ fontSize: 24 }}><TwitterIcon /></span> },
          { name: 'LinkedInIcon', el: <span style={{ fontSize: 24 }}><LinkedInIcon /></span> },
          { name: 'YouTubeIcon', el: <span style={{ fontSize: 24 }}><YouTubeIcon /></span> },
        ],
      },
    ];

    return (
      <div style={{ fontFamily: 'Outfit, sans-serif', display: 'flex', flexDirection: 'column', gap: 32 }}>
        {groups.map((g) => (
          <div key={g.label}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#797979', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              {g.label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.icons.map(({ name, el }) => (
                <div
                  key={name}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '12px 10px', borderRadius: 8, border: '1px solid #e5e5e5',
                    width: 96, cursor: 'default',
                  }}
                >
                  <span style={{ color: 'var(--packt-content-primary, #1a1a1a)' }}>{el}</span>
                  <span style={{ fontSize: 10, color: '#797979', textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── Full Material Symbols Gallery ────────────────────────────────────────────

const ICON_CATALOG: Record<string, string[]> = {
  'Navigation': [
    'menu', 'close', 'search', 'arrow_back', 'arrow_forward', 'arrow_upward',
    'arrow_downward', 'chevron_left', 'chevron_right', 'expand_more', 'expand_less',
    'home', 'settings', 'more_horiz', 'more_vert', 'open_in_new', 'drag_handle',
  ],
  'Actions': [
    'add', 'add_circle', 'edit', 'delete', 'save', 'download', 'upload',
    'share', 'copy_all', 'content_paste', 'refresh', 'filter_list', 'sort',
    'tune', 'undo', 'redo', 'send', 'print', 'bookmark', 'favorite',
  ],
  'E-Commerce': [
    'shopping_cart', 'storefront', 'local_offer', 'sell', 'receipt', 'payment',
    'credit_card', 'redeem', 'card_giftcard', 'loyalty', 'discount', 'shopping_bag',
    'inventory', 'package_2', 'delivery_truck_speed', 'currency_pound',
  ],
  'Content & Media': [
    'menu_book', 'book', 'article', 'description', 'video_library', 'play_arrow',
    'pause', 'stop', 'headphones', 'image', 'photo_camera', 'attachment',
    'link', 'format_quote', 'code', 'data_object', 'terminal', 'school',
  ],
  'Feedback & Rating': [
    'star', 'star_half', 'thumb_up', 'thumb_down', 'info', 'warning',
    'error', 'check_circle', 'cancel', 'help', 'live_help', 'report',
    'feedback', 'notifications', 'notification_important',
  ],
  'User & Auth': [
    'person', 'account_circle', 'group', 'groups', 'lock', 'lock_open',
    'logout', 'login', 'verified_user', 'admin_panel_settings',
    'manage_accounts', 'badge', 'contact_page',
  ],
  'Communication': [
    'email', 'mark_email_read', 'chat', 'chat_bubble', 'forum',
    'contact_support', 'support_agent', 'record_voice_over', 'call',
  ],
  'Layout & UI': [
    'grid_view', 'list', 'view_module', 'view_list', 'dashboard',
    'layers', 'table_chart', 'bar_chart', 'pie_chart', 'trending_up',
    'pages', 'fullscreen', 'fullscreen_exit', 'zoom_in', 'zoom_out',
  ],
  'Devices & File': [
    'smartphone', 'computer', 'tablet', 'cloud', 'cloud_upload', 'cloud_download',
    'folder', 'folder_open', 'create_new_folder', 'insert_drive_file',
    'file_copy', 'file_open', 'archive', 'unarchive',
  ],
};

function IconTile({ name, fill, size }: { name: string; fill: boolean; size: 'sm' | 'md' | 'lg' }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard?.writeText(name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Click to copy "${name}"`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        padding: '12px 8px', borderRadius: 8,
        border: '1px solid', borderColor: copied ? '#5c36f5' : '#e5e5e5',
        background: copied ? '#f0edff' : 'transparent',
        width: 96, cursor: 'pointer', transition: 'all 120ms',
      }}
    >
      <MaterialIcon name={name} size={size} fill={fill} style={{ color: 'var(--packt-content-primary, #1a1a1a)' }} />
      <span style={{ fontSize: 10, color: '#797979', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all' }}>
        {copied ? '✓ copied' : name}
      </span>
    </button>
  );
}

export const Gallery: Story = {
  name: 'Material Symbols Gallery',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const [query, setQuery] = useState('');
    const [fill, setFill] = useState(false);
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

    const q = query.toLowerCase().trim();

    const filtered = Object.entries(ICON_CATALOG).reduce<Record<string, string[]>>(
      (acc, [cat, icons]) => {
        const matches = q
          ? icons.filter((n) => n.includes(q) || cat.toLowerCase().includes(q))
          : icons;
        if (matches.length) acc[cat] = matches;
        return acc;
      },
      {}
    );

    const total = Object.values(filtered).reduce((s, arr) => s + arr.length, 0);

    return (
      <div style={{ fontFamily: 'Outfit, sans-serif', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <MaterialIcon
              name="search"
              size="sm"
              style={{
                position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                color: '#797979',
              }}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons…"
              style={{
                width: '100%', padding: '8px 12px 8px 34px', borderRadius: 8,
                border: '1px solid #e5e5e5', fontSize: 14, outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={fill} onChange={(e) => setFill(e.target.checked)} />
            Filled
          </label>

          <div style={{ display: 'flex', gap: 4 }}>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{
                  padding: '4px 12px', borderRadius: 6, border: '1px solid',
                  borderColor: size === s ? '#5c36f5' : '#e5e5e5',
                  background: size === s ? '#5c36f5' : 'transparent',
                  color: size === s ? '#fff' : '#1a1a1a',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          <span style={{ fontSize: 12, color: '#797979', marginLeft: 'auto' }}>
            {total} icon{total !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Icon grid */}
        {Object.keys(filtered).length === 0 ? (
          <p style={{ color: '#797979', fontSize: 14 }}>No icons match "{query}".</p>
        ) : (
          Object.entries(filtered).map(([cat, icons]) => (
            <div key={cat}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#797979', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                {cat}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {icons.map((name) => (
                  <IconTile key={name} name={name} fill={fill} size={size} />
                ))}
              </div>
            </div>
          ))
        )}

        <p style={{ fontSize: 12, color: '#b0b0b0', borderTop: '1px solid #e5e5e5', paddingTop: 16 }}>
          Click any icon to copy its name. Browse the full library at{' '}
          <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer" style={{ color: '#5c36f5' }}>
            fonts.google.com/icons
          </a>
          .
        </p>
      </div>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontFamily: 'Outfit, sans-serif' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <MaterialIcon name="star" size={size} fill />
          <span style={{ fontSize: 11, color: '#797979' }}>
            {size} · {size === 'sm' ? '16' : size === 'md' ? '20' : '24'}px
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─── Variable Axes ────────────────────────────────────────────────────────────

export const VariableAxes: Story = {
  name: 'Variable Axes (fill / weight / grade)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Outfit, sans-serif' }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#797979', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Fill</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <MaterialIcon name="favorite" size="lg" fill={false} />
          <MaterialIcon name="favorite" size="lg" fill />
          <span style={{ fontSize: 12, color: '#797979' }}>fill=false → fill=true</span>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#797979', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Weight</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {([100, 300, 400, 500, 700] as const).map((w) => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <MaterialIcon name="notifications" size="lg" weight={w} />
              <span style={{ fontSize: 10, color: '#797979' }}>{w}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#797979', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Grade</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {([-25, 0, 200] as const).map((g) => (
            <div key={g} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <MaterialIcon name="notifications" size="lg" grade={g} />
              <span style={{ fontSize: 10, color: '#797979' }}>{g}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── With Icon Wrapper ────────────────────────────────────────────────────────

export const WithIconWrapper: Story = {
  name: 'With <Icon> Wrapper',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'Outfit, sans-serif' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Icon key={size} size={size} className="text-brand-text-default">
          <MaterialIcon name="bolt" />
        </Icon>
      ))}
    </div>
  ),
};
