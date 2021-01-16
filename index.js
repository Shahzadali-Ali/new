const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
//connect db
mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser : true,
    useFindAndModify:false,
    useUnifiedTopology : true,
})
.then(() => console.log('MongoDB Connect Successfully'))
.catch(() => console.log('MongoDB Connection Field'))

app.use(cors());
app.use(express.json())



app.get('/', (req , res) => 
{
res.send("<h1 style='text-align:center'>Welcome to Node Server</h1><p style='text-align:center; color:#000'><a href='http://159.89.166.168:3000'>Click To Go To Home Page</a></p>");
});

app.use('/auth', require("./routes/user"));


const PORT = 5000;
app.listen(PORT, () => console.log("Server running at port 5000"));
