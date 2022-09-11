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
        d="M7 2C4.23858 2 2 4.23858 2 7V15C2 17.7614 4.23858 20 7 20H15C17.7614 20 20 17.7614 20 15V7C20 4.23858 17.7614 2 15 2H7ZM13.33 12.7593L16.22 9.03027L16.18 9.05027C16.34 8.83027 16.37 8.55027 16.26 8.30027C16.151 8.05027 15.91 7.88027 15.651 7.86027C15.38 7.83027 15.111 7.95027 14.95 8.17027L12.531 11.3003L9.76 9.12027C9.59 8.99027 9.39 8.93927 9.19 8.96027C8.991 8.99027 8.811 9.09927 8.69 9.25927L5.731 13.1103L5.67 13.2003C5.5 13.5193 5.58 13.9293 5.88 14.1503C6.02 14.2403 6.17 14.3003 6.34 14.3003C6.571 14.3103 6.79 14.1893 6.93 14.0003L9.44 10.7693L12.29 12.9103L12.38 12.9693C12.7 13.1393 13.1 13.0603 13.33 12.7593Z"
        fill="#686A70"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
