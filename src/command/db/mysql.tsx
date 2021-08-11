const mysql = require('mysql');

class Mysql{
    instance:any;
    constructor(options = {host: 'localhost',user: 'root',password: 'root',database: 'shark'}){
        this.instance = mysql.createConnection(options);
        this.instance.connect();
    }

    getInstance(options?:{host: string,user: string,password: string,database: string}){
        if(this.instance == null){
            this.instance = new Mysql(options);
        }
        return this.instance;
    }

    query(sql = '') {
        var instance = this.getInstance();
        var wrapQuery = new Promise((resolve,reject) => {
            instance.query(sql,function(error:string,results:any,fields:any){
                if(error){
                    reject(error);
                }
                resolve({'result':results,'fields':fields});
            });
        });
        return wrapQuery;
    }
    
    where(sql = ''){

    }

    getOne(sql = '',callback:any){
        this.query(sql).then(function(data:any) {
            callback(data.result[0],data.fields);   
        });
    }
    getAll(sql = '',callback:any){
        this.query(sql).then(function(data:any) {
            callback(data.result,data.fields);   
        });
    }

    addSqlConcat(data:any){
        var field_sql = '(';
        var value_sql = '(';
        var n = 0;
        for(var i in data){
            if(n == 0){
                field_sql += i;
                value_sql +=  "'"+data[i]+"'";
            }
            else{
                field_sql = field_sql + ","+i;
                value_sql = value_sql + "," + "'"+data[i]+"'";
            }
            n++;
        }
        field_sql = field_sql+")";
        value_sql = value_sql+")";
        return {'field':field_sql,'value':value_sql};
    }
    // data is key:value array
    addOne(table = '',data = []){
        var sql = "insert into "+table;
        var concatSql = this.addSqlConcat(data);
        sql = sql + " " + concatSql['field'] + " " + "VALUES "+ concatSql['value'];
        return this.query(sql);
    }

}
export {Mysql};
// var a = new Mysql();
// // a.getOne('select * from shark_ivsresult',function(data,fields){
// //     console.log(data);
// //     // resolve(data);
// // });

// a.addOne('shark_ivsresult',{'active_id': 1,'clipImgSize': 3},function(data,fields){
//         console.log(data);
// });


