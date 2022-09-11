import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="49"
      height="22"
      viewBox="0 0 49 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_3210_30565)">
        <path
          d="M7 11.9243C7 11.9243 10.4114 9.48206 14 9.79371C17.3256 10.0825 18.6694 13.2032 22 12.9895C25.5781 12.76 26.4155 4.99992 30 5C32.5 5.00005 34.1411 10.9404 36 11.9243C38.0127 12.9895 42 11.9243 42 11.9243"
          stroke="#EF4E40"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3210_30565"
          x="0.710938"
          y="0.5"
          width="47.418"
          height="21"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.960784 0 0 0 0 0.235294 0 0 0 0 0.243137 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3210_30565"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3210_30565"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
