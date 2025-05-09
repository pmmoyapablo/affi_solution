import { IRepository } from "../../models/IRepository.js";
import { RepositoryMySql } from '../../infraestructure/repositories/RepositoryMySql.js';
import { RepositoryDummie } from '../../infraestructure/repositories/RepositoryDummie.js';

export class Injector {
    private static instance: Injector;
    private container: Map<string, any>;

    private constructor() {
        this.container = new Map();
    }

    public static getInstance(): Injector {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }

    public setAdapters(adapter: string): void {

        let repository: IRepository | undefined;
        
        if (adapter === 'mysql') {
            repository = new RepositoryMySql();
        }
        else if (adapter === 'dummies') {
            repository = new RepositoryDummie();
        }
        else {
            throw new Error('Adapter no válido');
        }

        this.register('repository', repository);
    }

    private register(key: string, value: any): void {
        this.container.set(key, value);
    }
    
    public resolve<T>(key: string): T {
        return this.container.get(key);
    }
}