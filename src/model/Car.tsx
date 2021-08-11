import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class Car{
    private static instance: Car;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('Car',{
            'AutoNo':{
                'type' : DataTypes.INTEGER,
                'defaultValue' :'',
                'primaryKey':true
            },
            'PlateNo':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'VehicleWeight':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'CarOwner':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Comment':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Valid':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'WeightUnit':{
                'type':DataTypes.STRING,
                'defaultValue':''
            }
        },{
            'tableName':'Car',
            'timestamps':false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new Car();
        }
        return this.instance;
    }
}
export {Car};