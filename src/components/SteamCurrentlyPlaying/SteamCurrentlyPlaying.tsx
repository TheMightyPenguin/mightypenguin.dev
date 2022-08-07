import { useQuery } from 'react-query';

import { Box } from '@/components/Box/Box';
import { Stack } from '@/components/Stack/Stack';
import { Text } from '@/components/Text/Text';

import * as styles from './SteamCurrentlyPlaying.css';

function fetchSteamCurrentlyPlaying() {
  return fetch('/api/steam').then((response) => response.json());
}

function useSteamCurrentlyPlaying() {
  return useQuery('steamCurrenlyPlaying', fetchSteamCurrentlyPlaying);
}

function getGameImageUrl(game: { appid: string; img_icon_url: string }) {
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
}

export function SteamCurrentlyPlaying() {
  const { data, isLoading } = useSteamCurrentlyPlaying();

  if (isLoading) return null;

  console.log({ data });

  return (
    <Box
      background="steamBackground"
      display="flex"
      flexDirection="row"
      alignItems="center"
      padding="3x"
      borderRadius="2x"
    >
      <Box className={styles.gameIconContainer}>
        <img
          style={{ width: '42px', height: '42px' }}
          className={styles.gameIcon}
          src={getGameImageUrl(data)}
          alt={data.name}
        />
      </Box>
      <Stack space="8px" xAlign="center">
        <Text
          color="lowContrastLightText"
          fontFamily="accent"
          letterSpacing="1px"
        >
          Playing{' '}
          <Text color="lightText" fontFamily="accent" letterSpacing="2px">
            {data.name}
          </Text>
        </Text>
        <Text
          color="lowContrastLightText"
          fontFamily="accent"
          letterSpacing="1px"
        >
          {data.playtime_forever / 60} hours
        </Text>
      </Stack>
    </Box>
  );
}
