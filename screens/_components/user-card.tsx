import { StyleSheet, TouchableOpacity, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Avatar from '@/components/avatar';
import { ThemedText } from '@/components/themed-native';
// assets
import { IconCheckCircle, IconCloseCircle } from '@/assets/icons';

// ----------------------------------------------------------------------

type UserProps = {
  name: string;
  username: string;
  avatarUrl: string | null;
};

type Props = {
  data: UserProps;
  onApprove?: VoidFunction;
  onReject?: VoidFunction;
};

// ----------------------------------------------------------------------

export default function UserCard({ data, onApprove, onReject }: Props) {
  const { name, username, avatarUrl } = data;

  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.card, styles.shadow, { backgroundColor: Colors[colorScheme].card }]}>
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
            <IconCheckCircle variant="outline" size={24} color={Colors[colorScheme].text} />
          </TouchableOpacity>
        )}

        {onReject && (
          <TouchableOpacity onPress={onReject}>
            <IconCloseCircle variant="outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderRadius: 8,
  },
  profileWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
