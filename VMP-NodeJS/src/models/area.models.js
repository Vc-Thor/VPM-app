import { DataTypes } from 'sequelize';
import db from '../config/config.db.js';
import { Project } from './project.models.js';

export const Area = db.define(
  'area',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    area: { type: DataTypes.STRING },
  },
  {
    tableName: 'Area',
    timestamps: false,
  },
);
Area.hasMany(Project, {
  foreignKey: 'area_id',
  sourceKey: 'id',
});
Project.belongsTo(Area, {
  foreignKey: 'area_id',
  targetKey: 'id',
});
