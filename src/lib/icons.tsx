import type { SVGProps } from 'react';
import {
  CheckSvg, XSvg,
  ChevronDownSvg, ChevronLeftSvg, ChevronRightSvg, ChevronUpSvg,
  MoreHorizontalSvg, SearchSvg,
  InfoSvg, AlertTriangleSvg, AlertCircleSvg, CheckCircleSvg,
  MinusSvg, FileTextSvg, UploadSvg, InboxSvg,
  UserSvg, MenuSvg, ShoppingCartSvg, ExternalLinkSvg,
  BookOpenSvg, PlaySvg, HeadphonesSvg,
  StarOutlineSvg, StarFilledSvg, StarHalfSvg,
  BellSvg, ZapSvg,
} from '../components/atoms/Icon/packt-icons';

type IconSize = 'sm' | 'md' | 'lg';
const SIZE: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };
type IconProps = { size?: IconSize } & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

const w = (size: IconSize) => ({ width: SIZE[size], height: SIZE[size] });

// ─── Semantic icons (Packt Figma design system) ────────────────────────────────

export const CheckIcon = ({ size = 'md', ...p }: IconProps) => <CheckSvg {...w(size)} {...p} />;
export const CloseIcon = ({ size = 'md', ...p }: IconProps) => <XSvg {...w(size)} {...p} />;
export const ChevronDownIcon = ({ size = 'md', ...p }: IconProps) => <ChevronDownSvg {...w(size)} {...p} />;
export const ChevronLeftIcon = ({ size = 'md', ...p }: IconProps) => <ChevronLeftSvg {...w(size)} {...p} />;
export const ChevronRightIcon = ({ size = 'md', ...p }: IconProps) => <ChevronRightSvg {...w(size)} {...p} />;
export const ChevronUpIcon = ({ size = 'md', ...p }: IconProps) => <ChevronUpSvg {...w(size)} {...p} />;
export const EllipsisIcon = ({ size = 'md', ...p }: IconProps) => <MoreHorizontalSvg {...w(size)} {...p} />;
export const SearchIcon = ({ size = 'md', ...p }: IconProps) => <SearchSvg {...w(size)} {...p} />;
export const InfoIcon = ({ size = 'md', ...p }: IconProps) => <InfoSvg {...w(size)} {...p} />;
export const WarningIcon = ({ size = 'md', ...p }: IconProps) => <AlertTriangleSvg {...w(size)} {...p} />;
export const ErrorIcon = ({ size = 'md', ...p }: IconProps) => <AlertCircleSvg {...w(size)} {...p} />;
export const SuccessIcon = ({ size = 'md', ...p }: IconProps) => <CheckCircleSvg {...w(size)} {...p} />;
export const MinusIcon = ({ size = 'md', ...p }: IconProps) => <MinusSvg {...w(size)} {...p} />;
export const FileIcon = ({ size = 'md', ...p }: IconProps) => <FileTextSvg {...w(size)} {...p} />;
export const UploadIcon = ({ size = 'md', ...p }: IconProps) => <UploadSvg {...w(size)} {...p} />;
export const InboxIcon = ({ size = 'md', ...p }: IconProps) => <InboxSvg {...w(size)} {...p} />;
export const UserIcon = ({ size = 'md', ...p }: IconProps) => <UserSvg {...w(size)} {...p} />;
export const MenuIcon = ({ size = 'md', ...p }: IconProps) => <MenuSvg {...w(size)} {...p} />;
export const CartIcon = ({ size = 'md', ...p }: IconProps) => <ShoppingCartSvg {...w(size)} {...p} />;
export const ExternalLinkIcon = ({ size = 'md', ...p }: IconProps) => <ExternalLinkSvg {...w(size)} {...p} />;
export const BookIcon = ({ size = 'md', ...p }: IconProps) => <BookOpenSvg {...w(size)} {...p} />;
export const PlayIcon = ({ size = 'md', ...p }: IconProps) => <PlaySvg {...w(size)} {...p} />;
export const HeadphonesIcon = ({ size = 'md', ...p }: IconProps) => <HeadphonesSvg {...w(size)} {...p} />;
export const StarIcon = ({ size = 'md', ...p }: IconProps) => <StarFilledSvg {...w(size)} {...p} />;
export const StarOutlineIcon = ({ size = 'md', ...p }: IconProps) => <StarOutlineSvg {...w(size)} {...p} />;
export const StarHalfIcon = ({ size = 'md', ...p }: IconProps) => <StarHalfSvg {...w(size)} {...p} />;
export const BellIcon = ({ size = 'md', ...p }: IconProps) => <BellSvg {...w(size)} {...p} />;
export const ZapIcon = ({ size = 'md', ...p }: IconProps) => <ZapSvg {...w(size)} {...p} />;

// ─── Spinner (SVG animation — kept standalone) ────────────────────────────────

export const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M8 1.5a6.5 6.5 0 1 0 5.876 3.698.75.75 0 0 1 1.356-.641A8 8 0 1 1 8 0a.75.75 0 0 1 0 1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

// ─── Brand / social icons (SVG — no Packt Figma equivalent) ──────────────────

export const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1a7 7 0 0 0-2.213 13.641c.35.064.478-.152.478-.338 0-.166-.006-.607-.009-1.192-1.947.423-2.358-.938-2.358-.938-.319-.81-.778-1.026-.778-1.026-.636-.434.048-.425.048-.425.703.049 1.073.722 1.073.722.625 1.07 1.64.761 2.04.582.063-.453.244-.762.444-.937-1.554-.177-3.189-.777-3.189-3.456 0-.763.273-1.388.72-1.877-.072-.177-.312-.888.069-1.851 0 0 .587-.188 1.925.717A6.7 6.7 0 0 1 8 4.583c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.851.448.489.719 1.114.719 1.877 0 2.686-1.638 3.277-3.197 3.45.251.216.475.643.475 1.296 0 .936-.009 1.69-.009 1.92 0 .188.126.406.482.337A7 7 0 0 0 8 1Z" />
  </svg>
);

export const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.6 3H14l-3.06 3.5L14.5 13H11.7L9.5 10.11 6.98 13H5.58l3.27-3.74L4.5 3h2.87l1.99 2.63L11.83 3h.77Zm-.49 9.15h.78L6.93 3.8h-.83l6.01 8.35Z" />
  </svg>
);

export const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM5.34 12.67H3.67V6.33h1.67v6.34ZM4.5 5.6a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94Zm7.83 7.07h-1.66V9.6c0-.74-.01-1.69-1.03-1.69-1.03 0-1.19.8-1.19 1.63v3.13H6.79V6.33h1.6v.87h.02c.22-.42.77-.87 1.58-.87 1.69 0 2 1.11 2 2.56v3.78Z" />
  </svg>
);

export const YouTubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M14.7 5.2a1.75 1.75 0 0 0-1.23-1.24C12.38 3.67 8 3.67 8 3.67s-4.38 0-5.47.29A1.75 1.75 0 0 0 1.3 5.2 18.3 18.3 0 0 0 1 8a18.3 18.3 0 0 0 .3 2.8 1.75 1.75 0 0 0 1.23 1.24c1.09.29 5.47.29 5.47.29s4.38 0 5.47-.29a1.75 1.75 0 0 0 1.23-1.24A18.3 18.3 0 0 0 15 8a18.3 18.3 0 0 0-.3-2.8ZM6.6 10.1V5.9L10.25 8 6.6 10.1Z" />
  </svg>
);
