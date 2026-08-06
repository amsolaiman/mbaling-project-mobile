import { memo } from 'react';
import Svg, { Path } from 'react-native-svg';

// ----------------------------------------------------------------------

type Props = {
  size: number;
  color: string;
  variant?: 'solid' | 'outline' | 'duotone';
};

const IconQuestionMark = ({ variant = 'solid', size = 24, color }: Props) => {
  // solar:question-circle-bold
  const renderSolid = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
    />
  );

  // solar:question-circle-outline
  const renderOutline = (
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 3.96 2.26a1.9 1.9 0 0 0-.465.369c-.102.12-.12.2-.12.246V13a.75.75 0 0 1-1.5 0v-1.25c0-.506.222-.916.477-1.217c.252-.297.566-.524.845-.689A1.124 1.124 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
    />
  );

  // solar:question-circle-bold-duotone
  const renderDuotone = (
    <>
      <Path
        fill={color}
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"
        opacity="0.5"
      />
      <Path
        fill={color}
        d="M12 7.75c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 1-1.5 0a2.625 2.625 0 1 1 4.508 1.829q-.138.142-.264.267a7 7 0 0 0-.571.617c-.22.282-.298.489-.298.662V13a.75.75 0 0 1-1.5 0v-.75c0-.655.305-1.186.614-1.583c.229-.294.516-.58.75-.814q.106-.105.193-.194A1.125 1.125 0 0 0 12 7.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
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

export default memo(IconQuestionMark);
