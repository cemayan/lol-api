import {IQuery, IParticipant, IParticipantIdenties, ISummoner, IResult} from  '../interface' ;
import * as service from '../service' 
import fs from 'fs';


export const getResult = async (query:IQuery,  matchInfo, summoner: ISummoner): Promise<IResult> => {

  let result: IResult = {gameId:0, summonerId: "", participants: [] }  
  result.participants = [] 

  let participants: IParticipant[] = matchInfo.participants;
  let participantIdentities: IParticipantIdenties[]   = matchInfo.participantIdentities;

  for(const p of participants) {
    for(const pI of participantIdentities) {

            if(p.participantId === pI.participantId) {
           
              let championName = findChampionName(p.championId);
              let championLevel = await service.getChampionLevel(query,pI.player.summonerId, p.championId);
              result.gameId = matchInfo.gameId;
              result.summonerId = summoner.id;
              result.participants.push({teamId: p.teamId, summonerId: pI.player.summonerId, 
                summonerName: pI.player.summonerName, championId: p.championId, championName: championName, championMastery: championLevel.data.championLevel });
            }
      }
  }

  result.participants.sort((a,b) => b.championMastery - a.championMastery)

  return result;
}


export const findChampionName = (championId: number) => {
  let champions = JSON.parse(fs.readFileSync("champion.json").toString());

  let championName = "";

  Object.keys(champions.data).forEach((champion) => {

    if(champions.data[champion].key === championId.toString()) {
        championName = champions.data[champion].id
    }
})

   return  championName;
}