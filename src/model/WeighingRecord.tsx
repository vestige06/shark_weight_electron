import { Sequelize, DataTypes, Model,Options } from 'sequelize';

const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class WeighingRecord{
    private static instance: WeighingRecord;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('WeighingRecord',{
            'AutoNo':{
                'type' : DataTypes.INTEGER,
                'defaultValue': '',
                'primaryKey':true
              },
              'Bh':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Kh':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Kh2':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Kh3':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Ch':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Wz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Mz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': '',
                  set(value:any){
                        this.setDataValue('Mz',isNaN(value)?0:value);  
                  }
              },
              'Mzrq':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Mzsby':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Pz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': '',
                  set(value:any){
                    this.setDataValue('Pz',isNaN(value)?0:value);  
                  }
              },
              'Pzrq':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Pzsby':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Jz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': '',
                  set(value:any){
                    this.setDataValue('Jz',isNaN(value)?0:value);  
                  }
              },
              'Jzrq':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Kz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Kl':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Sz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Bz':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'ICCard':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'By1':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'By2':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'By3':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'By4':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'By5':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'WeighingTimes':{
                  'type' : DataTypes.INTEGER,
                  'defaultValue': ''
              },
              'WeighingFormTemplate':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'IsFinish':{
                  'type' : DataTypes.BOOLEAN,
                  'defaultValue': ''
              },
              'Valid':{
                  'type' : DataTypes.BOOLEAN,
                  'defaultValue': ''
              },
              'WeightUnit':{
                'type' : DataTypes.STRING,
                'defaultValue': ''
            },
            }, {
                'tableName':'WeighingRecord',
                'timestamps': false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new WeighingRecord();
        }
        return this.instance;
    }
    public static test(callback:Function){
        // console.log((async ()=>await this.getInstance()._ins.query("select * from User"))().then());
    }
}

export{WeighingRecord};