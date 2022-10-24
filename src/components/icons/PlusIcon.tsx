import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 8V14"
        stroke={"#686A70"}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11H8"
        stroke="#686A70"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.28 4H7.72C5.43333 4 4 5.61846 4 7.90961V14.0904C4 16.3815 5.42667 18 7.72 18H14.28C16.5733 18 18 16.3815 18 14.0904V7.90961C18 5.61846 16.5733 4 14.28 4Z"
        stroke="#686A70"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
