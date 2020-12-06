module.exports = (sequelize, DataType) => {
  const ordersTable = sequelize.define('orders', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataType.ENUM('New', 'Checkout', 'Paid', 'Failed', 'Shipped', 'Delivered', 'Returned', 'Complete'),
      allowNull: false,
    },
    promo: {
      type: DataType.STRING(20),
      allowNull: true,
    },
    product_total: {
      type: DataType.FLOAT(8,2),
      allowNull: false,
    },
    discount_total: {
      type: DataType.FLOAT(8,2),
      allowNull: false,
    },
    grand_total: {
      type: DataType.FLOAT(8,2),
      allowNull: false,
    },
    name: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    lastname: {
      type: DataType.STRING(30),
      allowNull: true,
    },
    fullname: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    mobile: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    receiver_name: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    receiver_lastname: {
      type: DataType.STRING(30),
      allowNull: true,
    },
    receiver_fullname: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    receiver_mobile: {
      type: DataType.STRING(20),
      allowNull: false,
    },
    fkUserId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });

  ordersTable.associate = (models) => {
    ordersTable.hasMany(models.order_carts, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );

    ordersTable.hasMany(models.transactions, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );

    ordersTable.hasMany(models.deliveries, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );
  }

  return ordersTable;
};