/**
 * Shared Storybook helpers — import these in story files only, not in
 * component source (they depend on MaterialIcon and Storybook types).
 */
import { MaterialIcon } from '../components/Icon/MaterialIcon';
import type { MaterialIconSize } from '../components/Icon/MaterialIcon.types';

export const ICON_OPTIONS = [
  'none',
  // Navigation
  'menu', 'close', 'search', 'arrow_back', 'arrow_forward',
  'chevron_left', 'chevron_right', 'expand_more', 'expand_less', 'more_horiz',
  // Actions
  'add', 'edit', 'delete', 'save', 'download', 'upload', 'share', 'refresh',
  'filter_list', 'sort', 'settings', 'tune', 'open_in_new',
  // Status / feedback
  'check', 'check_circle', 'info', 'warning', 'error', 'help', 'cancel',
  // E-commerce
  'shopping_cart', 'favorite', 'bookmark', 'star', 'local_offer', 'sell',
  // Content & media
  'menu_book', 'play_arrow', 'headphones', 'description', 'image', 'link',
  'article', 'video_library', 'folder',
  // User & auth
  'person', 'account_circle', 'lock', 'lock_open', 'visibility', 'email',
  // Misc
  'home', 'notifications', 'calendar_today', 'access_time', 'bolt',
] as const;

export type IconOption = (typeof ICON_OPTIONS)[number];

/**
 * Returns a Storybook argType config that renders a select control with
 * every icon in ICON_OPTIONS. Storybook's `mapping` converts the selected
 * name string to a rendered <MaterialIcon> before passing it to the component.
 *
 * Usage in a story:
 *   argTypes: { leadingIcon: iconArgType('md') }
 *   args:     { leadingIcon: 'none' }  // default = no icon
 */
export function iconArgType(size: MaterialIconSize = 'md') {
  const mapping: Record<string, React.ReactNode> = {};
  for (const name of ICON_OPTIONS) {
    mapping[name] = name === 'none' ? undefined : <MaterialIcon name={name} size={size} />;
  }
  return {
    control: 'select' as const,
    options: [...ICON_OPTIONS],
    mapping,
    description: 'Material Symbol icon name',
  };
}
