import {IQuery, ISummoner, IMatch} from  '../interface' ;
import axios, { AxiosResponse } from 'axios';

if(typeof(process.env.API_KEY === "undefined")){
  require("dotenv").config();
}

const apiKey = process.env.API_KEY;

export const checkValidApiKey = async (query: IQuery, api_key: string): Promise<AxiosResponse> => {
  
  try {
    let result = await axios.get("https://" + query.region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + query.summoner + "?api_key=" + api_key);
    return result;
  }
  catch(e) {
    return e.response;
  }
}



export const getUserData = async (query: IQuery): Promise<AxiosResponse> => {
  
  try {
    let result = await axios.get("https://" + query.region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + query.summoner + "?api_key=" + apiKey);
    return result;
  }
  catch(e) {
    return e.response;
  }
}

export const getUserMatch = async(query: IQuery, summoner: ISummoner): Promise<AxiosResponse> => {
  
  try {
    let result = await axios.get("https://" + query.region + ".api.riotgames.com/lol/match/v4/matchlists/by-account/" + summoner.accountId + "?api_key=" + apiKey);
    return result;
  }
  catch(e) {
    return e.response;
  }
}

export const getChampionLevel = async (query: IQuery, summonerId: string, championId: number) => {
  try {
    let result = await axios.get("https://" + query.region + ".api.riotgames.com//lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerId + "/by-champion/" +championId +  "?api_key=" + apiKey);
    return result;
  }
  catch(e) {
    return e.response;
  }
} 


export const getMatchInfo = async (query: IQuery, match: IMatch): Promise<AxiosResponse>  =>{
  
  try {
    let result = await axios.get("https://" + query.region + ".api.riotgames.com/lol/match/v4/matches/" + match.gameId + "?api_key=" + apiKey);
    return result;
  }
  catch(e) {
    return e.response;
  }
}