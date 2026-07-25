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

function iconArgType(_size?: string) {
  const size = _size === 'sm' ? 16 : _size === 'lg' ? 24 : 20;
  const map: Record<string, React.ReactNode> = {
    none: undefined,
    check: <CheckSvg width={size} height={size} />,
    x: <XSvg width={size} height={size} />,
    search: <SearchSvg width={size} height={size} />,
    menu: <MenuSvg width={size} height={size} />,
    user: <UserSvg width={size} height={size} />,
    'chevron-down': <ChevronDownSvg width={size} height={size} />,
    'chevron-left': <ChevronLeftSvg width={size} height={size} />,
    'chevron-right': <ChevronRightSvg width={size} height={size} />,
    'chevron-up': <ChevronUpSvg width={size} height={size} />,
    'more-horizontal': <MoreHorizontalSvg width={size} height={size} />,
    info: <InfoSvg width={size} height={size} />,
    'alert-triangle': <AlertTriangleSvg width={size} height={size} />,
    'alert-circle': <AlertCircleSvg width={size} height={size} />,
    'check-circle': <CheckCircleSvg width={size} height={size} />,
    minus: <MinusSvg width={size} height={size} />,
    'file-text': <FileTextSvg width={size} height={size} />,
    upload: <UploadSvg width={size} height={size} />,
    inbox: <InboxSvg width={size} height={size} />,
    'shopping-cart': <ShoppingCartSvg width={size} height={size} />,
    'external-link': <ExternalLinkSvg width={size} height={size} />,
    'book-open': <BookOpenSvg width={size} height={size} />,
    play: <PlaySvg width={size} height={size} />,
    headphones: <HeadphonesSvg width={size} height={size} />,
    star: <StarFilledSvg width={size} height={size} />,
    'star-outline': <StarOutlineSvg width={size} height={size} />,
    bell: <BellSvg width={size} height={size} />,
    zap: <ZapSvg width={size} height={size} />,
  };

  return {
    control: 'select' as const,
    options: [...ICON_OPTIONS],
    mapping: map,
    description: 'Packt design system icon',
  };
}

export { iconArgType };
