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
        d="M7.73657 16.7708C7.42114 16.4652 7.42114 15.9696 7.73657 15.664L12.5501 11L7.73657 6.336C7.42114 6.03037 7.42114 5.53485 7.73657 5.22922C8.05199 4.92359 8.56339 4.92359 8.87882 5.22922L14.2634 10.4466C14.5789 10.7522 14.5789 11.2478 14.2634 11.5534L8.87882 16.7708C8.56339 17.0764 8.05199 17.0764 7.73657 16.7708Z"
        fill="#686A70"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
