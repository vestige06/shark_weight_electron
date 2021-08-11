import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class ICCard{
    private static instance: ICCard;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('ICCard',{
            'AutoNo':{
                'type' : DataTypes.INTEGER,
                'defaultValue' :'',
                'primaryKey':true
            },
            'Id':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'CustomerId':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'GoodssId':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'CarAutoNo':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'By1':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'By2':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'By3':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'By4':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'By5':{
                'type':DataTypes.STRING,
                'defaultValue':''
            }
        },{
            'tableName':'ICCard',
            'timestamps':false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new ICCard();
        }
        return this.instance;
    }
}
export {ICCard};