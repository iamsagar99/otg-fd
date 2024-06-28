const mongoose = require('mongoose');

const CommonCriteriaSchema = new mongoose.Schema({
    Send_total_amount_per_day: {
        type: Number,
        required: true
    },
    max_amount_per_transaction: {
        type: Number,
        required: true
    },
    Send_max_count_per_day: {
        type: Number,
        required: true
    },
    Send_total_amount_per_month: {
        type: Number,
        required: true
    },
    Send_max_count_per_month: {
        type: Number,
        required: true
    },
    Receive_total_amount_per_day: {
        type: Number,
        required: true
    },
    Receive_max_count_per_day: {
        type: Number,
        required: true
    },
    Receive_total_amount_per_month: {
        type: Number,
        required: true
    },
    Receive_max_count_per_month: {
        type: Number,
        required: true
    },
    Remaining_Send_total_amount_per_day: {
        type: Number,
        required: true
    },
    Remaining_Send_count_per_day: {
        type: Number,
        required: true
    },
    Remaining_Send_total_amount_per_month: {
        type: Number,
        required: true
    },
    Remaining_Send_count_per_month: {
        type: Number,
        required: true
    },
    Remaining_Receive_total_amount_per_day: {
        type: Number,
        required: true
    },
    Remaining_Receive_count_per_day: {
        type: Number,
        required: true
    },
    Remaining_Receive_total_amount_per_month: {
        type: Number,
        required: true
    },
    Remaining_Receive_count_per_month: {
        type: Number,
        required: true
    }
});

const ReceiverTypeSpecificSchema = new mongoose.Schema({
    receiver_type: {
        type: String,
        required: true,
        enum: ['type1', 'type2', 'type3'] // replace with actual receiver types
    },
    criteria: {
        type: CommonCriteriaSchema,
        required: true
    }
}, {
    _id: false
});

const CustomerCriteriaSchema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver_criteria: {
        type: [ReceiverTypeSpecificSchema],
        required: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

module.exports = mongoose.model('UserCriteria', CustomerCriteriaSchema);
