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
      <circle cx="11" cy="11" r="8.25" stroke="#3D3B39" strokeWidth="1.5" />
      <path
        d="M14.25 11C14.25 13.4055 13.8152 15.5471 13.1431 17.0594C12.8066 17.8164 12.4254 18.3826 12.0399 18.7494C11.6584 19.1126 11.3082 19.25 11 19.25C10.6918 19.25 10.3416 19.1126 9.96006 18.7494C9.57463 18.3826 9.1934 17.8164 8.85693 17.0594C8.18483 15.5471 7.75 13.4055 7.75 11C7.75 8.59454 8.18483 6.45286 8.85693 4.94064C9.1934 4.18359 9.57463 3.61737 9.96006 3.25056C10.3416 2.88743 10.6918 2.75 11 2.75C11.3082 2.75 11.6584 2.88743 12.0399 3.25056C12.4254 3.61737 12.8066 4.18359 13.1431 4.94064C13.8152 6.45286 14.25 8.59454 14.25 11Z"
        stroke="#3D3B39"
        strokeWidth="1.5"
      />
      <path d="M3 11H19" stroke="#3D3B39" strokeWidth="1.5" />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
