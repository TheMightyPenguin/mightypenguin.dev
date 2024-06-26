'use server';

import { Box } from '@/components/Box/Box';
import { Stack } from '@/components/Stack/Stack';
import { Text } from '@/components/Text/Text';
import * as styles from './SteamCurrentlyPlaying.css';
import { getSteamPlayingData } from './steam';

function getGameImageUrl(game: { appid: string; img_icon_url: string }) {
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
}

export async function SteamCurrentlyPlaying() {
  const data = await getSteamPlayingData();
  return (
    <Box
      className={styles.container}
      background="grayscaleBackground"
      display="flex"
      flexDirection="row"
      alignItems="center"
      borderStyle="solid"
      borderColor="grayscaleHighContrastText"
      borderWidth="1px"
    >
      <Box className={styles.gameIconContainer}>
        <img
          className={styles.gameIcon}
          src={getGameImageUrl(data)}
          alt={data.name}
        />
      </Box>
      <Stack space="1x" xAlign="center">
        <Text color="grayscaleHighContrastText">
          {data.mode === 'currently_playing' ? 'Playing ' : 'Last played '}
          <Text color="lightText" fontFamily="accent" letterSpacing="1px">
            {data.name}
          </Text>
        </Text>
        <Text color="grayscaleHighContrastText">
          {data.playtime_forever / 60} hours
        </Text>
      </Stack>
    </Box>
  );
}
