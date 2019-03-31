import {IQuery, IMatch, ISummoner} from  '../interface' ;

export const Summoner = (userResult) :ISummoner  => {
  return  {
    id: userResult.id,
    accountId: userResult.accountId,
    name: userResult.name,
    profileIconId: userResult.profileIconId,
    puuid: userResult.puuid,
    revisionDate: userResult.revisionDate,
    summonerLevel: userResult.summonerLevel
  }
}

export const Query = (summoner, region) :IQuery => {
  return   {summoner: summoner , region: region}
}

export const Match = (match) :IMatch => {
  return   {
    platformId: match.platformId,
    gameId: match.gameId,
    champion: match.champion,
    queue: match.queue,
    season: match.season,
    timestamp: match.timestamp,
    role: match.role,
    lane: match.lane
  }
}