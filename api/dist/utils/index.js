"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service = __importStar(require("../service"));
const fs_1 = __importDefault(require("fs"));
exports.getResult = (query, matchInfo, summoner) => __awaiter(this, void 0, void 0, function* () {
    let result = { gameId: 0, summonerId: "", participants: [] };
    result.participants = [];
    let participants = matchInfo.participants;
    let participantIdentities = matchInfo.participantIdentities;
    for (const p of participants) {
        for (const pI of participantIdentities) {
            if (p.participantId === pI.participantId) {
                let championName = exports.findChampionName(p.championId);
                let championLevel = yield service.getChampionLevel(query, pI.player.summonerId, p.championId);
                result.gameId = matchInfo.gameId;
                result.summonerId = summoner.id;
                result.participants.push({ teamId: p.teamId, summonerId: pI.player.summonerId,
                    summonerName: pI.player.summonerName, championId: p.championId, championName: championName, championMastery: championLevel.data.championLevel });
            }
        }
    }
    result.participants.sort((a, b) => b.championMastery - a.championMastery);
    return result;
});
exports.findChampionName = (championId) => {
    let champions = JSON.parse(fs_1.default.readFileSync("champion.json").toString());
    let championName = "";
    Object.keys(champions.data).forEach((champion) => {
        if (champions.data[champion].key === championId.toString()) {
            championName = champions.data[champion].id;
        }
    });
    return championName;
};
//# sourceMappingURL=index.js.map