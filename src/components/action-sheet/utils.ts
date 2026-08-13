// styles
import { Colors } from '@/styles';

//
import { ActionMetaProps } from './types';

// ----------------------------------------------------------------------

export const actionIconStyles = () => ({
  size: 30,
  color: Colors.light.text,
});

export const buildShareMessage = (meta: ActionMetaProps) =>
  `mBALING | ${meta.title}\n\n${meta.link}`;
