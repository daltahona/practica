import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { User } from "./User"; // Importa el modelo de User

export class Assistance extends Model {
  public id!: number;
  public date_input!: string;
  public user_id!: number;
  public estado!: boolean;
}

export interface AssistanceI {
  id: number;
  date_input: string;
  user_id: number;
  estado?: boolean;
}

Assistance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_input: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto no está oculto
  },
  },
  {
    tableName: "assistance",
    sequelize: database,
    timestamps: false,
  }
);

Assistance.belongsTo(User, { foreignKey: "user_id", as: "user" });