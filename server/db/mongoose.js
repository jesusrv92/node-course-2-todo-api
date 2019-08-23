"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This one doesn't use import from structure because it makes the Promise property read-only
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});
exports.default = mongoose;
