import { forwardRef } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import {
  ActionSheetRef,
  default as DefaultActionSheet,
} from 'react-native-actions-sheet';

// components
import { ThemedText } from '@/components/themed-native';
// constants
import { COLOR_PRIMARY, COLOR_SECONDARY, GREY_COLORS } from '@/constants/theme';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Fonts, Spacing } from '@/styles';

//
import useActionSheetActions from './_actions';
import { DefaultActionSheetProps } from './types';

// ----------------------------------------------------------------------

const ActionSheet = forwardRef<ActionSheetRef, DefaultActionSheetProps>(
  ({ meta, onClose }, ref) => {
    const { title, imageUrl, link } = meta;

    const color = useTheme();

    const renderSeparator = () => <View style={styles.listSeparator} />;

    const actions = useActionSheetActions(meta, onClose);

    return (
      <DefaultActionSheet
        ref={ref}
        onClose={onClose}
        containerStyle={{
          position: 'relative',
          backgroundColor: color.backgroundCard,
        }}
      >
        <ThemedText style={styles.title}>SHARE TO</ThemedText>

        <View style={styles.metaContainer}>
          <Image source={{ uri: imageUrl }} style={styles.metaImage} />

          <View style={styles.metaInfo}>
            <ThemedText style={styles.infoTitle}>{title}</ThemedText>
            <ThemedText style={styles.infoLink}>{link}</ThemedText>
          </View>
        </View>

        <FlatList
          data={actions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => item.component}
          contentContainerStyle={styles.listContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
        />
      </DefaultActionSheet>
    );
  }
);

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;

const styles = StyleSheet.create({
  listContainer: {
    padding: Spacing.three,
    paddingBottom: Spacing.four,
  },
  listSeparator: {
    width: 12,
  },
  title: {
    ...Fonts[600],
    padding: 8,
    textAlign: 'center',
    color: COLOR_PRIMARY,
  },
  metaContainer: {
    padding: Spacing.three,
    paddingBottom: Spacing.four,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: GREY_COLORS[200],
  },
  metaImage: {
    width: 80,
    minHeight: 80,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
    backgroundColor: COLOR_SECONDARY,
  },
  metaInfo: {
    flex: 1,
    marginLeft: 12,
    width: '100%',
  },
  infoTitle: {
    ...Fonts[500],
    fontSize: 16,
  },
  infoLink: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 12 * 1.2,
  },
});
