import { forwardRef } from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
// @expo
import { Link } from "expo-router";
// theme
import Colors from "@/theme/Colors";
//
import { LogoProps } from "./types";

// ----------------------------------------------------------------------

const LogoVertical = forwardRef<View, LogoProps>(
  ({ disabledLink = false, size = 90, color = "primary", style }, ref) => {
    const FILL_COLOR =
      color === "primary" ? Colors["primary"] : Colors[color].text;

    const renderLogo = (
      <View ref={ref} style={{ width: size, height: size, ...style }}>
        <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
          <G id="vector2">
            <Path
              d="M510.46 459C501.85 454.7 492.37 452.39 482.73 452.25C474.02 452.25 467.31 454.41 462.6 458.74C457.93 462.97 455.35 469.01 455.54 475.28C455.35 481.28 457.96 487.03 462.6 490.87C467.31 494.85 473.51 496.84 481.19 496.84C485.42 496.81 489.59 495.92 493.46 494.22V485.69H482.73V472.29H512V502.17C509.06 505.07 504.59 507.43 498.59 509.26C492.82 511.06 486.82 511.98 480.77 512.01C467.85 512.01 457.23 508.5 448.93 501.47C433.93 488.64 432.24 466.16 445.16 451.26C446.32 449.92 447.58 448.67 448.93 447.51C457.23 440.52 467.99 437.02 481.19 437.01C491.27 436.84 501.27 438.89 510.46 443.03V459Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M429.95 437.01V512.01H413.94L371.93 463.97V512.01H352.97V437.01H370.36L411 482.85V437.01H429.96H429.95Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M346.44 437.01V512.01H327.48V437.01H346.44Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M320.96 498.27V512.01H262.94V437.01H281.9V498.27H320.96Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M222.61 437.01L256.42 512H236.03L229.76 497.18H195.68L190 512H169.91L200.64 437.01H222.61ZM224.21 484.09L211.87 454.94L200.69 484.09H224.21Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M105.99 437.01H138.9C146.75 437.01 152.91 438.87 157.4 442.59C161.89 446.31 164.13 450.71 164.13 455.78C164.13 462.29 160.66 467.28 153.72 470.74C158.41 471.77 162.63 474.3 165.73 477.94C168.5 481.34 169.97 485.6 169.9 489.97C170.11 496.01 167.61 501.83 163.09 505.87C158.55 509.95 151.87 511.99 143.04 511.99H105.99V437.01ZM124.95 450.75V466.81H134.87C137.46 466.97 140.01 466.14 142.01 464.5C143.68 463.04 144.62 460.92 144.57 458.7C144.62 456.52 143.68 454.43 142.01 453.01C140 451.4 137.45 450.6 134.87 450.76H124.95V450.75ZM124.95 480.54V498.25H135.63C140.68 498.25 144.31 497.56 146.53 496.18C148.75 494.8 149.85 492.41 149.85 489.01C149.92 486.54 148.73 484.21 146.69 482.81C144.19 481.18 141.23 480.38 138.25 480.53H124.96L124.95 480.54Z"
              fill={FILL_COLOR}
            />
            <Path
              d="M92.68 444.2C88.15 439.44 81.77 437.01 73.71 437.01C69.82 437.03 65.97 437.77 62.35 439.19C59.29 440.29 56.5 442.03 54.16 444.28C49.29 439.46 42.24 437.01 33.2 437.01C26.72 436.83 20.45 439.32 15.87 443.88L12.94 438.36H0V512.01H18.45V459.8C19.69 457.95 21.32 456.39 23.23 455.24C25.02 453.95 27.14 453.2 29.35 453.07C32.37 452.88 35.35 453.89 37.62 455.88C39.62 457.91 40.67 460.69 40.51 463.52V512.01H58.96V459.55C59.97 457.72 61.46 456.18 63.25 455.1C65.16 453.8 67.41 453.1 69.72 453.07C77.32 453.07 81.01 457.34 81.01 466.13V512.01H99.46V463.72C99.46 455.51 97.18 448.94 92.67 444.2H92.68Z"
              fill={FILL_COLOR}
            />
          </G>

          <Path
            id="vector1"
            d="M441.21 381.98V0L256.27 47.81L70.79 0V381.98H0V410H512V381.98H441.21ZM402.95 176.64C413.55 176.64 422.08 185.17 422.08 195.52C422.34 206.12 413.81 214.66 403.21 214.66C392.61 214.66 384.08 206.13 384.08 195.78C384.08 185.43 392.61 176.64 402.95 176.64ZM94.57 381.98V31.03L256.13 72.41V381.98H94.57Z"
            fill={FILL_COLOR}
          />
        </Svg>
      </View>
    );

    if (disabledLink) {
      return renderLogo;
    }

    return <Link href="/">{renderLogo}</Link>;
  }
);

export default LogoVertical;
