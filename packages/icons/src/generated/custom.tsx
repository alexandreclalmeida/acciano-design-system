import React from 'react';

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.5 7.5L7.5 13.5L13.5 1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DotAwayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-yellow)"/>
    <path d="M8 2.64001C8.47329 2.64001 8.85727 3.0232 8.85742 3.49646V7.49646H11.7139C12.1873 7.49646 12.5713 7.88049 12.5713 8.35388C12.5713 8.82727 12.1873 9.2113 11.7139 9.2113H8C7.52661 9.2113 7.14258 8.82727 7.14258 8.35388V3.49646C7.14273 3.0232 7.52671 2.64002 8 2.64001Z" fill="var(--color-utilities-black-solid)"/>
  </svg>
);

export const DotBusyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-critical-high)"/>
    <path d="M11.7139 7.14258C12.1873 7.14258 12.5713 7.52661 12.5713 8C12.5713 8.47339 12.1873 8.85742 11.7139 8.85742H4.28613C3.81275 8.85742 3.42871 8.47339 3.42871 8C3.42871 7.52661 3.81275 7.14258 4.28613 7.14258H11.7139Z" fill="var(--color-icon-inverse-high)"/>
  </svg>
);

export const DotCriticalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-critical-high)"/>
    <path d="M9.96492 4.82237C10.2997 4.48764 10.8431 4.48764 11.1778 4.82237C11.5123 5.157 11.5122 5.69956 11.1778 6.03429L9.21199 8.00011L11.1778 9.96495C11.5125 10.2997 11.5125 10.8431 11.1778 11.1778C10.8431 11.5126 10.2997 11.5126 9.96492 11.1778L8.00007 9.21202L6.03425 11.1778C5.69952 11.5122 5.15697 11.5124 4.82234 11.1778C4.48761 10.8431 4.48761 10.2997 4.82234 9.96495L6.78816 8.00011L4.82234 6.03429C4.48785 5.69953 4.48769 5.15702 4.82234 4.82237C5.15699 4.48772 5.6995 4.48789 6.03425 4.82237L8.00007 6.78819L9.96492 4.82237Z" fill="var(--color-icon-inverse-high)"/>
  </svg>
);

export const DotInfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-info-high)"/>
    <path d="M8.14258 7C8.61597 7 9 7.38403 9 7.85742V11.2852C9 11.7585 8.61597 12.1426 8.14258 12.1426C7.66919 12.1426 7.28516 11.7585 7.28516 11.2852V7.85742C7.28516 7.38403 7.66919 7 8.14258 7Z" fill="var(--color-icon-inverse-high)"/>
    <path d="M8.14258 3C8.77371 3 9.28508 3.51146 9.28516 4.14258C9.28516 4.77376 8.77376 5.28516 8.14258 5.28516C7.5114 5.28516 7 4.77376 7 4.14258C7.00008 3.51146 7.51144 3 8.14258 3Z" fill="var(--color-icon-inverse-high)"/>
  </svg>
);

export const DotOfflineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-disabled)"/>
    <path d="M9.96492 4.82237C10.2997 4.48764 10.8431 4.48764 11.1778 4.82237C11.5123 5.157 11.5122 5.69956 11.1778 6.03429L9.21199 8.00011L11.1778 9.96495C11.5125 10.2997 11.5125 10.8431 11.1778 11.1778C10.8431 11.5126 10.2997 11.5126 9.96492 11.1778L8.00007 9.21202L6.03425 11.1778C5.69952 11.5122 5.15697 11.5124 4.82234 11.1778C4.48761 10.8431 4.48761 10.2997 4.82234 9.96495L6.78816 8.00011L4.82234 6.03429C4.48785 5.69953 4.48769 5.15702 4.82234 4.82237C5.15699 4.48772 5.6995 4.48789 6.03425 4.82237L8.00007 6.78819L9.96492 4.82237Z" fill="var(--color-icon-neutral)"/>
  </svg>
);

