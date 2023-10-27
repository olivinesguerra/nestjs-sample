import { Table, Column, Model, PrimaryKey, DataType, AllowNull } from 'sequelize-typescript';

@Table
export class User extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public id;

    @AllowNull
    @Column({
        type: DataType.UUID,
    })
    public adminId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    type: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    isActive: boolean;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    accessToken: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    refreshToken: string;

}