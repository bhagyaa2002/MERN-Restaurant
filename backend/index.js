const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const Stripe  = require("stripe")
const dotenv=require("dotenv").config()


const app=express()
app.use(cors());
app.use(express.json({limit:"10mb"}));
const PORT=process.env.PORT || 8080;

// mongoose.connect(process.env.MONGODB_URL)
//     .then(()=>{
// console.log("Connected");
// }).catch((err)=>{
//     console.log(err);
// })
//comment
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to Database"))
.catch((err)=>console.log(err))


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
 

const userModel=mongoose.model("user",userSchema)

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

app.get("/",(req,res)=>{
    
    res.send("Server is running");
});


//signup api


app.post("/SignUp",async(req,res)=>{

    try {
       // console.log(req.body);
        const { email } = req.body;
    
        const result = await userModel.findOne({ email: email });
    
        if (result) {
          res.send({ message: "Email id is already registered",alert:false });
        } else {
          const data = new userModel(req.body);
          const save = await data.save();
          res.send({ message: "Successfully signed up",alert:true });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });


    //login api
app.post("/login",(req,res)=>{

    let dataSend={};
    try{
    //console.log(req.body)
    // const data1 = new productModel({name:"sham",category:'male',image:"",price:"1000",description:'male'});
    //       const save = await data1.save();
     const {email}=req.body
     userModel.findOne({email:email}).then((result)=>{
        
         dataSend={
            
                _id: result._id, 
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
        };
        console.log(dataSend)
        res.send({message:"Login is successfully",alert:true,data:dataSend})
     }).catch((error)=>{
        console.log(error)
        res.send({message:"This email is not available,Please sign up",alert:false,data:dataSend})
     })
    }
    catch (error) {
        console.error(error);
        dataSend={};
        res.status(500).send({ message: "Internal Server Error",data:dataSend });
    }
})
     
     
     
    //  (err,result)=>{
    //     if(result){
    //         console.log(result)
           
    //         res.send({message:"Login is successfully",alert:true})
    //     }
    //  })


    //product api 
    const schemaProduct=mongoose.Schema({
        name :String,
        category :String,
        image:String,
        price:String,
        description:String,
    })
    
    const productModel=mongoose.model("product",schemaProduct)

    //save product in data for this api
    app.post("/uploadProduct",async(req,res)=>{
        //console.log("line154",req.body)
        const data=productModel(req.body)
        const datasave=await data.save()
        res.send({message:"Upload Successfully"})
    })

    //
    app.get("/product",async(req,res)=>{
        const data=await productModel.find({})
       res.send(JSON.stringify(data))
      

    })

    //payment getway
    console.log(process.env.STRIPE_SECRET_KEY)
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    app.post("/create-checkout-session",async(req,res)=>{
        //  console.log(req.body)
         try{
            const params={
               submit_type : 'pay',
               mode : "payment",
               payment_method_types : ['card'],
               billing_address_collection : "auto",
               shipping_options : [{shipping_rate:"shr_1OYqeFSIebbx1BJCVma4TXJL"}],
               line_items : req.body.map((item)=>{
                return{
                    price_data : {
                        currency : "INR",
                        product_data : {
                            name : item.name,
                            //images : [item.image]
                        },
                        unit_amount : item.price * 100,
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item.qty
                }
               }),
               success_url : `${process.env.FRONTEND_URL}/success`,
               cancel_url : `${process.env.FRONTEND_URL}/cancel`,
            }
            const session=await stripe.checkout.sessions.create(params) 
            console.log(session)
         res.status(200).json(session.id)
         }
         catch(err){
            console.log(err)
            res.status(err.statusCode || 500).json(err.message)
         }
         
         
    } )
app.listen(PORT,()=>console.log("server is running at port : "+PORT))