const mongoose = require('mongoose');

const CommonCriteriaSchema = new mongoose.Schema({
    total_amount_per_day: {
        type: Number,
        required: true
    },
    max_amount_per_transaction: {
        type: Number,
        required: true
    },
    max_count_per_day: {
        type: Number,
        required: true
    },
    total_amount_per_month: {
        type: Number,
        required: true
    },
    max_count_per_month: {
        type: Number,
        required: true
    },
    remaining_amount_per_day: {
        type: Number,
        required: true
    },
    remaining_count_per_day: {
        type: Number,
        required: true
    },
    remaining_amount_per_month: {
        type: Number,
        required: true
    },
    remaining_count_per_month: {
        type: Number,
        required: true
    }
});

const ReceiverTypeSpecificSchema = new mongoose.Schema({
    receiver_type: {
        type: String,
        required: true,
        enum: ['Merchant', 'Customer', 'Agent'] // actual receiver types
    },
    send_criteria: {
        type: CommonCriteriaSchema,
        required: true
    },
    receive_criteria: {
        type: CommonCriteriaSchema,
        required: true
    }
}, {
    _id: false
});

const CustomerCriteriaSchema = new mongoose.Schema({
    user: {
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

const UserCriteriaModel = mongoose.model('UserCriteriaModel', CustomerCriteriaSchema);
module.exports = UserCriteriaModel;