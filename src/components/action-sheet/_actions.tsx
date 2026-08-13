/* eslint-disable no-console */

import { useEffect, useMemo, useState } from 'react';

//
import {
  ActionButtonCopy,
  ActionButtonEmail,
  ActionButtonMessage,
  ActionButtonReport,
  ActionButtonShare,
  ActionButtonSocial,
} from './action-button';
import socialAppsChecking from './action-socials';
import { ActionMetaProps, SocialAppNames } from './types';

// ----------------------------------------------------------------------

function useAvailableSocialActions(
  meta: ActionMetaProps,
  onClose: VoidFunction
) {
  const [apps, setApps] = useState<SocialAppNames[]>([]);

  useEffect(() => {
    let isMounted = true;

    socialAppsChecking()
      .then((result) => {
        if (isMounted) setApps(result);
      })
      .catch((error) => {
        console.error('Failed to check social apps:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(
    () =>
      apps.map((name) => ({
        name,
        component: (
          <ActionButtonSocial
            key={name}
            name={name}
            meta={meta}
            onClose={onClose}
          />
        ),
      })),
    [apps, meta, onClose]
  );
}

// ----------------------------------------------------------------------

export default function useActionSheetActions(
  meta: ActionMetaProps,
  onClose: VoidFunction
) {
  const socials = useAvailableSocialActions(meta, onClose);

  return useMemo(
    () => [
      {
        name: 'Copy link',
        component: (
          <ActionButtonCopy key="copy" meta={meta} onClose={onClose} />
        ),
      },
      {
        name: 'Share',
        component: (
          <ActionButtonShare key="share" meta={meta} onClose={onClose} />
        ),
      },
      {
        name: 'Message',
        component: (
          <ActionButtonMessage key="message" meta={meta} onClose={onClose} />
        ),
      },
      {
        name: 'Email',
        component: (
          <ActionButtonEmail key="email" meta={meta} onClose={onClose} />
        ),
      },
      ...socials,
      {
        name: 'Report',
        component: (
          <ActionButtonReport key="report" meta={meta} onClose={onClose} />
        ),
      },
    ],
    [meta, onClose, socials]
  );
}
