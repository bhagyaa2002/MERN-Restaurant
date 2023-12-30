const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
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
        console.log(req.body);
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
    console.log(req.body)
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
        res.status(500).send({ message: "Internal Server Error",data:dataSendc });
    }
})
     
     
     
    //  (err,result)=>{
    //     if(result){
    //         console.log(result)
           
    //         res.send({message:"Login is successfully",alert:true})
    //     }
    //  })

app.listen(PORT,()=>console.log("server is running at port : "+PORT))