/// <reference types="node" />
declare var net: any;
declare const decode: any;
declare var transcoder: any;
declare var Signature: any;
declare var iconv: any;
declare var options: {
    host: string;
    port: number;
};
declare var socket: any;
declare var trans: any;
declare var signature: any;
declare var sendKeepAlive: (socket: any) => void;
declare var encryptScreen: (cmd?: string, dataLength?: string, data?: string, crc?: string) => string;
declare var encrype: (cmd?: number, data?: string) => Buffer;
declare function sleep(ms: any): Promise<unknown>;
declare function main(): Promise<void>;
declare function main2(): Promise<void>;
declare function main3(): Promise<void>;
declare function main4(): Promise<void>;
declare function main5(): Promise<void>;
