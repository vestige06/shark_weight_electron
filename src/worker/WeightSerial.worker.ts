
const ctx: any = self as any;
var tmpStableArr:any[] = new Array(20);
function Uint8ArrayToString(fileData:any){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
}
function getWeighing(data:any){
    return Uint8ArrayToString(data.reverse().slice(0,7));
}
function isSame(arr:any) {
    return Array.from(new Set(arr)).length === 1?true:false;
}

ctx.onmessage = function(event:any){
    let data = event.data;
    if(data.cmd === 'getWeighing'){
        let tmpData = getWeighing(data.data);
        ctx.postMessage({
            cmd:'getWeighing',
            data: tmpData
        });
        tmpStableArr.push(tmpData);
        tmpStableArr.shift();
    }else if(data.cmd == 'isSame'){
        let isTmpSame = isSame(tmpStableArr);
        ctx.postMessage({
            cmd:'isSame',
            isStable: isTmpSame,
            data: tmpStableArr[0]
        });
    }
}
    
export default null as any;