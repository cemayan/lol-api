import express from "express";
import {IQuery, IMatch, IResult, ISummoner} from  '../interface' ;

import * as service from '../service';
import * as utils from '../utils';
import * as model from '../model';
const router = express.Router();

export default function GameController() {}


router.route("/")
.get(async function(req, res) {

  let summoner = req.query.summoner;
  let region = req.query.region;
  let query: IQuery = model.Query(summoner, region);

  let userResult = await service.getUserData(query);

  if(userResult.status === 200) {

    let summoner: ISummoner = model.Summoner(userResult.data);
    let userMatchResult = await service.getUserMatch(query, summoner);

    if(userMatchResult.status === 404) {
      res.status(404).send(userMatchResult.data)
    }
    else if(userMatchResult.status === 400) {
      res.status(400).send(userMatchResult.data)
    }

    let match: IMatch = model.Match(userMatchResult.data.matches[0]);
    let matchInfo = await service.getMatchInfo(query, match);

    if(matchInfo.status === 404) {
      res.status(404).send(matchInfo.data)
    }


    let result: IResult = await utils.getResult(query, matchInfo.data, summoner);

    res.status(200).send(result);
  }
  else if(userResult.status === 404) {
    res.status(404).send(userResult.data)
  } 

});


module.exports = router;