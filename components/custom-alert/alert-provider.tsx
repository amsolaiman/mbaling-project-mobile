import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import { ThemedText } from '../themed-native';
//
import { CustomAlertContext } from './alert-context';
import { AlertButtonType, AlertConfig, AlertParamsType } from './types';

// ----------------------------------------------------------------------

export default function CustomAlertProvider({ children }: React.PropsWithChildren) {
  const colorScheme = useColorScheme() ?? 'light';

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
            contentContainerStyle={[styles.modal, { backgroundColor: Colors[colorScheme].card }]}
          >
            {alertConfig.title && <ThemedText style={styles.title}>{alertConfig.title}</ThemedText>}

            <ThemedText style={styles.message}>{alertConfig.message}</ThemedText>

            <View style={styles.buttonContainer}>
              {alertConfig.buttons.map((btn, index) => (
                <Button
                  key={index}
                  onPress={() => handlePress(btn)}
                  mode={btn.variant ?? 'text'}
                  style={styles.button}
                  labelStyle={{
                    ...(btn.variant === 'contained' && {
                      color: Colors.common.white.main,
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
    margin: 24,
    borderRadius: 4,
  },
  title: {
    ...Fonts[600],
    padding: 16,
    paddingBottom: 0,
    fontSize: 20,
  },
  message: {
    padding: 16,
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
  buttonContainer: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: 8,
    borderColor: Colors.primary,
  },
  button: {
    borderRadius: 4,
  },
});
