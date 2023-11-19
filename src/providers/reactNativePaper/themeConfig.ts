import { MD3LightTheme } from "react-native-paper";
export const PaperTheme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#7cd8a4",
    secondary: "#004b23",
    tertiary: "#ffffff",
  },
};
