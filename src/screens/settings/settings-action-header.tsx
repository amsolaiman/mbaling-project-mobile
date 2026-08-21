import { router } from 'expo-router';
import { useCallback } from 'react';
import { Pressable } from 'react-native';

// assets
import { IconArrowAlt } from '@/assets/icons';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
// hooks
import { useTheme } from '@/hooks/use-theme';

//
import { SettingsHeader } from '../_components';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  isEdit: boolean;
  onEdit: VoidFunction;
  onSubmit: VoidFunction;
};

export default function SettingsActionHeader({
  title,
  isEdit,
  onEdit,
  onSubmit,
}: Props) {
  const color = useTheme();

  const { alert } = useCustomAlert();

  const handlePress = useCallback(async () => {
    if (!isEdit) {
      onEdit();
      return;
    }

    await onSubmit();
    router.back();
  }, [isEdit, onEdit, onSubmit]);

  const handleReturn = useCallback(() => {
    if (isEdit) {
      alert({
        message:
          'Are you sure you want to leave this screen? Any unsaved changes will be lost.',
        buttons: [
          { text: 'CANCEL' },
          { text: 'YES', onPress: router.back, variant: 'contained' },
        ],
      });
    } else {
      router.back();
    }
  }, [isEdit, alert]);

  return (
    <SettingsHeader
      title={title}
      actionLeft={
        <Pressable onPress={handleReturn}>
          <IconArrowAlt
            direction="left"
            variant="outline"
            size={24}
            color={color.text}
          />
        </Pressable>
      }
      actionRight={
        <Button onPress={handlePress} mode={isEdit ? 'contained' : 'outlined'}>
          {isEdit ? 'Save' : 'Edit'}
        </Button>
      }
    />
  );
}
