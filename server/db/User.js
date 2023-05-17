const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  avatar: {
    type: TEXT,
    get: function () {
      const prefix = "data:image/png;base64,";
      const data = this.getDataValue("avatar");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix)) {
        return data;
      }
      return `${prefix}${data}`;
    },
  },
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isRes = false;
  await cart.save();
  return cart;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.reservation.findOne({
    where: {
      userId: this.id,
      isRes: true,
    },
  });
  if (!cart) {
    cart = await conn.models.reservation.create({
      userId: this.id,
    });
  }
  cart = await conn.models.reservation.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.flight],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ flight, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.flightId === flight.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      reservationId: cart.id,
      flightId: flight.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ flight, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.flightId === flight.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.prototype.checkout = async function () {
  // use the createOrder method to convert the current cart to an order
  const reservation = await this.createOrder();

  // create a new cart for future purchases
  await this.getCart();

  return reservation;
};

User.prototype.getPastOrders = async function () {
  // find all orders for this user where isCart is false
  const pastOrders = await conn.models.reservation.findAll({
    where: {
      userId: this.id,
      isRes: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.flight],
      },
    ],
  });

  return pastOrders;
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
