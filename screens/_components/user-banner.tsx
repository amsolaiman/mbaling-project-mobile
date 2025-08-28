import { StyleSheet, View } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Avatar from '@/components/avatar';
import { ThemedText } from '@/components/themed-native';

// ----------------------------------------------------------------------

export type UserBannerProps = {
  username: string;
  displayName: string;
  detailLine1: string;
  detailLine2: string;
  avatarUrl: string | null;
};

type Props = {
  info: UserBannerProps;
  hideUsername?: boolean;
};

// ----------------------------------------------------------------------

export default function UserBanner({ info, hideUsername = false }: Props) {
  const { username, displayName, detailLine1, detailLine2, avatarUrl } = info;

  return (
    <View style={styles.container}>
      {!hideUsername && (
        <ThemedText numberOfLines={1} style={styles.username}>
          {'@' + username}
        </ThemedText>
      )}

      <Avatar size={150} src={avatarUrl} style={styles.avatar} />

      <View style={{ paddingHorizontal: 4 }}>
        <ThemedText style={styles.name}>{displayName}</ThemedText>

        <ThemedText style={styles.detail}>{detailLine1 + '\n' + detailLine2}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  username: {
    ...Fonts[600],
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary,
    textTransform: 'lowercase',
  },
  avatar: {
    outlineWidth: 1,
    outlineColor: Colors.primary,
  },
  name: {
    ...Fonts[700],
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  detail: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 14 * 1.2,
  },
});
