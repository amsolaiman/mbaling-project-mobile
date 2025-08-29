import React from 'react';
import { ViewProps } from 'react-native';

// ----------------------------------------------------------------------

export type DefaultActionSheetProps = {
  meta: ActionMetaProps;
  onClose: VoidFunction;
};

export type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onPress: VoidFunction;
};

export type ActionMetaProps = {
  title: string;
  imageUrl: string;
  link: string;
};

export type ActionBasicProps = ViewProps & {
  meta: ActionMetaProps;
  onClose?: VoidFunction;
};
