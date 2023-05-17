const conn = require("./conn");
const { DECIMAL, NUMBER, STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;

const Flight = conn.define("flight", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  destination: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  description: {
    type: TEXT,
  },
  distance: {
    type: STRING,
  },
  travel: {
    type: STRING,
  },
  date: {
    type: STRING,
  },
  price: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: STRING,
  },
});

module.exports = Flight;
