import React, { forwardRef } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ActionSheetRef, default as DefaultActionSheet } from 'react-native-actions-sheet';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// components
import { ThemedText } from '@/components/themed-native';
//
import useActionSheetActions from './_actions';
import { DefaultActionSheetProps } from './types';

// ----------------------------------------------------------------------

const ActionSheet = forwardRef<ActionSheetRef, DefaultActionSheetProps>(
  ({ meta, onClose }, ref) => {
    const { title, imageUrl, link } = meta;

    const colorScheme = useColorScheme() ?? 'light';

    const renderSeparator = () => <View style={styles.listSeparator} />;

    const actions = useActionSheetActions(meta, onClose);

    return (
      <DefaultActionSheet
        ref={ref}
        onClose={onClose}
        containerStyle={{
          position: 'relative',
          backgroundColor: Colors[colorScheme].card,
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

export default ActionSheet;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  listSeparator: {
    width: 12,
  },
  title: {
    ...Fonts[600],
    padding: 8,
    textAlign: 'center',
    color: Colors.primary,
  },
  metaContainer: {
    padding: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },
  metaImage: {
    width: 80,
    minHeight: 80,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
    backgroundColor: Colors.secondary,
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
