import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// components
import { Spinner } from '@/components/spinner-overlay';
//
import PostCard, { PostCardProps } from '@/screens/_components/post-card';

// ----------------------------------------------------------------------

type Props = {
  data: PostCardProps[];
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function SearchResult({ data, onScroll }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCard item={item} />}
      //
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      //
      ListFooterComponent={
        <View style={{ marginTop: 32 }}>
          <Spinner size={42} color={colorScheme === 'light' ? 'primary' : 'light'} />
        </View>
      }
      ListFooterComponentStyle={styles.footer}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      //
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 32 + 76,
    alignItems: 'center',
  },
});
