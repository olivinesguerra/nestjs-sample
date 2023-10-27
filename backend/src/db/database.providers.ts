import { Sequelize } from 'sequelize-typescript';
// import { Cat } from '../cats/cat.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 6379,
                username: 'root',
                password: 'password',
                database: 'test',
            });
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
        },
    },
];