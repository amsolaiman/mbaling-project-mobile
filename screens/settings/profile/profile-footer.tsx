import { StyleSheet, View } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
// components
import InfoBanner from '@/components/info-banner';

// ----------------------------------------------------------------------

export default function SettingsProfileFooter() {
  return (
    <View style={styles.container}>
      <InfoBanner
        title="Set student course"
        caption="Please proceed to the Housing Management Division to edit your course information."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopWidth: 1.5,
    borderColor: Colors.grey[300],
  },
});
