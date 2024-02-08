const { ROLE } = require("./config/roles");
const Provider = require("./models/provider");
const Service = require("./models/services");
const User = require("./models/users");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const firstName = [
  "Aarav",
  "Nisha",
  "Rohan",
  "Priya",
  "Aditya",
  "Ananya",
  "Vikram",
  "Aisha",
  "Rahul",
  "Meera",
  "Abhijeet",
];
const lastName = [
  "Patel",
  "Sharma",
  "Gavali",
  "Gupta",
  "Khan",
  "Singh",
  "Kumar",
  "Das",
  "Choudhury",
  "Reddy",
  "Joshi",
];
(async () => {
  await mongoose.connect(process.env.MONGO_URL ?? "");
  const services = await Service.find();
  services.forEach((ser) => {
    Array(5)
      .fill(0)
      .map(async (id) => {
        const password = await bcrypt.hash(
          firstName[Math.floor(Math.random() * 10)] +
            lastName[Math.floor(Math.random() * 10)] +
            "#2024",
          10,
        );
        console.log(password);
        const user = await User.create({
          profilePhoto: "",
          firstName: firstName[Math.floor(Math.random() * 10)],
          lastName: lastName[Math.floor(Math.random() * 10)],
          password,
          email: "mr.abhijeetgavali+" + ser._id + "" + id + "@gmail.com",
          isVerified: true,
          role: ROLE.PROVIDER,
        });
        const provider = await Provider.create({
          userId: user._id,
          serviceId: ser._id,
          service_description: [
            "Reliable home serviceman dedicated to delivering top-notch repairs for all your home appliances. With years of experience and a commitment to quality craftsmanship, I ensure efficient solutions to keep your household running smoothly. Trust in my expertise for expert maintenance and repairs that exceed expectations.",
            "Your go-to home service expert, specializing in fixing appliances to perfection. Count on me for seamless repairs and unmatched reliability.",
            "Bringing excellence to your doorstep, I'm the trusted name in home appliance repairs. Experience top-tier service and lasting solutions for your peace of mind.",
            "Home service wizard at your service! Offering premium repairs for all your appliance woes. Let me handle the hard work while you enjoy hassle-free living.",
            "With a passion for precision and a knack for problem-solving, I'm here to tackle all your home appliance repair needs. Expect nothing but the best from my skilled hands.",
            "Don't let appliance malfunctions disrupt your day. I'm here to provide expert solutions and restore functionality to your home with efficiency and care.",
            "Your friendly neighborhood repair guru, dedicated to reviving your home appliances with finesse. Trust in my expertise for unparalleled service and satisfaction.",
            "From faulty fridges to temperamental toasters, I've got you covered. Experience the difference with my meticulous approach and unwavering commitment to excellence.",
            "Home repair superhero at your service! With a toolbox full of solutions, I'm here to rescue your appliances and restore harmony to your household.",
            "Say goodbye to appliance headaches with my reliable repair services. Sit back, relax, and let me handle everything with precision and professionalism.",
            "When it comes to home appliance repairs, I don't just meet expectations – I exceed them. Choose quality, choose reliability, choose me for all your repair needs.",
          ][Math.floor(Math.random() * 10)],
          payment_mode: [
            "COD",
            "ONLINE",
            "BANK TRANSFER",
            "PAYTM",
            "GPAY",
            "CARD",
          ][Math.floor(Math.random() * 10) % 5],
          total_customers: Math.floor(Math.random() * 10),
          rating: Math.floor(Math.random() * 10) % 5,
          cost: Math.floor(Math.random() * 1000) % 500,
          location: [
            "PUNE",
            "MUMBAI",
            "LATUR",
            "DHULE",
            "THANE",
            "NANDURBAR",
            "NAGPUR",
            "SANGLI",
            "SATARA",
            "SOLAPUR",
            "DOMBIVLI",
          ][Math.floor(Math.random() * 10)],
        });
      });
  });
})();
