/// <reference types="node" />
declare class Transcoder {
    constructor();
    cmdSend(socket: any, cmd?: string, packId?: number, isKeepAlive?: number, headerSize?: number, afterCall?: () => void): void;
    decode(buffer: Buffer, encoding?: string): {
        packId: number;
        packLen: number;
        packType: number;
        header: Buffer;
        body: Buffer;
        bodyStr: string;
        bodyJson: any;
    } | undefined;
    encrype(cmd: number | undefined, data: Buffer): {
        length: number;
        b64content: string;
    };
    iterateTcpPack(data: Buffer, callback: any): void;
    binaryToStr(str: string): string;
    processTcpPack(data: Buffer): void;
    arrayBufferToBase64(buffer: Buffer): string;
    saveImage(data: Buffer, path?: string): void;
}
export { Transcoder };
