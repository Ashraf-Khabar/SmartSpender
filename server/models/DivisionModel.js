import mongoose from 'mongoose';

const DivisionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Division = mongoose.model('Division', DivisionSchema);

export default Division;


