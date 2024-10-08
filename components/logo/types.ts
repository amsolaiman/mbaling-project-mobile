import { ViewProps, ViewStyle } from "react-native";

// ----------------------------------------------------------------------

type ViewStyleProps = Omit<
  ViewStyle,
  | "width"
  | "minWidth"
  | "maxWidth"
  | "height"
  | "minHeight"
  | "maxHeight"
  | "color"
>;

type ColorThemeProps = "primary" | "light" | "dark";

interface ModifiedViewProps extends Omit<ViewProps, "style"> {
  style?: ViewStyleProps;
}

export type LogoProps = ModifiedViewProps & {
  disabledLink?: boolean;
  size?: number;
  color: ColorThemeProps;
};
