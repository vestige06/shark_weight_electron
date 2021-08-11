const Mysql = require('./mysql.js');
class SharkIvsResult extends Mysql{
    constructor(options = {host: 'localhost',user: 'root',password: 'root',database: 'shark'}){
        super(options);
    }
    //receive : data = {} # JSON OBJECT CASCADE ADD
    add(insertData:any){
        var InsertData = this.beforeAdd(insertData);
        var SharkIvsResultData = InsertData.SharkIvsResultData;
        super.addOne('shark_ivsresult',SharkIvsResultData)
        .then((data:any) => {
            var SharkIvsResultPlateResult = InsertData.SharkIvsResultPlateResult;
            var data2 = Object.assign(SharkIvsResultPlateResult, {'ivsresult_id':data.result.insertId});
            super.addOne('shark_ivsresult_plateresult',data2)
            .then((data:any) => {
                var SharkIvsResultPlateResultId = data.result.insertId;
                var SharkIvsResultPlateResultCarBrand = InsertData.SharkIvsResultPlateResultCarBrand;
                var data3 = Object.assign(SharkIvsResultPlateResultCarBrand, {'shark_ivsresult_PlateResult_id':SharkIvsResultPlateResultId});
                super.addOne('shark_ivsresult_plateresult_car_brand',data3)
                .then((data:any) => {
                    var SharkIvsResultPlateResultCarLocation = InsertData.SharkIvsResultPlateResultCarLocation;
                    SharkIvsResultPlateResultCarLocation.RECT = JSON.stringify(SharkIvsResultPlateResultCarLocation.RECT);
                    var data4 = Object.assign(SharkIvsResultPlateResultCarLocation, {'shark_ivsresult_PlateResult_id':SharkIvsResultPlateResultId});
                    super.addOne('shark_ivsresult_plateresult_car_location',data4)
                    .then((data:any) => {
                        var SharkIvsResultPlateResultLocation = InsertData.SharkIvsResultPlateResultLocation;
                        SharkIvsResultPlateResultLocation.RECT = JSON.stringify(SharkIvsResultPlateResultLocation.RECT);
                        var data5 = Object.assign(SharkIvsResultPlateResultLocation, {'shark_ivsresult_PlateResult_id':SharkIvsResultPlateResultId});
                        super.addOne('shark_ivsresult_plateresult_location',data5)
                        .then((data:any) => {
                            var SharkIvsResultPlateResultTimestamp = InsertData.SharkIvsResultPlateResultTimestamp;
                            SharkIvsResultPlateResultTimestamp.Timeval = JSON.stringify(SharkIvsResultPlateResultTimestamp.Timeval);
                            var data6 = Object.assign(SharkIvsResultPlateResultTimestamp, {'shark_ivsresult_PlateResult_id':SharkIvsResultPlateResultId});
                            super.addOne('shark_ivsresult_plateresult_timestamp',data6)
                            .then((data:any) => {
                                console.log('Finally');
                            });
                        })
                    })
                })
            })  
        });
    }
    beforeAdd(data:any){
        data = JSON.parse(data);
        var location = data.PlateResult.location;
        var car_location = data.PlateResult.car_location;
        var car_brand = data.PlateResult.car_brand;
        var timeStamp = data.PlateResult.timeStamp;
        delete data.PlateResult.location;
        delete data.PlateResult.car_location;
        delete data.PlateResult.car_brand;
        delete data.PlateResult.timeStamp;
        return {
            'SharkIvsResultData': {
                'active_id':data.active_id,
                'clipImgSize':data.clipImgSize,
                'cmd':data.cmd,
                'fullImgSize':data.fullImgSize,
                'ivsresult_id':data.id,
                'imageformat':data.imageformat,
                'timeString':data.timeString,
            },
            'SharkIvsResultPlateResult':data.PlateResult,
            'SharkIvsResultPlateResultCarBrand':car_brand,
            'SharkIvsResultPlateResultCarLocation':car_location,
            'SharkIvsResultPlateResultLocation':location,
            'SharkIvsResultPlateResultTimestamp':timeStamp
        }
    }
}
module.exports = SharkIvsResult;
// var data = {
//     "PlateResult":{
//         "bright":0,
//         "carBright":0,
//         "carColor":0,
//         "car_brand":{
//             "brand":255,
//             "type":255,
//             "year":65535
//         },
//         "car_location":{
//             "RECT":{
//                 "bottom":1295,
//                 "left":561,
//                 "right":1635,
//                 "top":760
//             }
//         },
//         "colorType":1,
//         "colorValue":0,
//         "confidence":100,
//         "direction":4,
//         "enable_encrypt":0,
//         "fake_plate":0,
//         "featureCode":true,
//         "license":"��AF0236",
//         "location":{
//             "RECT":{
//                 "bottom":1119,
//                 "left":868,
//                 "right":1328,
//                 "top":1005
//             }
//         },
//         "plate_distance":0,
//         "plate_true_width":0,
//         "timeStamp":{
//             "Timeval":{
//                 "sec":1621927011,
//                 "usec":653645
//             }
//         },
//         "timeUsed":135,
//         "triggerType":8,
//         "type":1
//     },
//     "active_id":0,
//     "clipImgSize":0,
//     "cmd":"ivs_result",
//     "fullImgSize":0,
//     "id":132,
//     "imageformat":"jpg",
//     "timeString":"2021-05-25 15:16:51"
// };
// var SharkIvsResultData = {
//     "active_id":0,
//     "clipImgSize":0,
//     "cmd":"ivs_result",
//     "fullImgSize":0,
//     "ivsresult_id":132,
//     "imageformat":"jpg",
//     "timeString":"2021-05-25 15:16:51"
// };


