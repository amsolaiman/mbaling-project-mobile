/* eslint-disable no-console */

import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { ThemedText, ThemedView } from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import { BOTTOM_TAB_BAR_INSET, Fonts, Spacing } from '@/styles';
// types
import { PostResponse } from '@/types/posts';
import { UserLandlordResponse } from '@/types/users';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import ManageCard, { ManageCardProps } from '../manage-card';
import ManageNoResult from '../manage-no-result';

// ----------------------------------------------------------------------

export default function ManageView() {
  const { user } = useAuthContext();
  const userDetails = user as UserLandlordResponse;

  const refreshing = useBoolean();

  const [data, setData] = useState<ManageCardProps[]>([]);

  const getData = useCallback(async () => {
    try {
      if (!userDetails?.id) return;

      const response = await axios.get(API_ENDPOINTS.post.user(userDetails.id));

      const posts: PostResponse[] = response.data.data;

      const _data = posts.map((post) => {
        const { id, title, uploads } = post;

        return {
          id,
          title,
          imageUrl: uploads?.[0]?.imgUrl ?? '',
        };
      });

      setData(_data);
    } catch (error) {
      console.error(error);
    }
  }, [userDetails]);

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
        renderItem={({ item }) => <ManageCard item={item} />}
        //
        style={styles.wrapper}
        contentContainerStyle={styles.content}
        //
        refreshControl={
          <RefreshControl refreshing={refreshing.value} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <ThemedText style={styles.headerTitle}>YOUR POSTS</ThemedText>
        }
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={<ManageNoResult />}
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
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  content: {
    flexGrow: 1,
    paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.six,
  },
  header: {
    paddingVertical: Spacing.four,
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    ...Fonts[700],
    fontSize: 18,
  },
});
