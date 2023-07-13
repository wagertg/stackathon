const conn = require("./conn");
const User = require("./User");
const Flight = require("./Flight");
const Reservation = require("./Reservation");
const LineItem = require("./LineItem");

// This establishes the relationships between models, setting up database relationships, and seeding the database

Reservation.belongsTo(User);
LineItem.belongsTo(Reservation);
Reservation.hasMany(LineItem);
LineItem.belongsTo(Flight);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: "moe",
      password: "123",
      avatar: "https://api.dicebear.com/6.x/thumbs/svg?seed=moe",
    }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);
  const [moon] = await Promise.all([
    Flight.create({
      destination: "Moon",
      description:
        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      distance: "384,400 km",
      travel: "3 days",
      date: "May 10th, 2023",
      price: "500000.00",
      image: "static/images/moon.png",
    }),
  ]);
  const [mars] = await Promise.all([
    Flight.create({
      destination: "Mars",
      description:
        "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      distance: "225 mil. km",
      travel: "9 months",
      date: "June 14th, 2023",
      price: "1000000.00",
      image: "static/images/mars.png",
    }),
  ]);
  const [europa] = await Promise.all([
    Flight.create({
      destination: "Europa",
      description:
        "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      distance: "628 mil. km",
      travel: "3 years",
      date: "August 2nd, 2023",
      price: "750000.00",

      image: "static/images/europa.png",
    }),
  ]);
  const [titan] = await Promise.all([
    Flight.create({
      destination: "Titan",
      description:
        "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      distance: "1.6 bil. km",
      travel: "7 years",
      date: "September 23rd, 2023",
      price: "1500000.00",

      image: "static/images/titan.png",
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
    },
    flights: {
      moon,
      mars,
      europa,
      titan,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Flight,
};
