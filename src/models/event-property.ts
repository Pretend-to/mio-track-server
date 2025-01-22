import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Event from './event';


class EventProperty extends Model {
    public id!: number;
    public eventId!: number;
    public propertyKey!: string;
    public propertyValue!: string;
}
EventProperty.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Event,
                key: 'id',
            },
        },
        propertyKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        propertyValue: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'EventProperty',
        tableName: 'event_properties',
    }
);

export default EventProperty;