import { StyleSheet, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
// component
import Spinner from './spinner';

// ----------------------------------------------------------------------

type Props = {
  state: boolean;
  caption?: string;
};

export default function SpinnerOverlay({ state, caption = 'Loading...' }: Props) {
  return (
    <Portal>
      <Modal visible={state} contentContainerStyle={styles.container}>
        <Spinner />

        <Text className="text-center text-sm text-white font-normal">{caption}</Text>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
});
