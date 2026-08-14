import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconArrow } from '@/assets/icons';
// component
import Avatar from '@/components/_ui/avatar';
import { ThemedText, ThemedView } from '@/components/themed-native';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';

// ----------------------------------------------------------------------

type Props = {
  userId: string;
  name: string;
  username: string;
  avatarUrl: string | null;
};

export default function PostAvatar({
  userId,
  name,
  username,
  avatarUrl,
}: Props) {
  const color = useTheme();

  const handlePress = useCallback(() => {
    router.push(`/profile/${userId}`);
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
          color={color.text}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    paddingTop: 12,
    paddingBottom: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
});
