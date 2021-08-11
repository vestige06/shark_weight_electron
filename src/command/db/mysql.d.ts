declare class Mysql {
    instance: any;
    constructor(options?: {
        host: string;
        user: string;
        password: string;
        database: string;
    });
    getInstance(options?: {
        host: string;
        user: string;
        password: string;
        database: string;
    }): any;
    query(sql?: string): Promise<unknown>;
    where(sql?: string): void;
    getOne(sql: string | undefined, callback: any): void;
    getAll(sql: string | undefined, callback: any): void;
    addSqlConcat(data: any): {
        field: string;
        value: string;
    };
    addOne(table?: string, data?: never[]): Promise<unknown>;
}
export { Mysql };
