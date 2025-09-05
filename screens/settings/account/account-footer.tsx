import { StyleSheet, View } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
// components
import InfoBanner from '@/components/info-banner';

// ----------------------------------------------------------------------

export default function SettingsAccountFooter() {
  return (
    <View style={styles.container}>
      <InfoBanner
        title="Delete account"
        caption="Please proceed to the Housing Management Division to delete your account."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24 + 76,
    paddingHorizontal: 16,
    borderTopWidth: 1.5,
    borderColor: Colors.grey[300],
  },
});
