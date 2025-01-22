import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

class Session extends Model {
  public id!: number;
  public userId!: number;
  public sessionId!: string;
  public startTime!: Date;
  public endTime!: Date | null; // endtime 可以为空
}
Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
         type: DataTypes.DATE,
         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
       },
    endTime: {
       type: DataTypes.DATE,
           allowNull: true,
            },
  },
  {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
  }
);

export default Session;