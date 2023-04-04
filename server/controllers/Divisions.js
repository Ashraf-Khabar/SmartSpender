import User from "../models/UserModel.js";
import Division from "../models/DivisionModel.js";

export const AddDivision = async (req, res) => {
    const { category, budget } = req.body;
    const userId = req.params.userId;

    const division = new Division({
        category,
        budget,
        user: userId
    });

    division.save()
        .then((result) => {
            // Add the division ID to the user's divisions array
            User.findByIdAndUpdate(userId, {
                $push: { divisions: result._id }
            }).exec();

            res.status(201).json({
                message: 'Division added successfully',
                division: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const UpdateDivision = async (req, res) => {
    const { category, budget } = req.body;
    const userId = req.params.userId;
    const divisionId = req.params.divisionId;

    // Check if the authenticated user ID matches the user ID in the URL
    if (req.user.id !== userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    Division.findOneAndUpdate(
        { _id: divisionId, user: userId },
        { $set: { category, budget } },
        { new: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Division not found' });
            }
            res.json({ message: 'Division updated successfully', division: result });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const GetDivisions = async (req, res) => {
    const userId = req.params.userId;

    Division.find({ user: userId })
        .populate('user', 'name')
        .exec()
        .then((divisions) => {
            res.json({ divisions });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const DeleteDivision = async (req, res) => {
    const userId = req.params.userId;
    const divisionId = req.params.divisionId;

    // Check if the authenticated user ID matches the user ID in the URL


    Division.findOneAndDelete(
        { _id: divisionId, user: userId },
    )
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Division not found' });
            }
            // Remove the division ID from the user's divisions array
            User.findByIdAndUpdate(userId, {
                $pull: { divisions: divisionId }
            }).exec();

            res.json({ message: 'Division deleted successfully', division: result });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};