export const DotOnlineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.3925 5.95267C12.682 5.57809 12.613 5.03978 12.2384 4.75033C11.8638 4.46088 11.3255 4.52989 11.036 4.90447L6.80703 10.3773L4.92282 8.28374C4.60614 7.93188 4.06418 7.90335 3.71232 8.22003C3.36045 8.53671 3.33193 9.07868 3.6486 9.43054L6.22003 12.2877C6.39008 12.4766 6.63523 12.5803 6.88925 12.5708C7.14327 12.5613 7.37996 12.4395 7.53539 12.2384L12.3925 5.95267Z" fill="var(--color-fill-success-high)"/>
  </svg>
);

export const DotSuccessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-success-high)"/>
    <path d="M11.0357 4.90429C11.325 4.52986 11.8633 4.46096 12.2378 4.74999C12.6124 5.03945 12.6816 5.57853 12.3921 5.95312L7.5357 12.2383C7.38027 12.4394 7.14323 12.5618 6.88921 12.5713C6.63536 12.5808 6.39031 12.4768 6.22027 12.2881L3.64898 9.43066C3.3323 9.07879 3.36059 8.5364 3.71246 8.21972C4.06433 7.90329 4.60582 7.9324 4.92242 8.28417L6.80718 10.3769L11.0357 4.90429Z" fill="var(--color-icon-inverse-high)"/>
  </svg>
);

export const DotWarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="8" cy="8" r="8" fill="var(--color-fill-yellow)"/>
    <path d="M8 10.2861C8.63118 10.2861 9.14258 10.7975 9.14258 11.4287C9.1425 12.0598 8.63114 12.5713 8 12.5713C7.36886 12.5713 6.8575 12.0598 6.85742 11.4287C6.85742 10.7975 7.36882 10.2861 8 10.2861Z" fill="var(--color-utilities-black-solid)"/>
    <path d="M8 3.42871C8.47339 3.42871 8.85742 3.81275 8.85742 4.28613V7.71387C8.85742 8.18725 8.47339 8.57129 8 8.57129C7.52661 8.57129 7.14258 8.18725 7.14258 7.71387V4.28613C7.14258 3.81275 7.52661 3.42871 8 3.42871Z" fill="var(--color-utilities-black-solid)"/>
  </svg>
);

export const PartialIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.5 1.5H13.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const RadioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="6"/>
  </svg>
);

export const RatingCircleEmptyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="3" y="3" width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="none">
        <circle cx="9" cy="9" r="8.25" stroke="var(--color-stroke-brand-high)" strokeWidth="1.5"/>
      </svg>
  </svg>
);

export const RatingCircleFullIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="3" y="3" width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="none">
        <circle cx="9" cy="9" r="9" fill="var(--color-fill-brand-high)"/>
      </svg>
      <svg x="3" y="3" width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="none">
        <circle cx="9" cy="9" r="8.25" stroke="var(--color-stroke-brand-high)" strokeWidth="1.5"/>
      </svg>
  </svg>
);

export const RatingCircleHalfIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="3" y="3" width="9" height="18" viewBox="0 0 9 18" preserveAspectRatio="none">
        <path d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0V18Z" fill="var(--color-fill-brand-high)"/>
      </svg>
      <svg x="3" y="3" width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="none">
        <circle cx="9" cy="9" r="8.25" stroke="var(--color-stroke-brand-high)" strokeWidth="1.5"/>
      </svg>
  </svg>
);

export const RatingHeartEmptyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.25" y="3" width="19.5" height="18" viewBox="0 0 19.5 18" preserveAspectRatio="none">
        <path d="M18.75 5.25C18.75 2.76472 16.6513 0.75 14.0625 0.75C12.1269 0.75 10.4653 1.87628 9.75 3.48342C9.03472 1.87628 7.37312 0.75 5.4375 0.75C2.84867 0.75 0.75 2.76472 0.75 5.25C0.75 12.4706 9.75 17.25 9.75 17.25C9.75 17.25 18.75 12.4706 18.75 5.25Z" stroke="var(--color-stroke-critical-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);

