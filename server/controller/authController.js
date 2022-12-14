import Doctran from '../models/Doctran.js'
import User from '../models/User.js'

const register = async(req, res) => {
    try {
       const {name,idAddress, email,company,userName, contactNumber, password} = req.body
       const user = await User.create({name,idAddress, email,company, userName, contactNumber, password})
       const token = user.createJWT()
    
       res.status(201).json({user:{email:user.email,name:user.name, idAddress:user.idAddress, company:user.company, userName:user.userName, contactNumber:user.contactNumber},token})

    }catch(error) {
        res.status(500).json({msg: 'Ocorreu um erro'})
    }
}

const login = async(req, res) => {
    const {email,password} = req.body

    if(!email || !password) {
        res.status(500).json({msg:"Dados incorretos"})
    }
    const user = await User.findOne({email}).select('+password')

    if(!user) {
        res.status(500).json({msg:'Credencais incorretas'})
    }
    const isCorrect = await user.comparePassword(password)
    
    if(!isCorrect){
        res.status(500).json({msg:'Credencais incorretas'})
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(201).json({user, token})
}

const getUserInfo = async (req, res) => {
    
    // const {idAddress} = req.body
    
    // const userID = await User.findOne({idAddress:idAddress})
    // res.status(201).json({userID})
    
    // const list = await User.find()
    // res.status(201).json({list})

    // const info = await User.findOne({idAddress: req.body.idAddress})
    // res.status(201).json({info})

    
    const {idAddress} = req.body
    const user = await User.findOne({idAddress})
    console.log(user)
    res.status(201).json(user)
    
}

const setTransaction = async (req, res) => {
try {
    const {docNumber, transSender, transReceip, startDate, transItems, endDate} = req.body
    const trans = await Doctran.create({docNumber, transSender, transReceip, startDate, transItems, endDate})
    console.log(trans)
    res.status(201).json({trans:{DocNumber:trans.docNumber, TransSender:trans.transSender, TransReceip: trans.transReceip, Date: trans.startDate, Items: trans.transItems, EndDate: trans.endDate}})

 }catch(error) {
     res.status(500).json({msg: 'Ocorreu um erro'})
 }
}

const fetchTransaction = async (req,res) => {
    try {
        const {transSender} = req.body
        const docs = await Doctran.find({transSender})
        
        res.status(201).json({docs})
    
    } 
    catch (error) {
        
    }
}


const fetchDocById = async (req,res) => {
    try {
        const {docNumber} = req.body
        const docnumber = await Doctran.findOne({docNumber})
        
        res.status(201).json({docnumber:{DocNumber:docnumber.docNumber, TransSender:docnumber.transSender, TransReceip:trans.transReceip, Date: docnumber.startDate, Items: docnumber.transItems, EndDate: docnumber.endDate}})
    } catch (error) {
        
    }
}

export {register, login, getUserInfo, setTransaction, fetchTransaction, fetchDocById }