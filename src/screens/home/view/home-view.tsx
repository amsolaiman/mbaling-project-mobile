/* eslint-disable no-console */

import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

// components
import { Spinner } from '@/components/spinner-overlay';
import { ThemedText, ThemedView } from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { BOTTOM_TAB_BAR_INSET, Fonts, Spacing } from '@/styles';
// types
import { PostResponse } from '@/types/posts';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import PostCard, { PostCardProps } from '../../_components/post-card';

// ----------------------------------------------------------------------

export default function HomeView() {
  const colorScheme = useColorScheme() ?? 'light';

  const refreshing = useBoolean();

  const [data, setData] = useState<PostCardProps[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.post.list);

      const posts: PostResponse[] = response.data.data;

      const _data = posts.map((post) => {
        const { id, title, uploads, createdBy } = post;

        return {
          id,
          title,
          imageUrl: uploads[0]?.imgUrl,
          userId: createdBy?.id,
          name: createdBy?.details?.housingName,
          avatarUrl: createdBy?.avatarUrl,
        };
      });

      setData(_data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(getData);
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
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        //
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{
          paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.six,
        }}
        //
        refreshControl={
          <RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <ThemedText style={styles.headerTitle}>FOR YOU</ThemedText>
        }
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={
          <View style={{ marginTop: Spacing.six }}>
            <Spinner
              size={42}
              color={colorScheme === 'light' ? 'primary' : 'light'}
            />
          </View>
        }
        ListFooterComponentStyle={styles.footer}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.three }} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  columnWrapper: {
    paddingHorizontal: Spacing.four,
    justifyContent: 'space-between',
  },
  header: {
    padding: Spacing.four,
  },
  headerTitle: {
    ...Fonts[700],
    fontSize: 18,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
});
