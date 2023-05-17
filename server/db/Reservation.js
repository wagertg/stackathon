const conn = require("./conn");
const { STRING, BOOLEAN, UUID, UUIDV4 } = conn.Sequelize;

const Reservation = conn.define("reservation", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  isRes: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Reservation;
