const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8080;

// mongoose.connect(process.env.MONGODB_URL)
//     .then(()=>{
// console.log("Connected");
// }).catch((err)=>{
//     console.log(err);
// })
//comment
console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Add any other validation options as needed
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// const tutSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     }
// })
// const collection=new mongoose.model('your_database',tutSchema)

//  data=[{
//     name:"bhagya"
// }]
//collection.insertMany(data)

app.get("/", (req, res) => {
  res.send("Server is running");
});

//signup api

app.post("/SignUp", async (req, res) => {
  try {
    // console.log(req.body);
    const { email } = req.body;

    const result = await userModel.findOne({ email: email });

    if (result) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = new userModel(req.body);
      const save = await data.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//login api
app.post("/login", (req, res) => {
  let dataSend = {};
  try {
    //console.log(req.body)
    // const data1 = new productModel({name:"sham",category:'male',image:"",price:"1000",description:'male'});
    //       const save = await data1.save();
    const { email,password } = req.body;
    console.log("line 100",req.body);
    userModel
      .findOne({ email: email })
      .then((result) => {
        if(password===result.password){

        console.log("line 104",result);
        dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({
          message: "Login Successful",
          alert: true,
          data: dataSend,
        });
      }
      else{res.send({
        message: "Invalid Password",
        alert: false,
        data: {},
      });

      }
      })
      .catch((error) => {
        console.log(error);
        res.send({
          message: "This email is not available,Please sign up",
          alert: false,
          data: dataSend,
        });
      });
  } catch (error) {
    console.error(error);
    dataSend = {};
    res.status(500).send({ message: "Internal Server Error", data: dataSend });
  }
});

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

//save product in data for this api
app.post("/uploadProduct", async (req, res) => {
  const data = productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Uploaded Successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//payment getway
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const schemaCart = mongoose.Schema({
  itemImage: String,
  itemName: String,
  itemCategory: String,
  itemQty: String,
  itemPrice: String,
  itemTotal: String,
  orderTimestamp: String,
  orderedUser: String,
});

const cartModel = mongoose.model("cart", schemaCart);
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("line 174", req.body);
    const userId = req.body.userId;
    const timeStamp = Date.now();
    const productList = req.body.productCartItem;

    productList.map(async (item) => {
      const payloadData = {
        itemImage: item.image,
        itemName: item.name,
        itemCategory: item.category,
        itemQty: item.qty,
        itemPrice: item.price,
        itemTotal: item.total,
        orderTimestamp: timeStamp,
        orderedUser: userId,
      };
      const data = cartModel(payloadData);
      const datasave = await data.save();
      console.log("data save",datasave);
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1OYqeFSIebbx1BJCVma4TXJL" }],
      line_items: productList.map((item) => {
        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.name,
              //images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success/${timeStamp}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel/${timeStamp}`,
    };
    const session = await stripe.checkout.sessions.create(params);
    console.log(session.url);
    res.status(200).json(session.id);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

const schemaOrder = mongoose.Schema({
  itemImage: String,
  itemName: String,
  itemCategory: String,
  itemQty: String,
  itemPrice: String,
  itemTotal: String,
  orderTimestamp: String,
  orderedUser: String,
  activeStatus: String,
});
const orderModel = mongoose.model("order", schemaOrder);
app.post("/orderDetails", async (req, res) => {
  console.log(req.body);
  const orderTimestamp = req.body.id;
  cartModel.find({ orderTimestamp: orderTimestamp }).then((result) => {
    // console.log(result)
    result.map(async (data) => {
        const orderPayload = {
            itemImage: data.itemImage,
            itemName: data.itemName,
            itemCategory: data.itemCategory,
            itemQty: data.itemQty,
            itemPrice: data.itemPrice,
            itemTotal: data.itemTotal,
            orderTimestamp: data.orderTimestamp,
            orderedUser: data.orderedUser,
            activeStatus: req.body.activeStatus,
        }
        const orderData = orderModel(orderPayload);
      const datasave = await orderData.save();


    });
  });
});

app.get("/fetchAllOrder/:userId",async(req,res)=>{
    const userId = req.params.userId;
    console.log(userId);
    orderModel.find({orderedUser:userId}).sort({ orderTimestamp: -1 }).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })

})

app.listen(PORT, () => console.log("server is running at port : " + PORT));
