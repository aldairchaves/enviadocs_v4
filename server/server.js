import express from "express";
import bodyParser from "body-parser"
import cors from 'cors'

const app = express();




const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


//Variaveis internas
import dotenv from 'dotenv'
dotenv.config()

//mongo
import connectDB from './db/connect.js'

//rotas
import authRoute from './routes/authRoute.js'

//morgan trata requisicoes http em logs e erros
import morgan from 'morgan'


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.unsubscribe(express.json())
app.use(bodyParser.json())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Boas vindas')
})

app.use('/api', authRoute)

const port = process.env.PORT || 5004


const start = async () => {
    await connectDB(process.env.MONGO_URL)

    app.listen(port, () => {
        console.log(`a rodar na ${port}`)
    })
}

start()
