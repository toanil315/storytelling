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
      <circle
        cx="11"
        cy="10.5"
        r="8.5"
        stroke="#3D3B39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 17L19.5 20"
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
