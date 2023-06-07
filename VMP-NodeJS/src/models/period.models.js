import { DataTypes } from 'sequelize';
import db from '../config/config.db.js';

export const Period = db.define(
  'period',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    scenario_id: { type: DataTypes.INTEGER },
    period: { type: DataTypes.INTEGER },
  },
  { tableName: 'Period', timestamps: false },
);
