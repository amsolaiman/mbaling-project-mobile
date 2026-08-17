/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

// components
import Button from '@/components/_ui/button';
import BackButton from '@/components/back-button';
import useCustomAlert from '@/components/custom-alert';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// styles
import { Fonts, Spacing } from '@/styles';
// types
import { UploadFormValue } from '@/types/posts';

//
import { FooterActions } from '../../../_components';
import PostFormFields from '../post-form-fields';
import PostFormUpload from '../post-form-upload';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  title: string;
  price: number;
  description: string;
  uploads: UploadFormValue[];
};

export default function PostCreateView() {
  const { alert } = useCustomAlert();

  const PostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === '' ? undefined : value
      )
      .required('Price is required')
      .moreThan(0, 'Price should not be ₱0.00'),
    description: Yup.string().required('Description is required'),
    uploads: Yup.array()
      .of(
        Yup.object({
          uri: Yup.string().required(),
          name: Yup.string().required(),
          type: Yup.string().required(),
        })
      )
      .min(1, 'At least 1 image is required')
      .max(5)
      .required(),
  });

  const defaultValues = {
    title: '',
    price: 0,
    description: '',
    uploads: [],
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PostSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.replace('/manage');
      console.info('DATA', data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, []);

  const handleReturn = useCallback(() => {
    alert({
      message:
        'Are you sure you want to leave this screen? Any unsaved changes will be lost.',
      buttons: [
        { text: 'CANCEL' },
        { text: 'YES', onPress: router.back, variant: 'contained' },
      ],
    });
  }, [alert]);

  return (
    <FormProvider {...methods}>
      <ThemedKeyboardAvoidingView>
        <ThemedView
          loadingState={isSubmitting}
          loadingCaption="Creating post..."
          style={styles.container}
        >
          <BackButton customFunc={handleReturn} />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <PostFormUpload />

            <PostFormFields />
          </ScrollView>

          <FooterActions>
            <Button
              onPress={handleSubmit(onSubmit)}
              labelStyle={styles.buttonLabel}
            >
              Post
            </Button>
          </FooterActions>
        </ThemedView>
      </ThemedKeyboardAvoidingView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.black.main,
  },
  buttonLabel: {
    ...Fonts[500],
    fontSize: 14,
    marginVertical: Spacing.four,
    marginHorizontal: Spacing.five,
  },
});
