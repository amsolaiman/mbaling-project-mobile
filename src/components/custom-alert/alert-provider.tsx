import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';

// components
import { ThemedText } from '@/components/themed-native';
// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';

//
import { CustomAlertContext } from './alert-context';
import { AlertButtonType, AlertConfig, AlertParamsType } from './types';

// ----------------------------------------------------------------------

export default function CustomAlertProvider({
  children,
}: React.PropsWithChildren) {
  const theme = useTheme();

  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  const alert = useCallback(
    ({ title, message, buttons }: AlertParamsType) => {
      return new Promise<string>((resolve) => {
        setAlertConfig({
          message,
          title: title || null,
          buttons: buttons ?? [{ text: 'OK' }],
          resolve,
        });
      });
    },
    [setAlertConfig]
  );

  const handlePress = (button: AlertButtonType) => {
    alertConfig?.resolve(button.text);
    setAlertConfig(null);
    button.onPress?.();
  };

  const handleClose = () => {
    setAlertConfig(null);
  };

  const memoizedValue = useMemo(
    () => ({
      alert,
    }),
    [alert]
  );

  return (
    <CustomAlertContext.Provider value={memoizedValue}>
      {children}

      {alertConfig && (
        <Portal>
          <Modal
            visible={Boolean(alertConfig)}
            onDismiss={handleClose}
            contentContainerStyle={[
              styles.modal,
              { backgroundColor: theme.backgroundCard },
            ]}
          >
            {alertConfig.title && (
              <ThemedText style={styles.title}>{alertConfig.title}</ThemedText>
            )}

            <ThemedText style={styles.message}>
              {alertConfig.message}
            </ThemedText>

            <View style={styles.buttonContainer}>
              {alertConfig.buttons.map((btn, index) => (
                <Button
                  key={index}
                  onPress={() => handlePress(btn)}
                  mode={btn.variant ?? 'text'}
                  style={styles.button}
                  labelStyle={{
                    ...(btn.variant === 'contained' && {
                      color: COMMON_COLORS.white.main,
                    }),
                  }}
                >
                  {btn.text}
                </Button>
              ))}
            </View>
          </Modal>
        </Portal>
      )}
    </CustomAlertContext.Provider>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: Spacing.four,
    borderRadius: Spacing.one,
  },
  title: {
    ...Fonts[600],
    padding: Spacing.three,
    paddingBottom: 0,
    fontSize: 20,
  },
  message: {
    padding: Spacing.three,
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
  buttonContainer: {
    padding: Spacing.two,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: Spacing.two,
    borderColor: COLOR_PRIMARY,
  },
  button: {
    borderRadius: Spacing.one,
  },
});
