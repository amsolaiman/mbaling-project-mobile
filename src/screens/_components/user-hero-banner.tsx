import { StyleSheet, View } from 'react-native';

// components
import Avatar from '@/components/_ui/avatar';
import { ThemedText } from '@/components/themed-native';
// constants
import { COLOR_PRIMARY } from '@/constants/theme';
// styles
import { Spacing } from '@/styles/';

// ----------------------------------------------------------------------

export type UserHeroBannerProps = {
  username: string;
  displayName: string;
  detailLine1: string;
  detailLine2: string;
  avatarUrl: string | null;
};

type Props = {
  info: UserHeroBannerProps;
  hideUsername?: boolean;
};

// ----------------------------------------------------------------------

export default function UserHeroBanner({ info, hideUsername = false }: Props) {
  const { username, displayName, detailLine1, detailLine2, avatarUrl } = info;

  return (
    <View style={styles.container}>
      {!hideUsername && (
        <ThemedText font={600} numberOfLines={1} style={styles.username}>
          {'@' + username}
        </ThemedText>
      )}

      <Avatar size={150} src={avatarUrl} style={styles.avatar} />

      <View style={{ paddingHorizontal: Spacing.one }}>
        <ThemedText font={700} style={styles.name}>
          {displayName}
        </ThemedText>

        <ThemedText style={styles.detail}>
          {detailLine1 + '\n' + detailLine2}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.five,
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.five,
    borderBottomWidth: Spacing.half,
    borderBottomColor: COLOR_PRIMARY,
  },
  username: {
    textAlign: 'center',
    fontSize: 16,
    color: COLOR_PRIMARY,
    textTransform: 'lowercase',
  },
  avatar: {
    outlineWidth: 1,
    outlineColor: COLOR_PRIMARY,
  },
  name: {
    marginBottom: Spacing.two,
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
