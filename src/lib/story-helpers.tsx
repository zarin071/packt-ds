/**
 * Shared Storybook helpers — import in story files only.
 */
import {
  CheckSvg, XSvg,
  ChevronDownSvg, ChevronLeftSvg, ChevronRightSvg, ChevronUpSvg,
  MoreHorizontalSvg, SearchSvg,
  InfoSvg, AlertTriangleSvg, AlertCircleSvg, CheckCircleSvg,
  MinusSvg, FileTextSvg, UploadSvg, InboxSvg,
  UserSvg, MenuSvg, ShoppingCartSvg, ExternalLinkSvg,
  BookOpenSvg, PlaySvg, HeadphonesSvg,
  StarOutlineSvg, StarFilledSvg,
  BellSvg, ZapSvg,
} from '../components/atoms/Icon/packt-icons';

export const ICON_OPTIONS = [
  'none',
  'check', 'x', 'search', 'menu', 'user',
  'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
  'more-horizontal', 'info', 'alert-triangle', 'alert-circle', 'check-circle',
  'minus', 'file-text', 'upload', 'inbox',
  'shopping-cart', 'external-link',
  'book-open', 'play', 'headphones',
  'star', 'star-outline', 'bell', 'zap',
] as const;

export type IconOption = (typeof ICON_OPTIONS)[number];

const ICON_MAP: Record<string, React.ReactNode> = {
  none: undefined,
  check: <CheckSvg />,
  x: <XSvg />,
  search: <SearchSvg />,
  menu: <MenuSvg />,
  user: <UserSvg />,
  'chevron-down': <ChevronDownSvg />,
  'chevron-left': <ChevronLeftSvg />,
  'chevron-right': <ChevronRightSvg />,
  'chevron-up': <ChevronUpSvg />,
  'more-horizontal': <MoreHorizontalSvg />,
  info: <InfoSvg />,
  'alert-triangle': <AlertTriangleSvg />,
  'alert-circle': <AlertCircleSvg />,
  'check-circle': <CheckCircleSvg />,
  minus: <MinusSvg />,
  'file-text': <FileTextSvg />,
  upload: <UploadSvg />,
  inbox: <InboxSvg />,
  'shopping-cart': <ShoppingCartSvg />,
  'external-link': <ExternalLinkSvg />,
  'book-open': <BookOpenSvg />,
  play: <PlaySvg />,
  headphones: <HeadphonesSvg />,
  star: <StarFilledSvg />,
  'star-outline': <StarOutlineSvg />,
  bell: <BellSvg />,
  zap: <ZapSvg />,
};

/**
 * Returns a Storybook argType config that renders a select control with
 * every Packt icon. The `mapping` converts the selected name string to a
 * rendered SVG before passing it to the component.
 *
 * Usage in a story:
 *   argTypes: { leadingIcon: iconArgType() }
 *   args:     { leadingIcon: 'none' }
 */
export function iconArgType(_size?: string) {
  return {
    control: 'select' as const,
    options: [...ICON_OPTIONS],
    mapping: ICON_MAP,
    description: 'Packt design system icon',
  };
}
