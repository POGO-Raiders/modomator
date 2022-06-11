"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
require("antd/dist/antd.min.css");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const ModerationMap_1 = __importDefault(require("./ModerationMap"));
const ModForm = () => {
    const copyToClipboard = (str) => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
            return navigator.clipboard.writeText(str);
        return Promise.reject("The Clipboard API is not available.");
    };
    const openNotification = (type) => {
        antd_1.notification.open({
            message: `${type} copied to clipboard.`,
            duration: 2,
        });
    };
    const [type, setType] = (0, react_1.useState)("");
    const onFinish = (values) => {
        const copyString = generateModerationString(type, values.id, values.reason, values.verified);
        copyToClipboard(copyString);
        openNotification(type);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (react_1.default.createElement("div", { className: "form-container" },
        react_1.default.createElement(antd_1.Form, { name: "modform", initialValues: { verified: false }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", requiredMark: false },
            react_1.default.createElement(antd_1.Form.Item, { label: "Discord ID", name: "id", rules: [{ required: true, message: "Input the member's ID." }] },
                react_1.default.createElement(antd_1.Input, null)),
            react_1.default.createElement(antd_1.Form.Item, { name: "reason", label: "Reason", rules: [{ required: true, message: "Select a reason for moderation." }] },
                react_1.default.createElement(antd_1.Radio.Group, { buttonStyle: "solid" }, Object.keys(ModerationMap_1.default).map((k, i) => (react_1.default.createElement(antd_1.Radio.Button, { value: k, key: i }, k))))),
            react_1.default.createElement(antd_1.Form.Item, { name: "verified", valuePropName: "checked" },
                react_1.default.createElement(antd_1.Checkbox, null, "Verified Host")),
            react_1.default.createElement(antd_1.Form.Item, { style: { float: "right" } },
                react_1.default.createElement(antd_1.Button, { type: "default", htmlType: "submit", onClick: () => setType("Warn") }, "Warn"),
                react_1.default.createElement(antd_1.Button, { type: "primary", htmlType: "submit", danger: true, onClick: () => setType("Ban") }, "Ban"),
                react_1.default.createElement(antd_1.Button, { type: "link", htmlType: "reset" }, "Clear")))));
};
exports.default = ModForm;
function generateModerationString(type, id, reason, verified) {
    if (type === "Ban") {
        return `?ban ${id} ${ModerationMap_1.default[reason]} If you wish to appeal this ban, go to https://www.pogoraiders.gg/appeal`;
    }
    if (type === "Warn") {
        const verifiedString = verified
            ? "Your Verified Host Status will be reviewed as a result of this warning."
            : "";
        return `?warn ${id} ${ModerationMap_1.default[reason]} ${verifiedString}`;
    }
    return "ERROR";
}
//# sourceMappingURL=ModForm.js.map