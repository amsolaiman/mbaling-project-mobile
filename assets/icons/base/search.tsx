import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline' | 'duotone';
};

const IconSearch = ({ variant = 'solid', size = 24, color }: Props) => {
  // solar:magnifer-bold
  const renderSolid = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.788 21.788a.723.723 0 0 0 0-1.022L18.122 17.1a9.157 9.157 0 1 0-1.022 1.022l3.666 3.666a.723.723 0 0 0 1.022 0"
    />
  );

  // solar:magnifer-outline
  const renderOutline = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5M1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5c0 2.56-.939 4.902-2.491 6.698l3.271 3.272a.75.75 0 1 1-1.06 1.06l-3.272-3.271A10.2 10.2 0 0 1 11.5 21.75c-5.66 0-10.25-4.59-10.25-10.25"
    />
  );

  // solar:magnifer-bold-duotone
  const renderDuotone = (
    <>
      <Path
        fill={color}
        d="M20.313 11.157a9.157 9.157 0 1 1-18.313 0a9.157 9.157 0 0 1 18.313 0"
        opacity="0.5"
      />
      <Path
        fill={color}
        d="m17.1 18.122l3.666 3.666a.723.723 0 0 0 1.023-1.022L18.122 17.1a9 9 0 0 1-1.022 1.022"
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

export default memo(IconSearch);
