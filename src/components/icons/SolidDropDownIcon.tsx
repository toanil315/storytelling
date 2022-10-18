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
        d="M15 7H7C6.17595 7 5.70557 7.94076 6.2 8.6L10.2 13.9333C10.6 14.4667 11.4 14.4667 11.8 13.9333L15.8 8.6C16.2944 7.94076 15.824 7 15 7Z"
        fill={props.fill ?? "#686A70"}
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
