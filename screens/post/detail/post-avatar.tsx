import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// component
import { ThemedText, ThemedView } from '@/components/themed-native';
// assets
import { IconArrow } from '@/assets/icons';
import Avatar from '@/components/avatar';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  name: string;
  username: string;
  avatarUrl: string | null;
};

export default function PostAvatar({ userId, name, username, avatarUrl }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  const handlePress = useCallback(() => {
    console.log('User: ', userId);
  }, [userId]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileWrapper}>
        <Avatar size={48} src={avatarUrl} />

        <View style={{ flex: 1 }}>
          <ThemedText numberOfLines={1} style={{ ...Fonts[600], fontSize: 16 }}>
            {name}
          </ThemedText>
          <ThemedText numberOfLines={1} style={{ fontSize: 14 }}>
            {'@' + username}
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity onPress={handlePress}>
        <IconArrow
          variant="outline"
          direction="right-up"
          size={24}
          color={Colors[colorScheme].text}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
