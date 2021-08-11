import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class SysField{
    private static instance: SysField;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('SysField',{
            'AutoNo':{
                'type' : DataTypes.INTEGER,
                'defaultValue' :'',
                'primaryKey':true
            },
            'FieldType':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'FieldValue':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Valid':{
                'type':DataTypes.STRING,
                'defaultValue':''
            }
        },{
            'tableName':'SysField',
            'timestamps':false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new SysField();
        }
        return this.instance;
    }
}
export {SysField};