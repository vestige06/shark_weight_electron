declare class Serial {
    client: any;
    constructor(port?: string, options?: {
        baudRate: number;
        autoOpen: boolean;
    });
}
export { Serial };
