import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline' | 'duotone';
};

const IconChatRound = ({ variant = 'solid', size = 24, color }: Props) => {
  // solar:chat-round-bold
  const renderSolid = (
    <Path
      fill={color}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22"
    />
  );

  // solar:chat-round-outline
  const renderOutline = (
    <>
      <Path
        fill={color}
        d="M7.456 3.09A10 10 0 0 0 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.764.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.134A9.96 9.96 0 0 0 12 22c4.885 0 8.952-3.503 9.826-8.134A9 9 0 0 1 7.456 3.09"
      />
      <Path
        fill={color}
        d="M21.826 13.866q.172-.909.174-1.866c0-5.523-4.477-10-10-10a9.96 9.96 0 0 0-4.544 1.09a9 9 0 0 0 14.37 10.776"
        opacity="0.5"
      />
    </>
  );

  // solar:chat-round-bold-duotone
  const renderDuotone = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.75 12c0-5.937-4.813-10.75-10.75-10.75S1.25 6.063 1.25 12c0 1.718.404 3.345 1.122 4.787c.107.215.13.435.08.62l-.595 2.226c-.408 1.524.986 2.918 2.51 2.51l2.226-.596a.9.9 0 0 1 .62.08A10.7 10.7 0 0 0 12 22.75c5.937 0 10.75-4.813 10.75-10.75M12 2.75a9.25 9.25 0 0 1 0 18.5a9.2 9.2 0 0 1-4.118-.965a2.38 2.38 0 0 0-1.676-.187l-2.227.596a.55.55 0 0 1-.673-.674l.596-2.226a2.38 2.38 0 0 0-.187-1.676A9.2 9.2 0 0 1 2.75 12A9.25 9.25 0 0 1 12 2.75"
    />
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {variant === 'solid' && renderSolid}

      {variant === 'outline' && renderOutline}

      {variant === 'duotone' && renderDuotone}
    </Svg>
  );
};

export default memo(IconChatRound);
