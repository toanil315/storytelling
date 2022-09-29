export interface Theme {
  colors: any;
  fontSizes: any;
  fontWeights: any;
  lineHeights: any;
  zIndices: any;
  shadows: any;
  radii: any;
}

const theme: Theme = {
  colors: {
    text: "#3D3B39",
    textSemibold: "#686A70",
    textLight: "#A3A3A3",
    primary: "#FDD32B",
    lightPrimary: "#FFF5D0",
    lightGray: "#F6F6F4",
    white: "#FFFFFF",
    green: "#54B498",
    danger: "#F27166",
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "20px",
    xl: "24px",
    sxl: "26px",
    xxl: "32px",
    sxxl: "36px",
    xxxl: "40px",
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 600,
    extraBold: 700,
  },

  lineHeights: {
    small: "18px",
    normal: "22px",
    large: "24px",
    xl: "38px",
  },

  zIndices: {
    base: 1,
    dropdown: 10,
    backdrop: 50,
    modal: 100,
  },

  shadows: {
    box: "0px 4px 4px rgba(48, 48, 48, 0.25)",
  },

  radii: {
    base: "4px",
    md: "8px",
    large: "12px",
    rounded: "50%",
  },
};

export default theme;
