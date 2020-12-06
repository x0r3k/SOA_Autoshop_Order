module.exports = (sequelize, DataType) => {
  const orderCartsTable = sequelize.define('order_carts', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataType.FLOAT(8,2),
      allowNull: false,
    },
    discount: {
      type: DataType.FLOAT(5,2),
      allowNull: true,
    },
    amount: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fkOrderId: {
      type: DataType.INTEGER,
      allowNull: false
    },
    fkProductId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['fkOrderId', 'fkProductId'],
      },
    ],
  });

  orderCartsTable.associate = (models) => {
    orderCartsTable.belongsTo(models.orders, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );
  }

  return orderCartsTable;
};