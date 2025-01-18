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
exports.EventController = void 0;
const eventService_1 = __importDefault(require("../services/eventService"));
class EventController {
    logEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = req.body;
            try {
                const event = yield eventService_1.default.createEvent(eventData);
                res.status(201).json(event);
            }
            catch (error) { // 将 error 的类型声明为 unknown
                if (error instanceof Error) { // 检查 error 是否是 Error 的实例
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.EventController = EventController;
exports.default = new EventController();
//# sourceMappingURL=eventController.js.map