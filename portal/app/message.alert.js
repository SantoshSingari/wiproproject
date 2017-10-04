"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageAlert = (function () {
    function MessageAlert() {
    }
    MessageAlert.prototype.showErrorMsg = function (severity, message, msgs) {
        msgs = [];
        msgs.push({ severity: severity, summary: message });
        setTimeout(function () {
            msgs = [];
        }, 2000);
    };
    return MessageAlert;
}());
exports.MessageAlert = MessageAlert;
//# sourceMappingURL=message.alert.js.map