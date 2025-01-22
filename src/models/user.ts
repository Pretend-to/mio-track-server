import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public userId!: number; // 将 id 替换为 userId
  public email!: string;
  public password!: string;
  public createdAt!: Date;
}

User.init(
  {
    userId: { // 将 userId 设置为主键
      type: DataTypes.INTEGER,
      primaryKey: true, // 这里设置为主键
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;