import { StyleSheet, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

// styles
import { Colors } from '@/styles';

//
import Spinner from './spinner';

// ----------------------------------------------------------------------

type Props = {
  state: boolean;
  caption?: string;
};

export default function SpinnerOverlay({
  state,
  caption = 'Loading...',
}: Props) {
  return (
    <Portal>
      <Modal visible={state} contentContainerStyle={styles.container}>
        <Spinner />

        <Text style={styles.caption}>{caption}</Text>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  caption: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.dark.text,
  },
});
