import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
// auth
import { useAuthContext } from '@/auth/hooks';
import { useBoolean } from '@/hooks/use-boolean';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// styles
import Fonts from '@/styles/constants/Fonts';
// types
import { PostResponse } from '@/types/posts';
// components
import { ThemedText } from '@/components/themed-native';
//
import ManageCard, { ManageCardProps } from '../manage-card';
import ManageNoResult from '../manage-no-result';

// ----------------------------------------------------------------------

export default function ManageView() {
  const { user } = useAuthContext();

  const refreshing = useBoolean();

  const [data, setData] = useState<ManageCardProps[]>();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.post.user(user?.id));

      const posts: PostResponse[] = response.data;

      const _data = posts.map((post) => {
        const { id, title, uploads } = post;

        return {
          id,
          title,
          imageUrl: uploads[0].imgUrl,
        };
      });

      setData(_data);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

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
        renderItem={({ item }) => <ManageCard item={item} />}
        //
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
        //
        refreshControl={<RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />}
        ListHeaderComponent={<ThemedText style={styles.headerTitle}>YOUR POSTS</ThemedText>}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponent={<View style={{ paddingBottom: 24 + 76 }} />}
        ListEmptyComponent={<ManageNoResult />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    ...Fonts[700],
    fontSize: 18,
  },
});
