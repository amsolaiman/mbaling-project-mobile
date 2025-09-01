import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline';
  direction?:
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'left-up'
    | 'left-down'
    | 'right-up'
    | 'right-down';
};

const IconArrow = ({ variant = 'solid', direction = 'up', size = 24, color }: Props) => {
  const renderSolid = () => {
    switch (direction) {
      case 'down': // solar:arrow-down-bold
        return (
          <Path
            fill={color}
            d="M12.75 4a.75.75 0 0 0-1.5 0v9.25H6a.75.75 0 0 0-.53 1.28l6 6a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0-.53-1.28h-5.25z"
          />
        );

      case 'left': // solar:arrow-left-bold
        return (
          <Path
            fill={color}
            d="M20 11.25a.75.75 0 0 1 0 1.5h-9.25V18a.75.75 0 0 1-1.28.53l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.28.53v5.25z"
          />
        );

      case 'right': // solar:arrow-right-bold
        return (
          <Path
            fill={color}
            d="M4 11.25a.75.75 0 0 0 0 1.5h9.25V18a.75.75 0 0 0 1.28.53l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.28.53v5.25z"
          />
        );

      case 'left-up': // solar:arrow-left-up-bold
        return (
          <Path
            fill={color}
            d="M18.53 17.47a.75.75 0 1 1-1.06 1.06l-6.97-6.97l-3.97 3.97A.75.75 0 0 1 5.25 15V6A.75.75 0 0 1 6 5.25h9a.75.75 0 0 1 .53 1.28l-3.97 3.97z"
          />
        );

      case 'left-down': // solar:arrow-left-down-bold
        return (
          <Path
            fill={color}
            d="M18.53 6.53a.75.75 0 0 0-1.06-1.06l-6.97 6.97l-3.97-3.97A.75.75 0 0 0 5.25 9v9c0 .414.336.75.75.75h9a.75.75 0 0 0 .53-1.28l-3.97-3.97z"
          />
        );

      case 'right-up': // solar:arrow-right-up-bold
        return (
          <Path
            fill={color}
            d="M5.47 17.47a.75.75 0 1 0 1.06 1.06l6.97-6.97l3.97 3.97a.75.75 0 0 0 1.28-.53V6a.75.75 0 0 0-.75-.75H9a.75.75 0 0 0-.53 1.28l3.97 3.97z"
          />
        );

      case 'right-down': // solar:arrow-right-down-bold
        return (
          <Path
            fill={color}
            d="M5.47 6.53a.75.75 0 0 1 1.06-1.06l6.97 6.97l3.97-3.97a.75.75 0 0 1 1.28.53v9a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.53-1.28l3.97-3.97z"
          />
        );

      default: // solar:arrow-up-bold
        return (
          <Path
            fill={color}
            d="M12.75 20a.75.75 0 0 1-1.5 0v-9.25H6a.75.75 0 0 1-.53-1.28l6-6a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1-.53 1.28h-5.25z"
          />
        );
    }
  };

  const renderOutline = () => {
    switch (direction) {
      case 'down': // solar:arrow-down-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.25a.75.75 0 0 1 .75.75v14.19l4.72-4.72a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 1 1 1.06-1.06l4.72 4.72V4a.75.75 0 0 1 .75-.75"
          />
        );

      case 'left': // solar:arrow-left-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0"
          />
        );

      case 'right': // solar:arrow-right-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
          />
        );

      case 'left-up': // solar:arrow-left-up-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.25 6A.75.75 0 0 1 6 5.25h9a.75.75 0 0 1 0 1.5H7.81l10.72 10.72a.75.75 0 1 1-1.06 1.06L6.75 7.81V15a.75.75 0 0 1-1.5 0z"
          />
        );

      case 'left-down': // solar:arrow-left-down-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.53 5.47a.75.75 0 0 1 0 1.06L7.81 17.25H15a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 1.5 0v7.19L17.47 5.47a.75.75 0 0 1 1.06 0"
          />
        );

      case 'right-up': // solar:arrow-right-up-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 6.75a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V7.81L6.53 18.53a.75.75 0 0 1-1.06-1.06L16.19 6.75z"
          />
        );

      case 'right-down': // solar:arrow-right-down-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0l10.72 10.72V9a.75.75 0 0 1 1.5 0v9a.75.75 0 0 1-.75.75H9a.75.75 0 0 1 0-1.5h7.19L5.47 6.53a.75.75 0 0 1 0-1.06"
          />
        );

      default: // solar:arrow-up-outline
        return (
          <Path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.47 3.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-4.72-4.72V20a.75.75 0 0 1-1.5 0V5.81l-4.72 4.72a.75.75 0 1 1-1.06-1.06z"
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

export default memo(IconArrow);
