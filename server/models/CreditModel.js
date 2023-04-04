import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Credit = mongoose.model('Credit', creditSchema);

export default Credit;
