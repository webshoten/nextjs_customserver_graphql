"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../db/model");
class ToDo {
    db;
    constructor(db) {
        this.db = db;
    }
    getToDos = async () => {
        const res = await this.db
            .select()
            .from(model_1.todo);
        return res;
    };
}
exports.default = ToDo;
