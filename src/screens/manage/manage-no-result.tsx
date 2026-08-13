import { StyleSheet, View } from 'react-native';

// assets
import { IconPin } from '@/assets/icons';
// components
import { ThemedText } from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';

// ----------------------------------------------------------------------

export default function ManageNoResult() {
  return (
    <View style={styles.container}>
      <IconPin size={56} color={GREY_COLORS[400]} />

      <ThemedText style={styles.text}>No post found!</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 12,
    color: GREY_COLORS[400],
  },
});
