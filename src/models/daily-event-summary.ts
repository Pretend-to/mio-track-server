import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Project from './project';



class DailyEventSummary extends Model {
  public date!: Date;
  public eventName!: string;
  public eventCount!: number;
  public  projectId!:number;
 public  createdAt!: Date;
}
DailyEventSummary.init(
  {
    date: {
        type: DataTypes.DATE,
           primaryKey: true,
           allowNull: false,
    },
     projectId: {
        type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
          references: {    // 外键约束
              model: Project,
              key: 'id',
          },
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
         primaryKey: true,
    },
    eventCount: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
  },
  {
    sequelize,
    modelName: 'DailyEventSummary',
    tableName: 'daily_event_summary',
      timestamps: false
  }
);

export default DailyEventSummary;