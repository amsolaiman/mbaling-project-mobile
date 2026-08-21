import { Pressable, StyleSheet } from 'react-native';

// assets
import { IconQuestionMark } from '@/assets/icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// styles
import { Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function DemoPopop() {
  const { alert } = useCustomAlert();

  const handleClick = () => {
    alert({
      title: 'Here for a demo?',
      message: (
        <ThemedText style={styles.message}>
          Use
          <ThemedText font={600}> demo_student </ThemedText>
          or
          <ThemedText font={600}> demo_landlord </ThemedText>
          with password
          <ThemedText font={600}> @demo123</ThemedText>.
        </ThemedText>
      ),
    });
  };

  return (
    <Pressable onPress={handleClick} style={styles.button}>
      <IconQuestionMark
        variant="outline"
        size={36}
        color={COMMON_COLORS.white.main}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: Spacing.four,
    right: Spacing.four,
    zIndex: 999,
  },
  message: {
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
});
