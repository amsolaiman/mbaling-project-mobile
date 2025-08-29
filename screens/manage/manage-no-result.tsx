import { StyleSheet, View } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
// components
import { ThemedText } from '@/components/themed-native';
// assets
import { IconPin } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function ManageNoResult() {
  return (
    <View style={styles.container}>
      <IconPin size={56} color={Colors.grey[400]} />

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
    color: Colors.grey[400],
  },
});
