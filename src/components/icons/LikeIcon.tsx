import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill={props.fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.35235 10.6437C1.33567 7.66561 2.52385 4.26174 5.85625 3.25453C7.60915 2.72382 9.54397 3.03673 11.0012 4.06527C12.3799 3.06518 14.3858 2.72737 16.1368 3.25453C19.4692 4.26174 20.6649 7.66561 19.6492 10.6437C18.0668 15.3641 11.0012 19 11.0012 19C11.0012 19 3.98775 15.4192 2.35235 10.6437Z"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.791 6.28918C15.8049 6.59677 16.5212 7.44574 16.6074 8.44227"
        stroke="#686A70"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
