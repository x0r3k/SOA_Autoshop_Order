module.exports = (sequelize, DataType) => {
  const transactionsTable = sequelize.define('transactions', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataType.ENUM('Online', 'Cash', 'Cheque'),
      allowNull: false,
    },
    status: {
      type: DataType.ENUM('New', 'Cancelled', 'Failed', 'Pending', 'Declined', 'Rejected', 'Success'),
      allowNull: false,
    },
    fkOrderId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });

  transactionsTable.associate = (models) => {
    transactionsTable.belongsTo(models.orders, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );
  }

  return transactionsTable;
};