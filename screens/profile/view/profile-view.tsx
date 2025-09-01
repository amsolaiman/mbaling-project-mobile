import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
// @expo
import { router, useLocalSearchParams } from 'expo-router';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { PostResponse } from '@/types/posts';
import { UserLandlordResponse } from '@/types/users';
// components
import BackButton from '@/components/back-button';
import SpinnerOverlay from '@/components/spinner-overlay';
import PostCard, { PostCardProps } from '@/screens/_components/post-card';
import UserBanner, { UserBannerProps } from '@/screens/_components/user-banner';
//
import ProfileFooter from '../profile-footer';

// ----------------------------------------------------------------------

type LinkProps = {
  chatLink: string | null;
  mapLink: string | null;
};

export default function ProfileView() {
  const { id } = useLocalSearchParams();

  const refreshing = useBoolean();

  const [data, setData] = useState<UserBannerProps>();

  const [posts, setPosts] = useState<PostCardProps[]>();

  const [links, setLinks] = useState<LinkProps>();

  const loading = !data;

  const getData = useCallback(async () => {
    try {
      const userResponse = await axios.get(API_ENDPOINTS.landlord.get(id as string));
      const postsResponse = await axios.get(API_ENDPOINTS.post.user(id as string));

      const user: UserLandlordResponse = userResponse.data;
      const posts: PostResponse[] = postsResponse.data;

      const _userData = {
        username: user.username,
        displayName: user.housingDetails.housingName,
        detailLine1: `${user.addressLine1}, ${user.addressLine2}`,
        detailLine2: `${user.addressLine3}, ${user.addressLine4}`,
        avatarUrl: user.avatarUrl,
      };

      const _postsData = posts.map((post) => {
        const { id, title, uploads, landlordDetails } = post;
        return {
          id,
          title,
          imageUrl: uploads[0].imgUrl,
          userId: landlordDetails.id,
          name: landlordDetails.housingDetails.housingName,
          avatarUrl: landlordDetails.avatarUrl,
        };
      });

      const _linksData = {
        chatLink: user.housingDetails.chatLink,
        mapLink: user.housingDetails.mapLink,
      };

      setData(_userData);
      setPosts(_postsData);
      setLinks(_linksData);
    } catch (error) {
      router.back();
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onRefresh = useCallback(async () => {
    try {
      refreshing.onTrue();
      await getData();
    } catch (error) {
      console.error(error);
    } finally {
      refreshing.onFalse();
    }
  }, [getData, refreshing]);

  if (!data) {
    return <SpinnerOverlay state={loading} />;
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.container}>
        {!loading && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard item={item} hideProfile />}
            //
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            //
            refreshControl={<RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />}
            ListHeaderComponent={<UserBanner info={data} />}
            ListHeaderComponentStyle={styles.header}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={styles.footer}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        )}
      </View>

      <ProfileFooter id={id as string} mapLink={links?.mapLink} chatLink={links?.chatLink} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  footer: {
    paddingBottom: 24,
  },
});
