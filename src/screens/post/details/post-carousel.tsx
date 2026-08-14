import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';

// constants
import { COLOR_ACCENT, COLOR_PRIMARY, GREY_COLORS } from '@/constants/theme';
// styles
import { Spacing } from '@/styles';
// types
import { IPostUploads } from '@/types/posts';

// ----------------------------------------------------------------------

type Props = {
  data: Omit<IPostUploads, 'postId'>[];
};

export default function PostCarousel({ data }: Props) {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPageIndex(viewableItems[0].index);
    }
  };

  const [config] = useState([{ viewabilityConfig, onViewableItemsChanged }]);

  const renderItem = ({ item }: { item: Omit<IPostUploads, 'postId'> }) => (
    <Image source={{ uri: item.imgUrl }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        //
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        //
        viewabilityConfigCallbackPairs={config}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  pageIndex === index ? COLOR_PRIMARY : GREY_COLORS[50],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: 'relative',
    aspectRatio: 1 / 1,
  },
  image: {
    width: Dimensions.get('window').width,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    backgroundColor: COLOR_ACCENT,
  },
  pagination: {
    position: 'absolute',
    bottom: Spacing.three,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    zIndex: 10,
  },
  dot: {
    width: Spacing.two,
    height: Spacing.two,
    borderRadius: '50%',
  },
});
