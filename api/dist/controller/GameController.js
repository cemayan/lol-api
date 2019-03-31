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
const express_1 = __importDefault(require("express"));
const service = __importStar(require("../service"));
const utils = __importStar(require("../utils"));
const model = __importStar(require("../model"));
const router = express_1.default.Router();
function GameController() { }
exports.default = GameController;
router.route("/")
    .get(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let summoner = req.query.summoner;
        let region = req.query.region;
        let query = model.Query(summoner, region);
        let userResult = yield service.getUserData(query);
        if (userResult.status === 200) {
            let summoner = model.Summoner(userResult.data);
            let userMatchResult = yield service.getUserMatch(query, summoner);
            if (userMatchResult.status === 404) {
                res.status(404).send(userMatchResult.data);
            }
            else if (userMatchResult.status === 400) {
                res.status(400).send(userMatchResult.data);
            }
            let match = model.Match(userMatchResult.data.matches[0]);
            let matchInfo = yield service.getMatchInfo(query, match);
            if (matchInfo.status === 404) {
                res.status(404).send(matchInfo.data);
            }
            let result = yield utils.getResult(query, matchInfo.data, summoner);
            res.status(200).send(result);
        }
        else if (userResult.status === 404) {
            res.status(404).send(userResult.data);
        }
    });
});
module.exports = router;
//# sourceMappingURL=GameController.js.map