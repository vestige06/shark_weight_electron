import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class Customer{
    private static instance: Customer;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('Role',{
            'Id':{
                'type' : DataTypes.INTEGER,
                'defaultValue' :'',
                'primaryKey':true
            },
            'Num':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Name':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Type':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Manager':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Phone':{
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
            }
        },{
            'tableName':'Customer',
            'timestamps':false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new Customer();
        }
        return this.instance;
    }
}
export {Customer};