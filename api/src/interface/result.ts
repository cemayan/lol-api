export interface IResult {
  gameId:number,
  summonerId: string,
  participants: IPResult[] 

}

export interface IPResult {
  summonerId: string,
  summonerName:string,
  teamId: number,
  championId: number,
  championName: string,
  championMastery: number
}


