import React from 'react';

type AnimateIconProps = React.SVGProps<SVGSVGElement> & {
  animation?: string | boolean;
  animateOnHover?: string | boolean;
  animateOnTap?: string | boolean;
  animateOnView?: string | boolean;
};

export const IconsCircleCheck = React.forwardRef<
  SVGSVGElement,
  AnimateIconProps
>((props, ref) => (
  <svg
    data-icon-type="circle-check"
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
));
IconsCircleCheck.displayName = "IconsCircleCheck";

