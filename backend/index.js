const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const uploadRoutes = require('./routes/uploadRoutes');
const { connectToMongoDB } = require('./db/connectDB');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
connectToMongoDB(process.env.MONGODB_URI).then(()=>console.log('Database connected'))

app.use('/api',uploadRoutes)

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
})