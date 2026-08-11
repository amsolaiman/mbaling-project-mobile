import { Pressable, StyleSheet, Text, View } from 'react-native';

// assets
import { IconQuestionMark } from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function LoginFootnote() {
  const { alert } = useCustomAlert();

  const handleClick = () => {
    alert({
      message:
        'Please proceed to the MSU Housing Management Division to sign-up for an account.',
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleClick} style={styles.button}>
        <Text style={styles.text}>Sign-up for an account</Text>

        <IconQuestionMark
          variant="outline"
          size={14}
          color={COMMON_COLORS.white.main}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing.four,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  text: {
    ...Fonts[400],
    color: COMMON_COLORS.white.main,
    fontSize: 12,
  },
});
