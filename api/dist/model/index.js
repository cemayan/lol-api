"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summoner = (userResult) => {
    return {
        id: userResult.id,
        accountId: userResult.accountId,
        name: userResult.name,
        profileIconId: userResult.profileIconId,
        puuid: userResult.puuid,
        revisionDate: userResult.revisionDate,
        summonerLevel: userResult.summonerLevel
    };
};
exports.Query = (summoner, region) => {
    return { summoner: summoner, region: region };
};
exports.Match = (match) => {
    return {
        platformId: match.platformId,
        gameId: match.gameId,
        champion: match.champion,
        queue: match.queue,
        season: match.season,
        timestamp: match.timestamp,
        role: match.role,
        lane: match.lane
    };
};
//# sourceMappingURL=index.js.map