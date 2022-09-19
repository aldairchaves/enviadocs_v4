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


export {register, login}