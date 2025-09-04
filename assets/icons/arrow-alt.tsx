import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline';
  direction?: 'up' | 'down' | 'left' | 'right';
};

const IconArrowAlt = ({ variant = 'solid', direction = 'up', size = 24, color }: Props) => {
  const renderSolid = () => {
    switch (direction) {
      case 'down': // solar:alt-arrow-down-bold
        return (
          <Path
            fill={color}
            d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0"
          />
        );

      case 'left': // solar:alt-arrow-left-bold
        return (
          <Path
            fill={color}
            d="m8.165 11.63l6.63-6.43C15.21 4.799 16 5.042 16 5.57v12.86c0 .528-.79.771-1.205.37l-6.63-6.43a.5.5 0 0 1 0-.74"
          />
        );

      case 'right': // solar:alt-arrow-right-bold
        return (
          <Path
            fill={color}
            d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.5.5 0 0 0 0-.74"
          />
        );

      default: // up // solar:alt-arrow-up-bold
        return (
          <Path
            fill={color}
            d="m12.37 8.165l6.43 6.63c.401.414.158 1.205-.37 1.205H5.57c-.528 0-.771-.79-.37-1.205l6.43-6.63a.5.5 0 0 1 .74 0"
          />
        );
    }
  };

  const renderOutline = () => {
    switch (direction) {
      case 'down': // solar:alt-arrow-down-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057"
          />
        );

      case 'left': // solar:alt-arrow-left-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081"
          />
        );

      case 'right': // solar:alt-arrow-right-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12L8.431 5.488a.75.75 0 0 1 .08-1.057"
          />
        );

      default: // solar:alt-arrow-up-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.512 8.43a.75.75 0 0 1 .976 0l7 6a.75.75 0 1 1-.976 1.14L12 9.987l-6.512 5.581a.75.75 0 1 1-.976-1.138z"
          />
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {variant === 'solid' && renderSolid()}

      {variant === 'outline' && renderOutline()}
    </Svg>
  );
};

export default memo(IconArrowAlt);
