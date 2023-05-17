const conn = require("./conn");
const { INTEGER, UUID, UUIDV4 } = conn.Sequelize;

const LineItem = conn.define("lineItem", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  flightId: {
    type: UUID,
    allowNull: false,
  },
  reservationId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = LineItem;
