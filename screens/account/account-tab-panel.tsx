import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useColorScheme } from '@/hooks/use-color-scheme';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { HousingApplicantResponse, HousingTenantResponse } from '@/types/housing';
// styles
import Colors from '@/styles/constants/Colors';
import Fonts from '@/styles/constants/Fonts';
// assets
import { IconBookmark, IconSettings } from '@/assets/icons';
//
import AccountLandlordList from './account-landlord-list';

// ----------------------------------------------------------------------

type TabProps = {
  title: string;
  isActive: boolean;
  onPress: VoidFunction;
  badgeCount: number | null;
};

const Tab: React.FC<TabProps> = ({ title, isActive, onPress, badgeCount }) => {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {title === 'setup' && (
          <IconSettings
            variant={isActive ? 'solid' : 'outline'}
            size={30}
            color={Colors[colorScheme].text}
          />
        )}

        {title === 'list' && (
          <IconBookmark
            variant={isActive ? 'solid' : 'outline'}
            size={30}
            color={Colors[colorScheme].text}
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

  const getPendingData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.landlord.applicants(user?.id));

      const users: HousingApplicantResponse[] = response.data;

      const _data = users.map((user) => user);

      setPending(_data);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

  const getCurrentData = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.landlord.tenants(user?.id));

      const _data: HousingTenantResponse[] = response.data;

      setCurrent(_data);
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

  useEffect(() => {
    getPendingData();
    getCurrentData();
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
        {currentTab === 'setup' && <View />}

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
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
  },
  tabPage: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 24 + 76,
  },
  badge: {
    ...Fonts[500],
    position: 'absolute',
    top: -6,
    right: -6,
    fontSize: 12,
  },
});
