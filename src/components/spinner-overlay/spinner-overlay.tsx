import { StyleSheet, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

// constants
import { COMMON_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';

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
    gap: Spacing.three,
  },
  caption: {
    ...Fonts[400],
    textAlign: 'center',
    fontSize: 14,
    color: COMMON_COLORS.white.main,
  },
});
