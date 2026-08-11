import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';

// assets
import { TabIconSearch } from '@/assets/icons/tab-icons';
// components
import useCustomAlert from '@/components/custom-alert';
import { RHFTextField } from '@/components/hook-form';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';
// types
import { PostResponse } from '@/types/posts';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import { PostCardProps } from '../../_components/post-card';
import SearchResult from '../search-result';

// ----------------------------------------------------------------------

type FormValuesProps = {
  input: string;
};

export default function SearchView() {
  const { alert } = useCustomAlert();

  const [data, setData] = useState<PostCardProps[]>();

  const defaultValues = {
    input: '',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const getData = useCallback(
    async (query: string) => {
      try {
        const response = await axios.get(API_ENDPOINTS.post.search(query));

        const posts: PostResponse[] = response.data.data;

        const _data = posts.map(({ id, title, uploads, createdBy }) => ({
          id,
          title,
          imageUrl: uploads[0]?.imgUrl,
          userId: createdBy?.id,
          name: createdBy?.details?.housingName,
          avatarUrl: createdBy?.avatarUrl,
        }));

        setData(_data);
      } catch (error) {
        const message =
          typeof error === 'string' ? error : (error as Error).message;

        alert({ title: 'Oops!', message });
      }
    },
    [alert]
  );

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      if (!data.input.trim()) return;

      setData([]);
      getData(data.input);
    },
    [getData]
  );

  const [scrollY] = useState(() => new Animated.Value(0));

  const headerPadding = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [16, 8],
    extrapolate: 'clamp',
  });

  useFocusEffect(
    useCallback(() => {
      reset();
      setData(undefined);
      scrollY.setValue(0);

      return () => {};
    }, [reset, scrollY])
  );

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <ThemedView loadingState={isSubmitting} style={{ flex: 1 }}>
            <Animated.View style={{ padding: headerPadding }}>
              <RHFTextField
                name="input"
                placeholder="Search"
                onSubmitEditing={handleSubmit(onSubmit)}
                //
                dense
                mode="outlined"
                theme={{ roundness: 50 }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <TabIconSearch
                        variant="outline"
                        size={20}
                        color={GREY_COLORS[600]}
                      />
                    )}
                  />
                }
              />
            </Animated.View>

            {data && data.length > 0 && (
              <SearchResult
                data={data}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  {
                    useNativeDriver: false,
                  }
                )}
              />
            )}
          </ThemedView>
        </ThemedKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}
