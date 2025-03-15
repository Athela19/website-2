import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./usersmodels.js"; // Pastikan path benar

const { DataTypes } = Sequelize;

const Video = db.define(
  "videos",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED, // Gunakan UNSIGNED jika ID selalu positif
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      onUpdate: "CASCADE", // Jika user diubah, update juga
      onDelete: "CASCADE", // Jika user dihapus, hapus videonya juga
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// **Hubungkan ke Users**
Users.hasMany(Video, { foreignKey: "userId", as: "videos" });
Video.belongsTo(Users, { foreignKey: "userId", as: "user" });

export default Video;
