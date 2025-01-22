import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Project from './project';
import User from './user';
import Device from './device'; // 引入 Device 模型

class Event extends Model {
  public id!: number;
  public eventName!: string;
  public eventType!: string;   // 新增事件类型
  public createdAt!: Date;
  public projectId!: number;
  public userId!: number;
  public referrerUrl!: string | null;  // 新增来源URL
  public currentUrl!: string | null;  // 新增当前URL
    public deviceId!: number | null;          //  新增device外键
}
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType: {       // 新增事件类型
      type: DataTypes.STRING,
      allowNull: true, // 可以为空
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'id',
      },
    },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
      referrerUrl: {      // 新增来源URL
          type: DataTypes.TEXT,
          allowNull: true, // 可以为空
        },
        currentUrl: {       // 新增当前URL
          type: DataTypes.TEXT,
          allowNull: true, // 可以为空
        },
      deviceId: {         // device 外键
          type: DataTypes.INTEGER,
           allowNull: true,
           references: {
               model: Device,
               key: 'id',
           }
      }
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
  }
);

export default Event;