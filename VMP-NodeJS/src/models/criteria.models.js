import { DataTypes } from 'sequelize';
import db from '../config/config.db.js';
import { Project } from './project.models.js';

export const Criteria = db.define(
  'criteria',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    criteria: { type: DataTypes.STRING },
  },
  { tableName: 'Criteria', timestamps: false },
);
Criteria.hasMany(Project, {
  foreignKey: 'criteria_id',
  sourceKey: 'id',
});
Project.belongsTo(Criteria, {
  foreignKey: 'criteria_id',
  targetKey: 'id',
});