export const RatingHeartFullIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.25" y="3" width="19.5" height="18" viewBox="0 0 19.5 17.9997" preserveAspectRatio="none">
        <path d="M9.39497 17.9107L9.38844 17.9071L9.36579 17.8949C9.3465 17.8844 9.31891 17.8693 9.28358 17.8496C9.21292 17.8101 9.11124 17.7524 8.98296 17.6769C8.7265 17.5261 8.36317 17.3039 7.92855 17.015C7.06074 16.4381 5.90122 15.5901 4.7386 14.5063C2.43781 12.3615 0 9.1751 0 5.25C0 2.32194 2.4636 0 5.4375 0C7.18638 0 8.75232 0.799088 9.75 2.0516C10.7477 0.799088 12.3136 0 14.0625 0C17.0364 0 19.5 2.32194 19.5 5.25C19.5 9.1751 17.0622 12.3615 14.7614 14.5063C13.5988 15.5901 12.4393 16.4381 11.5715 17.015C11.1368 17.3039 10.7735 17.5261 10.517 17.6769C10.3888 17.7524 10.2871 17.8101 10.2164 17.8496C10.1811 17.8693 10.1535 17.8844 10.1342 17.8949L10.1116 17.9071L10.105 17.9107L10.1023 17.9121C9.88231 18.0289 9.61769 18.0289 9.39773 17.9121L9.39497 17.9107Z" fill="var(--color-fill-critical-high)"/>
      </svg>
      <svg x="2.25" y="3" width="19.5" height="18" viewBox="0 0 19.5 18" preserveAspectRatio="none">
        <path d="M18.75 5.25C18.75 2.76472 16.6513 0.75 14.0625 0.75C12.1269 0.75 10.4653 1.87628 9.75 3.48342C9.03472 1.87628 7.37312 0.75 5.4375 0.75C2.84867 0.75 0.75 2.76472 0.75 5.25C0.75 12.4706 9.75 17.25 9.75 17.25C9.75 17.25 18.75 12.4706 18.75 5.25Z" stroke="var(--color-stroke-critical-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);

export const RatingHeartHalfIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.25" y="3" width="9.75" height="18" viewBox="0 0 9.75 17.9997" preserveAspectRatio="none">
        <path d="M9.75 2.0516C8.75232 0.799088 7.18638 0 5.4375 0C2.4636 0 0 2.32194 0 5.25C0 9.1751 2.43781 12.3615 4.7386 14.5063C5.90122 15.5901 7.06074 16.4381 7.92855 17.015C8.36317 17.3039 8.7265 17.5261 8.98296 17.6769C9.11124 17.7524 9.21292 17.8101 9.28358 17.8496C9.31891 17.8693 9.3465 17.8844 9.36579 17.8949L9.38844 17.9072L9.39497 17.9107L9.39773 17.9121C9.50771 17.9705 9.62885 17.9997 9.75 17.9997L9.75 2.0516Z" fill="var(--color-fill-critical-high)"/>
      </svg>
      <svg x="2.25" y="3" width="19.5" height="18" viewBox="0 0 19.5 18" preserveAspectRatio="none">
        <path d="M18.75 5.25C18.75 2.76472 16.6513 0.75 14.0625 0.75C12.1269 0.75 10.4653 1.87628 9.75 3.48342C9.03472 1.87628 7.37312 0.75 5.4375 0.75C2.84867 0.75 0.75 2.76472 0.75 5.25C0.75 12.4706 9.75 17.25 9.75 17.25C9.75 17.25 18.75 12.4706 18.75 5.25Z" stroke="var(--color-stroke-critical-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);

export const RatingStarEmptyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.09" y="2.4" width="19.81" height="18.97" viewBox="0 0 19.8148 18.974" preserveAspectRatio="none">
        <path d="M9.38804 1.09648C9.58019 0.634506 10.2346 0.634506 10.4268 1.09648L12.5528 6.20794C12.6338 6.4027 12.8169 6.53577 13.0272 6.55262L18.5454 6.99502C19.0442 7.035 19.2464 7.65741 18.8664 7.98291L14.6621 11.5844C14.5019 11.7216 14.4319 11.9369 14.4809 12.1421L15.7654 17.5269C15.8815 18.0136 15.352 18.3983 14.925 18.1375L10.2006 15.2519C10.0206 15.1419 9.79422 15.1419 9.61421 15.2519L4.88982 18.1375C4.46282 18.3983 3.93337 18.0136 4.04946 17.5269L5.33395 12.1421C5.38289 11.9369 5.31294 11.7216 5.15274 11.5844L0.94842 7.98292C0.56843 7.65741 0.770663 7.035 1.26941 6.99502L6.78765 6.55262C6.99791 6.53577 7.18107 6.4027 7.26207 6.20794L9.38804 1.09648Z" stroke="var(--color-stroke-warning-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);

