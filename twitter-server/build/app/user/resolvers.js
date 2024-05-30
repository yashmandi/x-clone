"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = __importDefault(require("../../clients/db"));
const axios_1 = __importDefault(require("axios"));
const jwt_1 = __importDefault(require("../../services/jwt"));
const queries = {
    verifyGoogleToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        var _b;
        const googleToken = token;
        const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthURL.searchParams.set("id_token", googleToken);
        const { data } = yield axios_1.default.get(googleOauthURL.toString(), {
            responseType: "json"
        });
        const user = yield db_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            yield db_1.default.user.create({
                data: {
                    email: data.email,
                    firstName: (_b = data.given_name) !== null && _b !== void 0 ? _b : '',
                    lastName: data.family_name,
                    profileImageURL: data.picture
                },
            });
        }
        const userInDb = yield db_1.default.user.findUnique({ where: { email: data.email }, });
        if (!userInDb)
            throw new Error("User with email not found");
        const userToken = yield jwt_1.default.generateTokenForUser(userInDb);
        return userToken;
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const id = (_c = ctx.user) === null || _c === void 0 ? void 0 : _c.id;
        if (!id)
            return null;
        const user = yield db_1.default.user.findUnique({ where: { id } });
        return user;
    })
};
const extraResolvers = {
    User: {
        tweets: (parent) => db_1.default.tweet.findMany({ where: { id: parent.id } })
    }
};
exports.resolvers = { queries, extraResolvers };
