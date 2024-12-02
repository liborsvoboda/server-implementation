"use strict";
/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ExecutionEnvironment_1 = __importDefault(require("@docusaurus/ExecutionEnvironment"));
var languagesInSubfolders = ['java', 'dotnet', 'python'];
function parsePath(path) {
    var e_1, _a;
    try {
        for (var languagesInSubfolders_1 = __values(languagesInSubfolders), languagesInSubfolders_1_1 = languagesInSubfolders_1.next(); !languagesInSubfolders_1_1.done; languagesInSubfolders_1_1 = languagesInSubfolders_1.next()) {
            var language = languagesInSubfolders_1_1.value;
            if (path.startsWith("/".concat(language, "/"))) {
                return { path: path.substring("/".concat(language).length), language: language };
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (languagesInSubfolders_1_1 && !languagesInSubfolders_1_1.done && (_a = languagesInSubfolders_1["return"])) _a.call(languagesInSubfolders_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { path: path, language: 'node' };
}
function sendAnalyticsEvent() {
    var _a = parsePath(window.location.pathname), path = _a.path, language = _a.language;
    var hash = window.location.hash ? window.location.hash.substring(1) : '';
    var payload = new URLSearchParams({
        hash: hash,
        path: path,
        language: language
    });
    fetch("https://playwright-analytics.azurewebsites.net/api/impression?".concat(payload.toString()))["catch"](function () { });
}
exports["default"] = (function () {
    if (!ExecutionEnvironment_1["default"].canUseDOM) {
        return null;
    }
    sendAnalyticsEvent();
    return {
        onRouteUpdate: function () {
            sendAnalyticsEvent();
        }
    };
})();
