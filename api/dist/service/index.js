"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
if (typeof (process.env.API_KEY === "undefined")) {
    require("dotenv").config();
}
const apiKey = process.env.API_KEY;
exports.checkValidApiKey = (query, api_key) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield axios_1.default.get("https://" + query.region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + query.summoner + "?api_key=" + api_key);
        return result;
    }
    catch (e) {
        return e.response;
    }
});
exports.getUserData = (query) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield axios_1.default.get("https://" + query.region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + query.summoner + "?api_key=" + apiKey);
        return result;
    }
    catch (e) {
        return e.response;
    }
});
exports.getUserMatch = (query, summoner) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield axios_1.default.get("https://" + query.region + ".api.riotgames.com/lol/match/v4/matchlists/by-account/" + summoner.accountId + "?api_key=" + apiKey);
        return result;
    }
    catch (e) {
        return e.response;
    }
});
exports.getChampionLevel = (query, summonerId, championId) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield axios_1.default.get("https://" + query.region + ".api.riotgames.com//lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerId + "/by-champion/" + championId + "?api_key=" + apiKey);
        return result;
    }
    catch (e) {
        return e.response;
    }
});
exports.getMatchInfo = (query, match) => __awaiter(this, void 0, void 0, function* () {
    try {
        let result = yield axios_1.default.get("https://" + query.region + ".api.riotgames.com/lol/match/v4/matches/" + match.gameId + "?api_key=" + apiKey);
        return result;
    }
    catch (e) {
        return e.response;
    }
});
//# sourceMappingURL=index.js.map