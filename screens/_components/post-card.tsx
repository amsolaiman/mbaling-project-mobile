import React, { useCallback } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import Avatar from '@/components/avatar';
import { ThemedText } from '@/components/themed-native';
// assets
import { IconMenuDots } from '@/assets/icons';

// ----------------------------------------------------------------------

export type PostCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  userId: string;
  name: string;
  avatarUrl: string | null;
};

type Props = {
  item: PostCardProps;
  hideProfile?: boolean;
};

// ----------------------------------------------------------------------

export default function PostCard({ item, hideProfile = false }: Props) {
  const { id, title, imageUrl, userId, name, avatarUrl } = item;

  const colorScheme = useColorScheme() ?? 'light';

  const handlePressPost = useCallback(() => {
    console.log('Post: ', id);
  }, [id]);

  const handlePressProfile = useCallback(() => {
    console.log('User: ', userId);
  }, [userId]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressPost} style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </Pressable>

      {!hideProfile && (
        <View style={styles.infoWrapper}>
          <TouchableOpacity onPress={handlePressProfile} style={styles.profile}>
            <Avatar size={24} src={avatarUrl} />

            <ThemedText numberOfLines={1} style={styles.profileName}>
              {name}
            </ThemedText>
          </TouchableOpacity>

          <IconMenuDots size={24} color={Colors[colorScheme].text} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - 40) / 2,
    flexDirection: 'column',
    gap: 4,
  },
  imageWrapper: {
    width: '100%',
    height: 240,
    position: 'relative',
    backgroundColor: Colors.accent,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    ...Fonts[500],
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 16,
    color: Colors.common.white.main,
    lineHeight: 16 * 1.2,
    backgroundColor: Colors.common.black[60],
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileName: {
    ...Fonts[600],
    flex: 1,
    fontSize: 12,
  },
});
