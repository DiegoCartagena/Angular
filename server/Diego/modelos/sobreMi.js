"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sobreMi = void 0;
const mongoose_1 = require("mongoose");
const sobreMiSchema = new mongoose_1.Schema({
    titulo: {
        type: String
    },
    texto1: {
        type: String,
    },
    texto2: {
        type: String,
    },
    texto3: {
        type: String,
    },
    texto4: {
        type: String,
    },
    texto5: {
        type: String,
    },
});
exports.sobreMi = mongoose_1.model("sobreMi", sobreMiSchema);
