import { useCallback, useEffect, useMemo, useState } from 'react';
// @expo
import * as Linking from 'expo-linking';
//
import useCustomAlert from '../custom-alert';
//
import ActionButton, {
  ActionButtonCopy,
  ActionButtonEmail,
  ActionButtonMessage,
  ActionButtonReport,
  ActionButtonShare,
} from './action-button';
import socialAppsChecking, { socialsReaderIcon, socialsReaderUrl } from './action-socials';
import { ActionMetaProps } from './types';

// ----------------------------------------------------------------------

function useAvailableSocialActions(meta: ActionMetaProps, onClose: VoidFunction) {
  const { alert } = useCustomAlert();

  const [apps, setApps] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchSocialApps = async () => {
      try {
        const result = await socialAppsChecking();
        if (isMounted) setApps(result);
      } catch (error) {
        console.error('Failed to check social apps:', error);
      }
    };

    fetchSocialApps();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePress = useCallback(
    async (name: string) => {
      const message = `mBALING | ${meta.title}\n\n${meta.link}`;

      try {
        const url = socialsReaderUrl(name, message);

        await Linking.openURL(url).catch(() => {
          alert({ message: 'Failed to open app.' });
        });

        onClose();
      } catch (error) {
        console.error(error);
      }
    },
    [alert, meta.link, meta.title, onClose]
  );

  const socials = useMemo(
    () =>
      apps.map((appName) => ({
        name: appName,
        component: (
          <ActionButton
            key={appName}
            label={appName}
            icon={socialsReaderIcon(appName)}
            onPress={() => handlePress(appName)}
          />
        ),
      })),
    [apps, handlePress]
  );

  return socials;
}

// ----------------------------------------------------------------------

export default function useActionSheetActions(meta: ActionMetaProps, onClose: VoidFunction) {
  const socials = useAvailableSocialActions(meta, onClose);

  return useMemo(
    () => [
      {
        name: 'Copy link',
        component: <ActionButtonCopy key="copy" meta={meta} onClose={onClose} />,
      },
      {
        name: 'Share',
        component: <ActionButtonShare key="share" meta={meta} onClose={onClose} />,
      },
      {
        name: 'Message',
        component: <ActionButtonMessage key="message" meta={meta} onClose={onClose} />,
      },
      {
        name: 'Email',
        component: <ActionButtonEmail key="email" meta={meta} onClose={onClose} />,
      },
      ...socials,
      {
        name: 'Report',
        component: <ActionButtonReport key="report" meta={meta} onClose={onClose} />,
      },
    ],
    [meta, onClose, socials]
  );
}
