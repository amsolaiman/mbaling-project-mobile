import { StyleSheet, View } from 'react-native';

// components
import InfoBanner from '@/components/info-banner';
// constants
import { GREY_COLORS } from '@/constants/theme';
// styles
import { Spacing } from '@/styles';

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
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    borderTopWidth: 1.5,
    borderColor: GREY_COLORS[300],
  },
});
