import type { NextApiRequest, NextApiResponse } from 'next';

const STEAM_API_KEY = `4B69EA3B6D8DAA96DEBCB17D7A842B79`;
const STEAM_API = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=76561198058699106`;
const STEAM_RECENTLY_PLAYED_GAMES = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=76561198058699106&format=json`;

async function getRecentlyPlayedGames() {
  const response = await fetch(STEAM_RECENTLY_PLAYED_GAMES);
  const data = await response.json();
  return data;
}

export default async function steamPlayingData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const steamResponse = await fetch(STEAM_API);
  const steamData = await steamResponse.json();
  const recentlyPlayedGames = await getRecentlyPlayedGames();

  const [profileData] = steamData?.response?.players ?? [];

  if (!profileData) {
    res.status(404).json({ message: 'not found' });
    return;
  }

  let lastPlayedGame;

  if (profileData?.gameid) {
    lastPlayedGame = {};
  } else {
    lastPlayedGame = recentlyPlayedGames?.response?.games?.[0];
  }

  res.status(200).json(lastPlayedGame);
}
