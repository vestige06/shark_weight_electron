import { Sequelize, DataTypes, Model,Options } from 'sequelize';
const Config:Options = {
    database: 'main',
    dialect: 'sqlite',
    storage: 'C:\\Apps\\shark_weight_electron\\data\\AWS.db'
}

class Role{
    private static instance: Role;
    _ins:Sequelize;
    _model:any;
    private constructor(){
        this._ins = new Sequelize(Config);
        this._model = this._ins.define('Role',{
            'RoleId':{
                'type' : DataTypes.INTEGER,
                'defaultValue' :'',
                'primaryKey':true
            },
            'RoleName':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'RolePermission':{
                'type':DataTypes.STRING,
                'defaultValue':''
            },
            'Valid':{
                'type':DataTypes.STRING,
                'defaultValue':''
            }
        },{
            'tableName':'Role',
            'timestamps':false
        });
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new Role();
        }
        return this.instance;
    }
}
export {Role};