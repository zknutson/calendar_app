import { Sequelize, DataTypes } from 'sequelize';
import sqlite3 from 'sqlite3';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: './data/events.db'
});

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idea: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'events',
    timestamps: false
});

export const handler = async (event, context) => {
    await sequelize.sync();
    const body = JSON.parse(event.body);

    try {
        const newEvent = await Event.create({
            name: body.name,
            date: body.date,
            time: body.time,
            idea: body.idea
        });
        return {
            statusCode: 201,
            body: JSON.stringify({
                status: 'Event added',
                event: newEvent
            })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: 'Error',
                message: error.message
            })
        };
    }
};