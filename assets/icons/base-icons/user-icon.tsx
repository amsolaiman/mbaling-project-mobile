import { memo } from "react";
import { Iconify } from "react-native-iconify";

// ----------------------------------------------------------------------

type IconProps = {
  isActive?: boolean;
  size: number;
  color: string;
};

function BaseIconUser({ isActive = false, size = 24, color }: IconProps) {
  return isActive ? (
    <Iconify icon="solar:user-bold" size={size} color={color} />
  ) : (
    <Iconify icon="solar:user-linear" size={size} color={color} />
  );
}

export default memo(BaseIconUser);
