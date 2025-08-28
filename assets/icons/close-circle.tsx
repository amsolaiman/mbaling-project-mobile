import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline' | 'duotone';
};

const IconCloseCircle = ({ variant = 'solid', size = 24, color }: Props) => {
  // solar:close-circle-bold
  const renderSolid = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
    />
  );

  // solar:close-circle-outline
  const renderOutline = (
    <>
      <Path
        fill={color}
        d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
      />
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0"
      />
    </>
  );

  // solar:close-circle-bold-duotone
  const renderDuotone = (
    <>
      <Path
        fill={color}
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
        opacity="0.5"
      />
      <Path
        fill={color}
        d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06"
      />
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

export default memo(IconCloseCircle);
