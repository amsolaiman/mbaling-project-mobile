import { useCallback, useEffect, useState } from 'react';
// @expo
import { router, useLocalSearchParams } from 'expo-router';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { PostResponse } from '@/types/posts';
// components
import SpinnerOverlay from '@/components/spinner-overlay';
//
import PostFormView, { FormValuesProps } from './form-view';

// ----------------------------------------------------------------------

export default function PostEditView() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<FormValuesProps>();

  const loading = !data;

  const getData = useCallback(async () => {
    try {
      const postResponse = await axios.get(API_ENDPOINTS.post.get(id as string));

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
      router.back();
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    return <SpinnerOverlay state={loading} />;
  }

  return <PostFormView currentItem={data} />;
}
