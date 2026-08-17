import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

// components
import SpinnerOverlay from '@/components/spinner-overlay';
// types
import { PostResponse } from '@/types/posts';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import PostCreateView, { FormValuesProps } from './post-create-view';

// ----------------------------------------------------------------------

export default function PostEditView() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<FormValuesProps>();

  const loading = !data;

  const getData = useCallback(async () => {
    try {
      const postResponse = await axios.get(
        API_ENDPOINTS.post.get(id as string)
      );

      const post: PostResponse = postResponse.data;

      const _data: FormValuesProps = {
        title: post.title,
        price: post.price,
        description: post.description,
        uploads: post.uploads.map((_) => ({
          uri: _.imgUrl,
          name: _.imgUrl.split('/').pop() || 'image.jpeg',
          type: 'image',
        })),
      };

      setData(_data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;

      router.back();
      // eslint-disable-next-line no-console
      console.error(message);
    }
  }, [id]);

  useEffect(() => {
    Promise.resolve().then(getData);
  }, [getData]);

  if (!data) {
    return <SpinnerOverlay state={loading} />;
  }

  return <PostCreateView currentItem={data} />;
}
