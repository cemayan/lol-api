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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const service = __importStar(require("../service/"));
require("dotenv").config();
const invalidQuery = { region: "euw1", summoner: "sadfasa" };
const invalidSummoner = { id: "123131", accountId: "14141241", puuid: "12411", name: "Cem Ayan", profileIconId: 1231, revisionDate: 13123, summonerLevel: 31231 };
const invalidChampionId = 123123;
const invalidMatch = {
    lane: "MID",
    gameId: 39628846983123,
    champion: 101,
    platformId: "EUW1",
    timestamp: 1552656566752,
    queue: 400,
    role: "SOLO",
    season: 13
};
const validQuery = { region: "euw1", summoner: "jehuni" };
const validSummoner = { profileIconId: 3378, name: "jehuni",
    puuid: "7o-2ky8KGoZDKxKOVFdV9VpiwnshuSjgK2ZbvIB2qPvHPrLoW4CU-zHJtkqlR3rKQr_HLrQ-Ovt-JA",
    summonerLevel: 35,
    accountId: "rHgpSK-grwkF9j6_ZpVY5_t7uKBfyS8cu7ol66VWYrB-w4c",
    id: "_lacBnbdN4SMR7BaYBL4ivD_CeP_zLrrFm6C7zliTqG4k-g",
    revisionDate: 1552658202000
};
const validChampionId = 161;
const validMatch = {
    lane: "MID",
    gameId: 3962884698,
    champion: 101,
    platformId: "EUW1",
    timestamp: 1552656566752,
    queue: 400,
    role: "SOLO",
    season: 13
};
let validApiKey = process.env.API_KEY;
describe('Check Api Key', function () {
    it('should return valid APIKEY', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.checkValidApiKey(validQuery, validApiKey);
            assert_1.default.equal(result.status, 200);
        });
    });
});
describe('User Data', function () {
    it('should return valid UserData', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getUserData(validQuery);
            assert_1.default.equal(result.status, 200);
        });
    });
    it('should return 404 response for UserData', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getUserData(invalidQuery);
            const response = {
                status: {
                    message: 'Data not found - summoner not found',
                    status_code: 404
                }
            };
            assert_1.default.deepEqual(result.data, response);
        });
    });
});
describe('User Match', function () {
    it('should return valid UserMatch', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getUserMatch(validQuery, validSummoner);
            assert_1.default.equal(result.status, 200);
        });
    });
    it('should return 400 response for UserMatch', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getUserMatch(invalidQuery, invalidSummoner);
            const response = {
                status: {
                    message: "Bad Request - Exception decrypting " + invalidSummoner.accountId,
                    status_code: 400
                }
            };
            assert_1.default.deepEqual(result.data, response);
        });
    });
});
describe('Match  Info', function () {
    it('should return valid UserMatch', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getMatchInfo(validQuery, validMatch);
            assert_1.default.equal(result.status, 200);
        });
    });
    it('should return 404 response for UserMatch', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getMatchInfo(validQuery, invalidMatch);
            const response = {
                status: {
                    message: 'Data not found',
                    status_code: 404
                }
            };
            assert_1.default.deepEqual(result.data, response);
        });
    });
});
describe('Champion Level', function () {
    it('should return valid response for ChampionLevel', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getChampionLevel(validQuery, validSummoner.id, validChampionId);
            assert_1.default.deepEqual(result.status, 200);
        });
    });
    it('should return 404 or 400 response for ChampionLevel', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield service.getChampionLevel(validQuery, validSummoner.id, invalidChampionId);
            const response = {
                status: {
                    message: "Not found",
                    status_code: 404
                }
            };
            //condition2
            const result2 = yield service.getChampionLevel(validQuery, invalidSummoner.id, invalidChampionId);
            const response2 = {
                status: {
                    message: "Bad Request - Exception decrypting " + invalidSummoner.id,
                    status_code: 400
                }
            };
            assert_1.default.deepEqual(result.data, response);
            assert_1.default.deepEqual(result2.data, response2);
        });
    });
});
//# sourceMappingURL=test.js.map