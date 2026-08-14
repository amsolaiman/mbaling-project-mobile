/* eslint-disable no-console */

import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// components
import BackButton from '@/components/back-button';
import SpinnerOverlay from '@/components/spinner-overlay';
import { ThemedText, ThemedView } from '@/components/themed-native';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';
// types
import { PostResponse } from '@/types/posts';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import PostAvatar from '../post-avatar';
import PostCarousel from '../post-carousel';
import PostFooter from '../post-footer';

// ----------------------------------------------------------------------

export default function PostView() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<PostResponse>();

  const loading = !data;

  const getData = useCallback(async () => {
    try {
      const postResponse = await axios.get(
        API_ENDPOINTS.post.get(id as string)
      );

      const _postData: PostResponse = postResponse.data;

      setData(_postData);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
      router.back();
    }
  }, [id]);

  useEffect(() => {
    Promise.resolve().then(getData);
  }, [getData]);

  if (!data) {
    return <SpinnerOverlay state={loading} />;
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.heroContainer}>
          <PostCarousel data={data?.uploads ?? []} />

          <PostAvatar
            userId={data?.createdBy?.id}
            name={data?.createdBy?.details?.housingName}
            username={data?.createdBy?.username}
            avatarUrl={data?.createdBy?.avatarUrl}
          />
        </View>

        <ThemedView style={styles.infoContainer}>
          <View style={styles.infoHeading}>
            <ThemedText style={styles.heading}>{data?.title}</ThemedText>
            <ThemedText
              style={styles.heading}
            >{`PHP ${data?.price || 0}/mon`}</ThemedText>
          </View>

          <ThemedText style={{ fontSize: 16 }}>{data?.description}</ThemedText>
        </ThemedView>
      </ScrollView>

      <PostFooter
        id={data?.id}
        title={data?.title}
        chatLink={data?.createdBy?.details?.chatLink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.black.main,
  },
  heroContainer: {
    overflow: 'hidden',
    borderRadius: Spacing.five,
    marginBottom: 1,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    flexDirection: 'column',
    gap: Spacing.four,
    borderTopLeftRadius: Spacing.five,
    borderTopRightRadius: Spacing.five,
  },
  infoHeading: {
    flexDirection: 'column',
    gap: Spacing.two,
  },
  heading: {
    ...Fonts[600],
    fontSize: 20,
    textAlign: 'center',
  },
});
