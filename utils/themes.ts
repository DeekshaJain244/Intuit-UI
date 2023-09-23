import { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const LIGHT_THEME = "light";
// Light mode theme
export const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FDFDFD",
    surface: "#F3F3F3",
    primary: "#4286f8",
    secondary: "#ad67ec",
    info: "#f5d435",
    warning: "#eba12b",
    error: "#e55840",
    success: "#60b146",
    layoutBar: "#ffffff",
    textColor1: "#adc5fe",
    iconBackground: "#D6D6D6",
    iconColor: "#7C162B",
    cardBG1: "#EFEFEF",
    cardBG2: "#f4f4f4",
    cardBG3: "#dcebf9",
    cardBG4: "#c4c4c4",
    cardBG5: "#dfe2ea",
    glassBG: "#909090",
    navIconText: "#393E40",
    navBar: "#f6f6f6",
    breadText: "#1976D2",
    routeBG1: "#6E8EF2",
    formColor: "#6a6a6a",
    formCheckBox: "#1E88E5",
    statusOnline: "#00E676",
    statusOffline: "#FF5252",
    routeCardBG1: "#42A5F5",
    overlayColor: "#393E40",
    actionCard: "#4f4f53",
  },
};

// String that represents the name of the dark theme I am using
export const DARK_THEME = "dark";
// Dark mode theme
export const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1B1B1C",
    surface: "#131D2D", //"#121D2C",
    primary: "#4286f8",
    secondary: "#575bcf",
    info: "#f3ca31",
    warning: "#eb9a27",
    error: "#e45037",
    success: "#59c45c",
    menubar: "#424242",
    layoutBar: "#373C3E",
    textColor1: "#adc5fe",
    iconBackground: "#1C1E1F",
    iconColor: "#D6D6D6",
    cardBG1: "#393E40",
    cardBG2: "#323739",
    cardBG3: "#282828",
    cardBG4: "#4c4c4c",
    cardBG5: "#323031",
    glassBG: "#000",
    navIconText: "#D6D6D6",
    navBar: "#373C3E",
    breadText: "#628FDC",
    routeBG1: "#6B81B3",
    formColor: "#eaeaea",
    formCheckBox: "#E0E0E0",
    statusOnline: "#00E676",
    statusOffline: "#FF5252",
    routeCardBG1: "#1E88E5",
    overlayColor: "#EFEFEF",
    actionCard: "#393E40",
  },
};