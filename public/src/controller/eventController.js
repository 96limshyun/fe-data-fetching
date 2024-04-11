var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { renderTimer, renderNewsList, renderNewsContent, renderLoading } from "../view/viewRenderer.js";
import { getNewsTitles, getNewsContent } from "../model/newsAPI.js";
import { NewsModel } from "../model/newsModel.js";
var TIMER_INITIAL = 10;
var TIME_INTERVAL = 1000;
var TIMER_END_VALUE = 1;
var increase = null;
var newsModel = new NewsModel();
var timer = Timer();
function Timer() {
    var timer = TIMER_INITIAL;
    var startTimer = function () {
        renderTimer(timer);
        increase = setInterval(function () {
            timer--;
            renderTimer(timer);
            if (timer < TIMER_END_VALUE) {
                clearInterval(increase);
                initData();
            }
        }, TIME_INTERVAL);
    };
    var stopTimer = function () {
        clearInterval(increase);
        renderLoading();
        timer = TIMER_INITIAL;
    };
    return { startTimer: startTimer, stopTimer: stopTimer };
}
export var initData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var titleList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNewsTitles()];
            case 1:
                titleList = _a.sent();
                newsModel.setTitleList(titleList.sort(function () { return Math.random() - 0.5; }));
                renderNewsList(titleList);
                return [4 /*yield*/, showSelectNews(newsModel.getNewsData())];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var showSelectNews = function (select) { return __awaiter(void 0, void 0, void 0, function () {
    var selectContent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timer.stopTimer();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                newsModel.updateNewsIndex(select);
                return [4 /*yield*/, getNewsContent(select)];
            case 2:
                selectContent = _a.sent();
                renderNewsContent(selectContent);
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.log("getContent error", error_1);
                return [3 /*break*/, 5];
            case 4:
                timer.startTimer();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var setEventHandler = function () {
    var updateBtn = document.querySelector(".update-button");
    updateBtn.addEventListener("click", function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateBtn.disabled = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, initData()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.log("initData error", error_2);
                    return [3 /*break*/, 5];
                case 4:
                    updateBtn.disabled = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    var newsCategory = document.querySelector(".category-list");
    newsCategory.addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var selectTitle;
        return __generator(this, function (_a) {
            selectTitle = e.target.textContent;
            if (e.target.className !== "category-list")
                showSelectNews(selectTitle);
            return [2 /*return*/];
        });
    }); });
};
