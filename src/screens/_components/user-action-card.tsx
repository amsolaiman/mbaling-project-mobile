import { StyleSheet, TouchableOpacity, View } from 'react-native';

// assets
import { IconCheckCircle, IconCloseCircle } from '@/assets/icons';
// components
import Avatar from '@/components/_ui/avatar';
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Colors, Fonts, Spacing } from '@/styles';

// ----------------------------------------------------------------------

type UserActionProps = {
  name: string;
  username: string;
  avatarUrl: string | null;
};

type Props = {
  data: UserActionProps;
  onApprove?: VoidFunction;
  onReject?: VoidFunction;
};

// ----------------------------------------------------------------------

export default function UserActionCard({ data, onApprove, onReject }: Props) {
  const { name, username, avatarUrl } = data;

  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View
      style={[
        styles.card,
        styles.shadow,
        { backgroundColor: colors.backgroundCard },
      ]}
    >
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

      <View style={styles.actions}>
        {onApprove && (
          <TouchableOpacity onPress={onApprove}>
            <IconCheckCircle variant="outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}

        {onReject && (
          <TouchableOpacity onPress={onReject}>
            <IconCloseCircle
              variant="outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.two,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    borderRadius: Spacing.two,
  },
  profileWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.oneHalf,
  },
  shadow: {
    shadowColor: COMMON_COLORS.black.main,
    shadowOffset: {
      width: 0,
      height: Spacing.one,
    },
    shadowOpacity: 0.25,
    shadowRadius: Spacing.one,
    elevation: Spacing.one,
  },
});
