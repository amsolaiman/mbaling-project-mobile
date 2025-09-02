import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View, ViewToken } from 'react-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import Colors from '@/styles/constants/Colors';
// types
import { IPostUploads } from '@/types/posts';
// components
import ImageModal from '@/components/image-modal';

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

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPageIndex(viewableItems[0].index);
    }
  };

  const config = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

  const renderItem = ({ item }: { item: Omit<IPostUploads, 'postId'> }) => (
    <>
      <Pressable onPress={() => handleOpenModal(item.imgUrl)}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
      </Pressable>

      {modalImg && <ImageModal src={modalImg} open={open.value} onClose={handleCloseModal} />}
    </>
  );

  const handleOpenModal = (imgUrl: string) => {
    setModalImg(imgUrl);
    open.onTrue();
  };

  const handleCloseModal = () => {
    setModalImg(null);
    open.onFalse();
  };

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
        viewabilityConfigCallbackPairs={config.current}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: pageIndex === index ? Colors.primary : Colors.grey[50],
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
    backgroundColor: Colors.accent,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
