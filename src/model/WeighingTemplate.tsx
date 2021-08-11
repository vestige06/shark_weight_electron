import { Sequelize, DataTypes, Model,Options } from 'sequelize';

const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class WeighingTemplate{
    private static instance: WeighingTemplate;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('WeighingTemplate',{
            'id':{
                'type' : DataTypes.INTEGER,
                'defaultValue': '',
                'primaryKey':true
              },
              'sheets':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'info':{
                'type' : DataTypes.STRING,
                'defaultValue': ''
              },
            }, {
                'tableName':'WeighingTemplate',
                'timestamps': false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new WeighingTemplate();
        }
        return this.instance;
    }
    public static test(callback:Function){
        // console.log((async ()=>await this.getInstance()._ins.query("select * from User"))().then());
    }
}

export{WeighingTemplate};