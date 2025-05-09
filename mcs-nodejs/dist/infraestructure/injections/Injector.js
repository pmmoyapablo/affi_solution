"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const RepositoryMySql_js_1 = require("../../infraestructure/repositories/RepositoryMySql.js");
const RepositoryDummie_js_1 = require("../../infraestructure/repositories/RepositoryDummie.js");
class Injector {
    constructor() {
        this.container = new Map();
    }
    static getInstance() {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }
    setAdapters(adapter) {
        let repository;
        if (adapter === 'mysql') {
            repository = new RepositoryMySql_js_1.RepositoryMySql();
        }
        else if (adapter === 'dummies') {
            repository = new RepositoryDummie_js_1.RepositoryDummie();
        }
        else {
            throw new Error('Adapter no válido');
        }
        this.register('repository', repository);
    }
    register(key, value) {
        this.container.set(key, value);
    }
    resolve(key) {
        return this.container.get(key);
    }
}
exports.Injector = Injector;
