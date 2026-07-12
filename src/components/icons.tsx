import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const icon = (path: React.ReactNode) =>
  function Icon(props: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    );
  };

export const CheckIcon = icon(
  <path d="M13.78 3.22a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06L5.75 10.19l6.97-6.97a.75.75 0 0 1 1.06 0Z" />
);

export const CloseIcon = icon(
  <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
);

export const ChevronDownIcon = icon(
  <path d="M3.22 5.72a.75.75 0 0 1 1.06 0L8 9.44l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L3.22 6.78a.75.75 0 0 1 0-1.06Z" />
);

export const ChevronLeftIcon = icon(
  <path d="M10.28 3.22a.75.75 0 0 1 0 1.06L6.56 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L4.97 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
);

export const ChevronRightIcon = icon(
  <path d="M5.72 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06L6.78 12.78a.75.75 0 1 1-1.06-1.06L9.44 8 5.72 4.28a.75.75 0 0 1 0-1.06Z" />
);

export const EllipsisIcon = icon(
  <path d="M3 8a1.25 1.25 0 1 1 2.5 0A1.25 1.25 0 0 1 3 8Zm4.75 0a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM12.5 8a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z" />
);

export const SearchIcon = icon(
  <path d="M6.5 1a5.5 5.5 0 1 0 3.44 9.81l2.63 2.63a.75.75 0 1 0 1.06-1.06l-2.63-2.63A5.5 5.5 0 0 0 6.5 1ZM2.5 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
);

export const InfoIcon = icon(
  <>
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
    <path d="M8 6.75a.75.75 0 0 1 .75.75v3.75a.75.75 0 1 1-1.5 0V7.5A.75.75 0 0 1 8 6.75ZM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </>
);

export const WarningIcon = icon(
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566ZM8 5a.905.905 0 0 1 .9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5Zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
);

export const ErrorIcon = icon(
  <>
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
    <path d="M4.47 4.47a.75.75 0 0 1 1.06 0L8 6.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L9.06 8l2.47 2.47a.75.75 0 1 1-1.06 1.06L8 9.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L6.94 8 4.47 5.53a.75.75 0 0 1 0-1.06Z" />
  </>
);

export const SuccessIcon = icon(
  <>
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
    <path d="M11.78 5.72a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06L7 9.44l3.72-3.72a.75.75 0 0 1 1.06 0Z" />
  </>
);

export const MinusIcon = icon(
  <path d="M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Z" />
);

export const FileIcon = icon(
  <path d="M2 1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 12.25 16h-8.5A1.75 1.75 0 0 1 2 14.25V1.75Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 7.75 4.25V1.5H3.75Zm5.5.96V4.25c0 .138.112.25.25.25H11.04L9.25 2.46Z" />
);

export const UploadIcon = icon(
  <>
    <path d="M8 1.5a.75.75 0 0 1 .75.75v5.69l1.97-1.97a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 6.97a.75.75 0 0 1 1.06-1.06L7.25 7.94V2.25A.75.75 0 0 1 8 1.5Z" />
    <path d="M1.75 11a.75.75 0 0 1 .75.75v1.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25v-1.5a.75.75 0 0 1 .75-.75Z" />
  </>
);

export const InboxIcon = icon(
  <path d="M2.5 2A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 13.5 2h-11Zm0 1.5h11v6H11a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 5 9.5H2.5v-6Z" />
);

export const UserIcon = icon(
  <>
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M8 9c-3.314 0-6 1.343-6 3v1h12v-1c0-1.657-2.686-3-6-3Z" />
  </>
);

export const SpinnerIcon = icon(
  <path
    fillRule="evenodd"
    d="M8 1.5a6.5 6.5 0 1 0 5.876 3.698.75.75 0 0 1 1.356-.641A8 8 0 1 1 8 0a.75.75 0 0 1 0 1.5Z"
    clipRule="evenodd"
  />
);

// ---- Star icons (Rating) ----
// Shape carries the meaning (filled / half / outline), never colour alone.

const STAR_D =
  'M8 1.75l1.86 3.767 4.157.604-3.008 2.933.71 4.14L8 11.24l-3.72 1.955.71-4.14L1.983 6.12l4.157-.604L8 1.75Z';

export const StarIcon = icon(<path d={STAR_D} />);

export function StarOutlineIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={STAR_D} />
    </svg>
  );
}

export function StarHalfIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* full outline */}
      <path
        d={STAR_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* left half filled */}
      <path d={STAR_D} fill="currentColor" clipPath="inset(0 50% 0 0)" style={{ clipPath: 'inset(0 50% 0 0)' }} />
    </svg>
  );
}

// ---- Format icons (FormatBadge / PriceBlock) ----
export const BookIcon = icon(
  <path d="M4 2.5A1.5 1.5 0 0 0 2.5 4v8A1.5 1.5 0 0 0 4 13.5h8a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H4Zm7 1v7H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h7Zm0 8.5H4a.5.5 0 0 0 0 1h7v-1Z" />
);

