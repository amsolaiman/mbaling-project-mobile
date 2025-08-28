import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// styles
import Fonts from '@/styles/constants/Fonts';
// types
import { PostResponse } from '@/types/posts';
// components
import { Spinner } from '@/components/spinner-overlay';
import { ThemedText } from '@/components/themed-native';
//
import PostCard, { PostCardProps } from '@/screens/_components/post-card';

// ----------------------------------------------------------------------

export default function HomeView() {
  const colorScheme = useColorScheme() ?? 'light';

  const refreshing = useBoolean();

  const [data, setData] = useState<PostCardProps[]>();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.post.list);

      const posts: PostResponse[] = response.data;

      const _data = posts.map((post) => {
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

      setData(_data);
    } catch (error: any) {
      const message = typeof error === 'string' ? error : error.message;
      console.error(message);
    }
  }, []);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        //
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        //
        refreshControl={<RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />}
        ListHeaderComponent={<ThemedText style={styles.headerTitle}>FOR YOU</ThemedText>}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={
          <View style={{ marginTop: 32 }}>
            <Spinner size={42} color={colorScheme === 'light' ? 'primary' : 'light'} />
          </View>
        }
        ListFooterComponentStyle={styles.footer}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    ...Fonts[700],
    fontSize: 18,
  },
  footer: {
    paddingBottom: 32 + 76,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
