const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://1204210132:Yoganteng69@cluster0.1mj5kls.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Eror Coneccting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user")
const Order = require("./models/order")
const Products = require("./models/product")

//function send
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yogaprayoga272@gmail.com",
      pass: "fqtbszpvjqyvifrd"
    }
  })

  // Compose the email message
  const mailOptions = {
    from: "Sayoor.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://92.168.43.151:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};


// Register a new user
// ... existing imports and setup ...

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Jika email telah terdaftar 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
}

const secretKey = generateSecretKey();

//login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});




//get user
app.get("/get-user", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the posts" });
  }
});

app.get("/search-products", async (req, res) => {
  try {
    const { key, limit, page } = req.query
    const skip = (page - 1) * limit
    const search = key ? {
      "$or": [
        { name: { $regex: key } },
        { deskripsi: { $regex: key} },
      ]
    } : {}
    const data = await Products.find(search).populate("harga").skip(skip).limit(limit)
    res.json({ data })
  } catch (err) {
    console.log(err)
  }
})


app.get("/get-products", async (req, res) => {
  try {
    const products = await Products.find();


    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the posts" });
  }
});





// //endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});



//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});


//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      harga: item.harga,
      image: item.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.put("/profileupdate/:userId", async (req, res) => {
  const userId = req.params.userId;
  User.findByIdAndUpdate(userId, {
    name: req.body.name,
    email: req.body.email,
  }).then(user => res.json(user))
    .catch(err => res.json(err))
})




app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" })
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
})

