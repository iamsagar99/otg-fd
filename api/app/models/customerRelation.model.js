const mongoose = require('mongoose')

const CustomerRelationSchemaDef = new mongoose.Schema({
    SendUser:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    ReceiveUser:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    InteractionCount:{
        type: Number,
        default: 0
    },
    LastInteraction:{
        type: Date,
        required: false
    },
    totalAmountBySentSender:{
        type: Number,
        required: false
    },
    maximumAmountSentBySender:{
        type: Number,
        required: false
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

module.exports = mongoose.model('CustomerRelation', CustomerRelationSchemaDef);

//interaction count ==0 ? sending to new user