export const PlayIcon = icon(
  <path d="M5 3.868v8.264a.5.5 0 0 0 .757.429l6.882-4.132a.5.5 0 0 0 0-.858L5.757 3.44A.5.5 0 0 0 5 3.868Z" />
);

export const HeadphonesIcon = icon(
  <path d="M8 2a5.5 5.5 0 0 0-5.5 5.5V11a1.5 1.5 0 0 0 1.5 1.5h.5A1.5 1.5 0 0 0 6 11V9.5A1.5 1.5 0 0 0 4.5 8H4v-.5a4 4 0 1 1 8 0V8h-.5A1.5 1.5 0 0 0 10 9.5V11a1.5 1.5 0 0 0 1.5 1.5h.5A1.5 1.5 0 0 0 13.5 11V7.5A5.5 5.5 0 0 0 8 2Z" />
);

// ---- Social / external-link icons (SocialLinks) ----
export const ExternalLinkIcon = icon(
  <path d="M6.5 3a.75.75 0 0 0 0 1.5h1.94L4.22 8.72a.75.75 0 1 0 1.06 1.06L9.5 5.56V7.5a.75.75 0 0 0 1.5 0v-3.75A.75.75 0 0 0 10.25 3H6.5Zm-3 1A1.5 1.5 0 0 0 2 5.5v6A1.5 1.5 0 0 0 3.5 13h6a1.5 1.5 0 0 0 1.5-1.5v-2a.75.75 0 0 0-1.5 0v2a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h2a.75.75 0 0 0 0-1.5h-2Z" />
);

export const GitHubIcon = icon(
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8 1a7 7 0 0 0-2.213 13.641c.35.064.478-.152.478-.338 0-.166-.006-.607-.009-1.192-1.947.423-2.358-.938-2.358-.938-.319-.81-.778-1.026-.778-1.026-.636-.434.048-.425.048-.425.703.049 1.073.722 1.073.722.625 1.07 1.64.761 2.04.582.063-.453.244-.762.444-.937-1.554-.177-3.189-.777-3.189-3.456 0-.763.273-1.388.72-1.877-.072-.177-.312-.888.069-1.851 0 0 .587-.188 1.925.717A6.7 6.7 0 0 1 8 4.583c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.851.448.489.719 1.114.719 1.877 0 2.686-1.638 3.277-3.197 3.45.251.216.475.643.475 1.296 0 .936-.009 1.69-.009 1.92 0 .188.126.406.482.337A7 7 0 0 0 8 1Z"
  />
);

export const TwitterIcon = icon(
  <path d="M12.6 3H14l-3.06 3.5L14.5 13H11.7L9.5 10.11 6.98 13H5.58l3.27-3.74L4.5 3h2.87l1.99 2.63L11.83 3h.77Zm-.49 9.15h.78L6.93 3.8h-.83l6.01 8.35Z" />
);

export const LinkedInIcon = icon(
  <path d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM5.34 12.67H3.67V6.33h1.67v6.34ZM4.5 5.6a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94Zm7.83 7.07h-1.66V9.6c0-.74-.01-1.69-1.03-1.69-1.03 0-1.19.8-1.19 1.63v3.13H6.79V6.33h1.6v.87h.02c.22-.42.77-.87 1.58-.87 1.69 0 2 1.11 2 2.56v3.78Z" />
);

export const YouTubeIcon = icon(
  <path d="M14.7 5.2a1.75 1.75 0 0 0-1.23-1.24C12.38 3.67 8 3.67 8 3.67s-4.38 0-5.47.29A1.75 1.75 0 0 0 1.3 5.2 18.3 18.3 0 0 0 1 8a18.3 18.3 0 0 0 .3 2.8 1.75 1.75 0 0 0 1.23 1.24c1.09.29 5.47.29 5.47.29s4.38 0 5.47-.29a1.75 1.75 0 0 0 1.23-1.24A18.3 18.3 0 0 0 15 8a18.3 18.3 0 0 0-.3-2.8ZM6.6 10.1V5.9L10.25 8 6.6 10.1Z" />
);

// ---- Navigation / commerce icons (SiteHeader) ----
export const MenuIcon = icon(
  <path d="M2 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.25Zm0 3.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm.75 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" />
);

export const CartIcon = icon(
  <path d="M1.75 2a.75.75 0 0 0 0 1.5h1.12l1.4 6.3A1.75 1.75 0 0 0 5.98 11.5h5.55a1.75 1.75 0 0 0 1.7-1.34l1.13-4.7A.75.75 0 0 0 13.63 4.5H4.53l-.33-1.46A1.35 1.35 0 0 0 2.88 2H1.75ZM6.5 14.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm6.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
);
