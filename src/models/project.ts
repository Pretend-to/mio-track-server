import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Project extends Model {
    public id!: number;
    public projectName!: string;
    public projectUuid!: string;
    public domains!: string;  // 新增的 domains 字段，存储域名列表的 JSON 字符串
    public createdAt!: Date;
    public userId!: number;
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectUuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        domains: {    // 新增的 domains 字段
            type: DataTypes.TEXT,
            allowNull: true,  //  允许为空，表示没有设置域名白名单
            defaultValue: '[]', // 设置默认值为 `[]`，表示默认的域名白名单为空
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
    }
);

export default Project;