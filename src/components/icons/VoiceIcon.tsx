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
        d="M11 20V18"
        stroke="#3D3B39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 13.5V13.5C8.92913 13.5 7.25 11.8654 7.25 9.84819V5.65275C7.25 3.63559 8.92913 2 11 2C13.0718 2 14.75 3.63559 14.75 5.65275V9.84819C14.75 11.8654 13.0718 13.5 11 13.5Z"
        stroke="#3D3B39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.25 10C18.25 14.1419 15.0046 17.5 10.9995 17.5C6.99543 17.5 3.75 14.1419 3.75 10"
        stroke="#3D3B39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