export const RatingStarFullIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.09" y="2.4" width="19.81" height="18.97" viewBox="0 0 19.8148 18.974" preserveAspectRatio="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.69555 0.80846C9.1439 -0.269486 10.6709 -0.269487 11.1193 0.80846L13.2013 5.81417L18.6054 6.24742C19.7691 6.34071 20.241 7.793 19.3543 8.55251L15.237 12.0795L16.4949 17.3529C16.7658 18.4885 15.5304 19.3861 14.5341 18.7775L9.90741 15.9516L5.28076 18.7775C4.28444 19.3861 3.04905 18.4885 3.31993 17.3529L4.57785 12.0795L0.460502 8.55251C-0.426138 7.79301 0.045735 6.34071 1.20947 6.24742L6.61356 5.81417L8.69555 0.80846Z" fill="var(--color-fill-yellow)"/>
      </svg>
      <svg x="2.09" y="2.4" width="19.81" height="18.97" viewBox="0 0 19.8148 18.974" preserveAspectRatio="none">
        <path d="M9.38804 1.09648C9.58019 0.634506 10.2346 0.634506 10.4268 1.09648L12.5528 6.20794C12.6338 6.4027 12.8169 6.53577 13.0272 6.55262L18.5454 6.99502C19.0442 7.035 19.2464 7.65741 18.8664 7.98291L14.6621 11.5844C14.5019 11.7216 14.4319 11.9369 14.4809 12.1421L15.7654 17.5269C15.8815 18.0136 15.352 18.3983 14.925 18.1375L10.2006 15.2519C10.0206 15.1419 9.79422 15.1419 9.61421 15.2519L4.88982 18.1375C4.46282 18.3983 3.93337 18.0136 4.04946 17.5269L5.33395 12.1421C5.38289 11.9369 5.31294 11.7216 5.15274 11.5844L0.94842 7.98292C0.56843 7.65741 0.770663 7.035 1.26941 6.99502L6.78765 6.55262C6.99791 6.53577 7.18107 6.4027 7.26207 6.20794L9.38804 1.09648Z" stroke="var(--color-stroke-warning-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);

export const RatingStarHalfIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <svg x="2.09" y="2.4" width="9.91" height="18.97" viewBox="0 0 9.90741 18.974" preserveAspectRatio="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.90741 0C9.41357 7.8329e-07 8.91973 0.269487 8.69555 0.80846L6.61356 5.81417L1.20947 6.24742C0.045735 6.34071 -0.426138 7.79301 0.460502 8.55251L4.57785 12.0795L3.31993 17.3529C3.04905 18.4885 4.28444 19.3861 5.28076 18.7775L9.90741 15.9516L9.90741 0Z" fill="var(--color-fill-yellow)"/>
      </svg>
      <svg x="2.09" y="2.4" width="19.81" height="18.97" viewBox="0 0 19.8148 18.974" preserveAspectRatio="none">
        <path d="M9.38804 1.09648C9.58019 0.634506 10.2346 0.634506 10.4268 1.09648L12.5528 6.20794C12.6338 6.4027 12.8169 6.53577 13.0272 6.55262L18.5454 6.99502C19.0442 7.035 19.2464 7.65741 18.8664 7.98291L14.6621 11.5844C14.5019 11.7216 14.4319 11.9369 14.4809 12.1421L15.7654 17.5269C15.8815 18.0136 15.352 18.3983 14.925 18.1375L10.2006 15.2519C10.0206 15.1419 9.79422 15.1419 9.61421 15.2519L4.88982 18.1375C4.46282 18.3983 3.93337 18.0136 4.04946 17.5269L5.33395 12.1421C5.38289 11.9369 5.31294 11.7216 5.15274 11.5844L0.94842 7.98292C0.56843 7.65741 0.770663 7.035 1.26941 6.99502L6.78765 6.55262C6.99791 6.53577 7.18107 6.4027 7.26207 6.20794L9.38804 1.09648Z" stroke="var(--color-stroke-warning-high)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  </svg>
);
