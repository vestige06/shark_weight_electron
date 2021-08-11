import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const path = require('path');
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}
class User{
    private static instance: User;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('User',{
            'UserId':{
                'type' : DataTypes.INTEGER,
                'defaultValue': '',
                'primaryKey':true
              },
              'UserName':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'UserRole':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'LoginId':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'LoginPwd':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'Valid':{
                  'type' : DataTypes.BOOLEAN,
                  'defaultValue': ''
              }
              }, {
                'tableName':'User',
                'timestamps': false
            }
        );
    }
    public static getInstance(){
        if(!this.instance){
            console.log(this.instance)
            this.instance = new User();
        }
        return this.instance;
    }
}

export {User};