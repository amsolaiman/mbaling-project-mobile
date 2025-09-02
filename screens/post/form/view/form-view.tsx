import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
// @expo
import { router } from 'expo-router';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// types
import { UploadFormValue } from '@/types/posts';
// components
import BackButton from '@/components/back-button';
import Button from '@/components/button';
import useCustomAlert from '@/components/custom-alert';
import FormProvider from '@/components/hook-form';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
import { FooterActions } from '@/screens/_components';
//
import PostFormFields from '../form-fields';
import PostFormUpload from '../form-upload';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  title: string;
  price: number;
  description: string;
  uploads: UploadFormValue[];
};

type Props = {
  currentItem?: FormValuesProps;
};

export default function PostFormView({ currentItem }: Props) {
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

  const defaultValues = useMemo(
    () => ({
      title: currentItem?.title || '',
      price: currentItem?.price || 0,
      description: currentItem?.description || '',
      uploads: currentItem?.uploads || [],
    }),

    [currentItem]
  );

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
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.back();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleReturn = useCallback(() => {
    alert({
      message: 'Are you sure you want to leave this screen? Any unsaved changes will be lost.',
      buttons: [{ text: 'CANCEL' }, { text: 'YES', onPress: router.back, variant: 'contained' }],
    });
  }, [alert]);

  return (
    <FormProvider methods={methods}>
      <ThemedKeyboardAvoidingView>
        <ThemedView
          loadingState={isSubmitting}
          loadingCaption={currentItem ? 'Saving update...' : 'Creating post...'}
          style={styles.container}
        >
          <BackButton customFunc={handleReturn} />

          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
            <PostFormUpload />

            <PostFormFields />
          </ScrollView>

          <FooterActions>
            <Button onPress={handleSubmit(onSubmit)} labelStyle={styles.buttonLabel}>
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
    backgroundColor: Colors.common.black.main,
  },
  buttonLabel: {
    marginVertical: 16,
    marginHorizontal: 24,
    fontSize: 14,
    ...Fonts[500],
  },
});
