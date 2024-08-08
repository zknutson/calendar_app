const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
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

module.exports.handler = async () => {
    await sequelize.sync();
    const events = await Event.findAll();
    return {
        statusCode: 200,
        body: JSON.stringify(events)
    };
};