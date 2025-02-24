const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });

const defineLogModel = (tableName) => {
    return sequelize.define(tableName, {
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        },
        query: {
            type: Sequelize.JSON,
            allowNull: true
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        duration: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userAgent: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        owner: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
};

const logRequest = (req, res, next) => {
    const start = Date.now();
    res.on('finish', async () => {
        const duration = Date.now() - start;
        const log = {
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            query: req.query,
            status: res.statusCode,
            duration: `${duration}ms`,
            userAgent: req.headers['user-agent'],
            ip: req.ip,
            owner: req.tokenDetails?.owner || 'anonymous'
        };

        const now = new Date();
        const tableName = `Log_${now.getFullYear().toString().slice(2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${Math.floor(now.getMinutes() / 30) * 30}`;
        const Log = defineLogModel(tableName);

        try {
            await Log.sync(); // Ensure the table is created
            await Log.create(log);
            // console.log('Log saved to database:', log);
        } catch (error) {
            console.error('Error saving log to database:', error);
        }
    });
    next();
};

module.exports = logRequest;