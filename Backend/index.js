const express=require('express');
const app = express();
const cors=require('cors');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const DBurl = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const mclient=require('mongodb').MongoClient;
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));
app.use(express.json());
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
  
  try {

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    console.log("Token received:", token);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

mclient.connect(DBurl)
.then((client)=>{
        let dbObj=client.db("Task_Management");
        let LoginCollection=dbObj.collection("UserLogin");
        let BoardsCollection=dbObj.collection("BoardsData");
        let ListsCollection=dbObj.collection("ListData");
        let CardsCollection=dbObj.collection("CardsData");


        app.set("BoardsCollection",BoardsCollection);
        app.set("ListsCollection",ListsCollection);
        app.set("CardsCollection",CardsCollection);

        app.set("LoginCollection",LoginCollection);
        console.log("Connected to DB");
})
.catch((err)=>{
    console.log("Error while connecting to DB",err);
})


const UserApi = require('./APIs/UserApi');

const BoardsApi = require('./APIs/BoardsApi');
const CardsApi = require('./APIs/CardsApi');
const ListsApi = require('./APIs/ListsApi');

app.use('/user',UserApi);
app.use(authenticate);
app.use('/lists',ListsApi);
app.use('/boards',BoardsApi);
app.use('/cards',CardsApi);



app.use((req,res,next)=>{
    res.status(404).send({message:`path ${req.url} not found`});

})

app.use((err,req,res,next)=>{
    res.status(500).send({message:"error occured",error:err.message});
})


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});