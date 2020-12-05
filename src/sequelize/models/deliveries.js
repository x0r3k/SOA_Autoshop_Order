module.exports = (sequelize, DataType) => {
  const deliveriesTable = sequelize.define('deliveries', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataType.ENUM('Courier', 'Store_Pickup', 'Mail_Pickup'),
      allowNull: false,
    },
    city: {
      type: DataType.STRING(50),
      allowNull: false
    },
    street: {
      type: DataType.STRING(50),
      allowNull: false
    },
    house_number: {
      type: DataType.STRING(10),
      allowNull: false,
    },
    appartment_number: {
      type: DataType.STRING(10),
      allowNull: true,
    },
    shipping_price: {
      type: DataType.FLOAT(5,2),
      allowNull: false
    },
    fkOrderId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });

  deliveriesTable.associate = (models) => {
    deliveriesTable.hasMany(models.orders, 
      { foreignKey: { name: 'fkOrderId', allowNull: false }, foreignKeyConstraint: true}
    );
  }

  return deliveriesTable;
};