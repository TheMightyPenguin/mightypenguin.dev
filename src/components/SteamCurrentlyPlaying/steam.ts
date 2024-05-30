const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_API = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=76561198058699106&format=json`;
const STEAM_RECENTLY_PLAYED_GAMES = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=76561198058699106&format=json`;

async function getRecentlyPlayedGames() {
  const response = await fetch(STEAM_RECENTLY_PLAYED_GAMES, {
    next: {
      revalidate: 3600 / 4,
    },
  });
  const data = await response.json();
  return data;
}

export async function getSteamPlayingData() {
  const steamResponse = await fetch(STEAM_API, {
    next: {
      revalidate: 3600 / 4,
    },
  });
  const steamData = await steamResponse.json();
  const recentlyPlayedGames = await getRecentlyPlayedGames();

  const [profileData] = steamData?.response?.players ?? [];

  if (!profileData) {
    throw new Error('Not found');
  }

  let lastPlayedGame;

  try {
    if (profileData?.gameid) {
      const gameInfo = recentlyPlayedGames?.response?.games?.find(
        (game: any) => {
          return game.appid.toString() === profileData?.gameid.toString();
        },
      );
      lastPlayedGame = gameInfo ?? {};
      lastPlayedGame.mode = 'currently_playing';
    } else {
      lastPlayedGame = recentlyPlayedGames?.response?.games?.[0];
    }
    return lastPlayedGame;
  } catch (e) {
    throw new Error('Error getting game');
  }
}
