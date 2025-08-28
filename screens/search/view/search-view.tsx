import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Animated, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
// @expo
import { useFocusEffect } from 'expo-router';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// theme
import Colors from '@/styles/constants/Colors';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
// assets
import { IconSearch } from '@/assets/icons';
// types
import { PostResponse } from '@/types/posts';
// components
import useCustomAlert from '@/components/custom-alert';
import { PostCardProps } from '@/screens/_components/post-card';
//
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

        const posts: PostResponse[] = response.data;

        const _data = posts.map(({ id, title, uploads, landlordDetails }) => ({
          id,
          title,
          imageUrl: uploads[0].imgUrl,
          userId: landlordDetails.id,
          name: landlordDetails.housingDetails.housingName,
          avatarUrl: landlordDetails.avatarUrl,
        }));

        setData(_data);
      } catch (error: any) {
        const message = typeof error === 'string' ? error : error.message;

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

  const scrollY = useRef(new Animated.Value(0)).current;

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
    <FormProvider methods={methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <ThemedView loadingState={isSubmitting} className="flex-1">
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
                    icon={() => <IconSearch variant="outline" size={20} color={Colors.grey[600]} />}
                  />
                }
              />
            </Animated.View>

            {!!data?.length && (
              <SearchResult
                data={data}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                  useNativeDriver: false,
                })}
              />
            )}
          </ThemedView>
        </ThemedKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}
