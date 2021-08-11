declare const Mysql: any;
declare class SharkIvsResult extends Mysql {
    constructor(options?: {
        host: string;
        user: string;
        password: string;
        database: string;
    });
    add(insertData: any): void;
    beforeAdd(data: any): {
        SharkIvsResultData: {
            active_id: any;
            clipImgSize: any;
            cmd: any;
            fullImgSize: any;
            ivsresult_id: any;
            imageformat: any;
            timeString: any;
        };
        SharkIvsResultPlateResult: any;
        SharkIvsResultPlateResultCarBrand: any;
        SharkIvsResultPlateResultCarLocation: any;
        SharkIvsResultPlateResultLocation: any;
        SharkIvsResultPlateResultTimestamp: any;
    };
}
