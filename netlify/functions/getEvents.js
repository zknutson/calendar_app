import { Sequelize, DataTypes } from 'sequelize';
import sqlite3 from 'sqlite3';
import * as path from "node:path";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: path.resolve('data/events.db')
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

export const handler = async () => {
    await sequelize.sync();
    const events = await Event.findAll();
    return {
        statusCode: 200,
        body: JSON.stringify(events)
    };
};