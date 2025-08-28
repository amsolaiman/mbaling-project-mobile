export type AlertConfig = {
  message: string;
  title: string | null;
  buttons: AlertButtonType[];
  resolve: (value: string) => void;
};

export type AlertButtonType = {
  text: string;
  onPress?: () => void;
  variant?: 'contained' | 'outlined';
};

export type AlertParamsType = {
  message: string;
  title?: string;
  buttons?: AlertButtonType[];
};

// ----------------------------------------------------------------------

export type AlertContextType = {
  alert: (params: AlertParamsType) => Promise<string>;
};
