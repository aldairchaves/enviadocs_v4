import mongoose from 'mongoose'
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Insira teu nome'],
        minlength:4,
        maxlength:14
        
    },
    idAddress:{
        type:String,
        required:[true, 'Insira o ID do utilizador'],
        unique: true,
    },
    email:{
        type:String,
        required:[true, 'Insira teu email'],
        validate:{
            validator:validator.isEmail,
            message:'Por favor informe um email válido'
        },
        unique: true,
    },
    company:{
        type:String,
        required:[true, 'Insira o nome da empresa'],
        
        
    },
    userName:{
        type:String,
        required:[true, 'Insira o nome de acesso'],
        unique:true,
    },
    contactNumber:{
        type:String,
        required:[true, 'Insira o numero para contacto'],
    },
    password:{
        type:String,
        required:[true, 'Insira tua palavra passe'],
        minlength:6,
        select:false
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidate) {
    const isMatch = await bcryptjs.compare(candidate, this.password)
    return isMatch
}

export default mongoose.model('User',UserSchema)