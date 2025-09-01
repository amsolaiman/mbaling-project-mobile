import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// @expo
import { router, useLocalSearchParams } from 'expo-router';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { PostResponse } from '@/types/posts';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import BackButton from '@/components/back-button';
import SpinnerOverlay from '@/components/spinner-overlay';
import { ThemedText, ThemedView } from '@/components/themed-native';
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
      const postResponse = await axios.get(API_ENDPOINTS.post.get(id as string));

      const _postData: PostResponse = postResponse.data;

      setData(_postData);
    } catch (error) {
      router.back();
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    return <SpinnerOverlay state={loading} />;
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.heroContainer}>
          <PostCarousel data={data?.uploads ?? []} />

          <PostAvatar
            userId={data.landlordDetails.id}
            name={data.landlordDetails.housingDetails.housingName}
            username={data.landlordDetails.username}
            avatarUrl={data.landlordDetails.avatarUrl}
          />
        </View>

        <ThemedView style={styles.infoContainer}>
          <View style={styles.infoHeading}>
            <ThemedText style={styles.heading}>{data.title}</ThemedText>
            <ThemedText style={styles.heading}>{`PHP ${data.price}/mon`}</ThemedText>
          </View>

          <ThemedText style={{ fontSize: 16 }}>{data.description}</ThemedText>
        </ThemedView>
      </ScrollView>

      <PostFooter
        id={data.id}
        title={data.title}
        chatLink={data.landlordDetails.housingDetails.chatLink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.common.black.main,
  },
  heroContainer: {
    overflow: 'hidden',
    borderRadius: 32,
    marginBottom: 1,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  infoHeading: {
    flexDirection: 'column',
    gap: 8,
  },
  heading: {
    ...Fonts[600],
    fontSize: 20,
    textAlign: 'center',
  },
});
