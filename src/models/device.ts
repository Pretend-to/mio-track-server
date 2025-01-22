import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';


class Device extends Model {
 public id!: number;
 public os!: string;
 public browser!: string;
 public screenResolution!: string;
 public createdAt!: Date;
}
Device.init(
 {
   id: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true,
   },
   os: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   browser: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   screenResolution: {
     type: DataTypes.STRING,
     allowNull: true,
   },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
 },
 {
   sequelize,
   modelName: 'Device',
   tableName: 'devices',
 }
);

export default Device;