import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Project from './project';


class DailyActiveUser extends Model {
  public date!: Date;
  public projectId!: number;
  public activeCount!: number;
   public createdAt!: Date;
}
DailyActiveUser.init(
  {
      date: {
          type: DataTypes.DATE,
          allowNull: false,
           primaryKey: true, // 设置主键
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
          primaryKey: true, // 设置主键
          references: {    // 外键约束
              model: Project,
              key: 'id',
            },
      },
    activeCount: {
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
    modelName: 'DailyActiveUser',
    tableName: 'daily_active_users',
    timestamps: false
  }
);

export default DailyActiveUser;