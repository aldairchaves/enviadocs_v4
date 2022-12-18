import mongoose from 'mongoose'
import validator from 'validator'

const TransSchema = new mongoose.Schema({
    docNumber:{
        type: Number,
        required:true,
        unique: true

    },
    transSender:{
        type:String,
        required:[true, 'Insira o ID do utilizador'],
        
    },
    transReceip:{
        type:String,
        required:[true, 'Insira o ID do destinatário'],
        
    },
    startDate: {
        type:String,
        required:true
    },
    transItems: {
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    }

})

export default mongoose.model('Doctran',TransSchema)