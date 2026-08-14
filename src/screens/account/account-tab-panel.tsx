/* eslint-disable no-console */

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';

// assets
import { IconDocument, IconSettings } from '@/assets/icons';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { BOTTOM_TAB_BAR_INSET, Colors, Fonts, Spacing } from '@/styles';
// types
import {
  HousingApplicantResponse,
  HousingTenantResponse,
} from '@/types/housing';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

//
import AccountLandlordList from './account-landlord-list';
import AccountLandlordSetup from './account-landlord-setup';

// ----------------------------------------------------------------------

type TabProps = {
  title: string;
  isActive: boolean;
  onPress: VoidFunction;
  badgeCount: number | null;
};

const Tab: React.FC<TabProps> = ({ title, isActive, onPress, badgeCount }) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {title === 'setup' && (
          <IconSettings
            variant={isActive ? 'solid' : 'outline'}
            size={30}
            color={colors.text}
          />
        )}

        {title === 'list' && (
          <IconDocument
            variant={isActive ? 'solid' : 'outline'}
            size={30}
            color={colors.text}
          />
        )}
      </TouchableOpacity>

      {badgeCount ? <Badge style={styles.badge}>{badgeCount}</Badge> : null}
    </View>
  );
};

// ----------------------------------------------------------------------

export default function AccountTabPanel() {
  const { user } = useAuthContext();

  const [currentTab, setCurrentTab] = useState<string>('setup');

  const [pending, setPending] = useState<HousingApplicantResponse[]>();

  const [current, setCurrent] = useState<HousingTenantResponse[]>();

  const userId = user?.id;

  const getPendingData = useCallback(async () => {
    if (typeof userId !== 'string') return;

    try {
      const response = await axios.get(
        API_ENDPOINTS.landlord.applicants(userId)
      );

      const users: HousingApplicantResponse[] = response.data.data;
      setPending(users);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, [userId]);

  const getCurrentData = useCallback(async () => {
    if (typeof userId !== 'string') return;

    try {
      const response = await axios.get(API_ENDPOINTS.landlord.tenants(userId));

      const _data: HousingTenantResponse[] = response.data.data;
      setCurrent(_data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      await getPendingData();
      await getCurrentData();
    };
    fetchData();
  }, [getPendingData, getCurrentData]);

  const TABS = [
    {
      name: 'setup',
      badgeCount: null,
    },
    {
      name: 'list',
      badgeCount: pending?.length ?? null,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <Tab
            key={tab.name}
            title={tab.name}
            isActive={currentTab === tab.name}
            onPress={() => setCurrentTab(tab.name)}
            badgeCount={tab.badgeCount}
          />
        ))}
      </View>

      <View style={styles.tabPage}>
        {currentTab === 'setup' && <AccountLandlordSetup />}

        {currentTab === 'list' && (
          <AccountLandlordList pendingList={pending} currentList={current} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    marginTop: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: Spacing.three,
  },
  tabPage: {
    flex: 1,
    paddingTop: Spacing.five,
    paddingBottom: BOTTOM_TAB_BAR_INSET + Spacing.five,
  },
  badge: {
    ...Fonts[500],
    position: 'absolute',
    top: -Spacing.oneHalf,
    right: -Spacing.oneHalf,
    fontSize: 12,
  },
});
