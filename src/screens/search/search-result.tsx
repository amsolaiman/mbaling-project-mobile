import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

// components
import { Spinner } from '@/components/spinner-overlay';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { BOTTOM_TAB_BAR_INSET, Spacing } from '@/styles';

//
import PostCard, { PostCardProps } from '../_components/post-card';

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
      renderItem={({ item }) => <PostCard hideProfile item={item} />}
      //
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={{
        paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.five,
      }}
      //
      ListFooterComponent={
        <View style={{ marginTop: Spacing.five }}>
          <Spinner
            size={42}
            color={colorScheme === 'light' ? 'primary' : 'light'}
          />
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
    paddingHorizontal: Spacing.three,
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
  },
});
