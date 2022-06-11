"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const ModForm_1 = __importDefault(require("./ModForm"));
//import logo from "./pgricon64.png";
const { Footer, Header } = antd_1.Layout;
const App = () => {
    return (react_1.default.createElement(antd_1.Layout, { style: { background: "none" } },
        react_1.default.createElement(Header, { style: { background: "none" } },
            react_1.default.createElement("h1", { className: "centered form-title" }, "Modomator")),
        react_1.default.createElement(ModForm_1.default, null),
        react_1.default.createElement(Footer, { style: { textAlign: "center", background: "none" } },
            react_1.default.createElement("img", { width: 32, src: "./pgricon64.png", alt: "Pok\u00E9mon Go Raiders logo", style: { marginRight: 8 } }),
            "Pok\u00E9mon GO Raiders")));
};
exports.default = App;
//# sourceMappingURL=App.js.map