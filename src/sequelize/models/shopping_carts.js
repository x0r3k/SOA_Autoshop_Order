module.exports = (sequelize, DataType) => {
  const shoppingCartsTable = sequelize.define('shopping_carts', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    fkUserId: {
      type: DataType.INTEGER,
      allowNull: false,
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
        fields: ['fkUserId', 'fkProductId'],
      },
    ],
  });

  return shoppingCartsTable;
};