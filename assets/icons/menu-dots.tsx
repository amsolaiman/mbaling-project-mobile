import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline' | 'duotone';
};

const IconMenuDots = ({ variant = 'solid', size = 24, color }: Props) => {
  // solar:menu-dots-bold
  const renderSolid = (
    <Path
      fill={color}
      d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
    />
  );

  // solar:menu-dots-outline
  const renderOutline = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 12a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0M5 10.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 12a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0M12 10.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m7-1.5a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 0-5.5M17.75 12a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0"
    />
  );

  // solar:menu-dots-bold-duotone
  const renderDuotone = (
    <>
      <Path fill={color} d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
      <Path fill={color} d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0" opacity="0.5" />
    </>
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {variant === 'solid' && renderSolid}

      {variant === 'outline' && renderOutline}

      {variant === 'duotone' && renderDuotone}
    </Svg>
  );
};

export default memo(IconMenuDots);
