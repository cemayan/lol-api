import assert  from 'assert';
import * as service from '../service/'
import {IQuery, ISummoner, IMatch} from  '../interface' ;
require("dotenv").config();

const invalidQuery:IQuery = {region:"euw1", summoner:"sadfasa"}
const invalidSummoner:ISummoner = {  id: "123131", accountId: "14141241", puuid: "12411", name: "Cem Ayan", profileIconId: 1231, revisionDate: 13123, summonerLevel: 31231}
const invalidChampionId = 123123;
const invalidMatch: IMatch = {
  lane: "MID",
  gameId: 39628846983123,
  champion: 101,
  platformId: "EUW1",
  timestamp: 1552656566752,
  queue: 400,
  role: "SOLO",
  season: 13
}


const validQuery:IQuery = {region:"euw1", summoner:"jehuni"}
const validSummoner:ISummoner = { profileIconId: 3378, name: "jehuni", 
  puuid: "7o-2ky8KGoZDKxKOVFdV9VpiwnshuSjgK2ZbvIB2qPvHPrLoW4CU-zHJtkqlR3rKQr_HLrQ-Ovt-JA",
  summonerLevel: 35,
  accountId: "rHgpSK-grwkF9j6_ZpVY5_t7uKBfyS8cu7ol66VWYrB-w4c",
  id: "_lacBnbdN4SMR7BaYBL4ivD_CeP_zLrrFm6C7zliTqG4k-g",
  revisionDate: 1552658202000
}
const validChampionId = 161;
const validMatch:IMatch = {
  lane: "MID",
  gameId: 3962884698,
  champion: 101,
  platformId: "EUW1",
  timestamp: 1552656566752,
  queue: 400,
  role: "SOLO",
  season: 13
}

let validApiKey =<string>process.env.API_KEY;

describe('Check Api Key', function () {

  it('should return valid APIKEY',async function(){
    const result = await service.checkValidApiKey(validQuery, validApiKey);
    assert.equal(result.status, 200);
  });

});


describe('User Data', function () {

    it('should return valid UserData',async function(){
      const result = await service.getUserData(validQuery);
      assert.equal(result.status, 200);
    });

    it('should return 404 response for UserData',async function(){
      const result = await service.getUserData(invalidQuery);
      const response =  {
        status: {
          message: 'Data not found - summoner not found',
          status_code: 404
        }
      }
      assert.deepEqual(result.data, response);
    });

});


describe('User Match', function () {


  it('should return valid UserMatch',async function(){
      const result = await service.getUserMatch(validQuery, validSummoner);
      assert.equal(result.status, 200);
    });

    it('should return 400 response for UserMatch',async function(){
      const result = await service.getUserMatch(invalidQuery, invalidSummoner);
      const response =  {
        status: {
          message: "Bad Request - Exception decrypting " + invalidSummoner.accountId ,
          status_code: 400
        }
      }
      assert.deepEqual(result.data, response);
    });

})


describe('Match  Info', function () {

  it('should return valid UserMatch',async function(){
      const result = await service.getMatchInfo(validQuery, validMatch);
      assert.equal(result.status, 200);
    });

    it('should return 404 response for UserMatch',async function(){
      const result = await service.getMatchInfo(validQuery, invalidMatch);
      const response = { 
        status: 
        { 
          message: 'Data not found', 
          status_code: 404 
        } 
       }
      assert.deepEqual(result.data, response);
    });

})

describe('Champion Level', function () {

   it('should return valid response for ChampionLevel',async function(){
      const result = await service.getChampionLevel(validQuery, validSummoner.id, validChampionId );
      assert.deepEqual(result.status, 200);
    });

    it('should return 404 or 400 response for ChampionLevel',async function(){
      const result = await service.getChampionLevel(validQuery, validSummoner.id, invalidChampionId );
      const response =  {
        status: {
          message:  "Not found",
          status_code: 404
        }
      }

      //condition2
      const result2 = await service.getChampionLevel(validQuery, invalidSummoner.id, invalidChampionId );
      const response2 =  {
        status: {
          message:  "Bad Request - Exception decrypting " + invalidSummoner.id,
          status_code: 400
        }
      }

      assert.deepEqual(result.data, response);
      assert.deepEqual(result2.data, response2);
    });

});




