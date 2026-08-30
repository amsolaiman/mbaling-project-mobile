import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';

// components
import ImageModal from '@/components/image-modal';
// constants
import { COLOR_ACCENT, COLOR_PRIMARY, GREY_COLORS } from '@/constants/theme';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import { Spacing } from '@/styles';
// types
import { IPostUploads } from '@/types/posts';

// ----------------------------------------------------------------------

type Props = {
  data: Omit<IPostUploads, 'postId'>[];
};

export default function PostCarousel({ data }: Props) {
  const open = useBoolean();

  const [pageIndex, setPageIndex] = useState<number>(0);

  const [modalImg, setModalImg] = useState<string | null>(null);

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

  const handleOpenModal = (imgUrl: string) => {
    setModalImg(imgUrl);
    open.onTrue();
  };

  const handleCloseModal = () => {
    setModalImg(null);
    open.onFalse();
  };

  const renderItem = ({ item }: { item: Omit<IPostUploads, 'postId'> }) => (
    <Pressable onPress={() => handleOpenModal(item.imgUrl)}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
    </Pressable>
  );

  return (
    <>
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

      {open.value && modalImg && (
        <ImageModal
          src={modalImg}
          open={open.value}
          onClose={handleCloseModal}
        />
      )}
    </>
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
    bottom: Spacing.four,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    zIndex: 10,
  },
  dot: {
    width: Spacing.two,
    height: Spacing.two,
    borderRadius: '50%',
  },
});
