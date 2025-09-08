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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../db/users/users");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = Number(req.query.pageNumber) || 0;
    const pageSize = Number(req.query.pageSize) || 100;
    const includeAddresses = req.query.includeAddresses === 'true';
    if (pageNumber < 0 || pageSize < 1) {
        res.status(400).send({ message: "Invalid page number or page size" });
        return;
    }
    try {
        let users;
        if (includeAddresses) {
            users = yield (0, users_1.getUsersWithAddresses)(pageNumber, pageSize);
        }
        else {
            users = yield (0, users_1.getUsers)(pageNumber, pageSize);
        }
        res.send(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Error fetching users" });
    }
}));
router.get("/with-addresses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageNumber = Number(req.query.pageNumber) || 0;
    const pageSize = Number(req.query.pageSize) || 100;
    if (pageNumber < 0 || pageSize < 1) {
        res.status(400).send({ message: "Invalid page number or page size" });
        return;
    }
    try {
        const users = yield (0, users_1.getUsersWithAddresses)(pageNumber, pageSize);
        res.send(users);
    }
    catch (error) {
        console.error("Error fetching users with addresses:", error);
        res.status(500).send({ message: "Error fetching users with addresses" });
    }
}));
router.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield (0, users_1.getUsersCount)();
    res.send({ count });
}));
exports.default = router;
