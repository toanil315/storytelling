import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 16C15.9758 16 18.2777 15.3609 18.5 12.7957C18.5 10.2323 16.8951 10.3972 16.8951 7.25198C16.8951 4.79524 14.5693 2 11 2C7.43068 2 5.10487 4.79524 5.10487 7.25198C5.10487 10.3972 3.5 10.2323 3.5 12.7957C3.72319 15.3706 6.02509 16 11 16Z"
        stroke="#686A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 19C12.2393 20.3255 10.2727 20.3412 9 19"
        stroke="#686A70"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
