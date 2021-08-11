import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const path = require('path');
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
     storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}
class Settings{
    private static instance: Settings;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('Settings',{
            'id':{
                'type' : DataTypes.INTEGER,
                'defaultValue': '',
                'primaryKey':true
              },
              'key':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'value':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'name':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              },
              'isReadOnly':{
                  'type' : DataTypes.STRING,
                  'defaultValue': ''
              }
              }, {
                'tableName':'Settings',
                'timestamps': false
            }
        );
    }
    public static getInstance(){
        if(!this.instance){
            console.log(this.instance)
            this.instance = new Settings();
        }
        return this.instance;
    }
}

export {Settings};