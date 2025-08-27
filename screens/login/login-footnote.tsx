import { Pressable, StyleSheet, Text, View } from 'react-native';
// theme
import Colors from '@/styles/constants/Colors';
// assets
import { IconQuestionMark } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function LoginFootnote() {
  const handleClick = () => {
    alert('Please proceed to the MSU Housing Management Division to sign-up for an account.');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleClick} style={styles.button}>
        <Text className="font-normal" style={styles.text}>
          Sign-up for an account
        </Text>

        <IconQuestionMark variant="outline" size={14} color={Colors.common.white.main} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: Colors.common.white.main,
    fontSize: 12,
  },
});
