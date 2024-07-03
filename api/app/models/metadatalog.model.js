const mongoose = require('mongoose')

const MetadataSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"User"
    },// one record for one user
    device:[
        {
            type: String,
            required:true
        }
    ],// during login success
    os:[
        {
                type: String,
                required:true
        }
    ],// during login success
    txn_purpose:[
       {
            type: String,
            required:true
        }
    ], // login success
    auth_used:[
        {
            type: String,
            required:true
        }
    ],// during login success
    session_len:[
        {
            type: Number,
            required:true//mean during transaction
        }
    ],
    distance_moved:[
        {
            type: Number,
            required:true//median during login
        }
    ],
    amount:[
        {
            type: Number,
            required:true//mean during transaction
        }
    ],
    login_attempt:[
        {
            type: Number,
            required:true//median before login
        }
    ]

},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const MetadataModel = mongoose.model('MetadataModel', MetadataSchema);
module.exports = MetadataModel;