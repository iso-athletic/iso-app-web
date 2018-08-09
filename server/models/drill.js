module.exports = (sequelize, DataTypes) => {
  const Drill = sequelize.define('Drill', {
    type: DataTypes.STRING,
    session_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  },{
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  Drill.associate = (models) => {
    Drill.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE',
    });
  };
  return Drill;
};