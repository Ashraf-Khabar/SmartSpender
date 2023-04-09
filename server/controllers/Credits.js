import User from "../models/UserModel.js";
import Credit from "../models/CreditModel.js";
import Expense from "../models/ExpenseModel.js";

export const AddCredit = async (req, res) => {
    const { creditName, amount } = req.body;
    const userId = req.params.userId;

    const credit = new Credit({
        creditName,
        amount,
        user: userId
    });

    credit.save()
        .then((result) => {
            // Add the credit ID to the user's credits array
            User.findByIdAndUpdate(userId, {
                $push: { credits: result._id }
            }).exec();

            res.status(201).json({
                message: 'Credit added successfully',
                credit: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const UpdateCredit = async (req, res) => {
    const { creditName, amount } = req.body;
    const userId = req.params.userId;
    const creditId = req.params.creditId;

    // Check if the authenticated user ID matches the user ID in the URL

    Credit.findOneAndUpdate(
        { _id: creditId, user: userId },
        { $set: { creditName, amount } },
        { new: true }
    )
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Credit not found' });
            }
            res.json({ message: 'Credit updated successfully', credit: result });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const GetCredits = async (req, res) => {
    const userId = req.params.userId;

    Credit.find({ user: userId })
        .populate('user', 'name')
        .exec()
        .then((credits) => {
            res.json({ credits });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const DeleteCredit = async (req, res) => {
    const userId = req.params.userId;
    const creditId = req.params.creditId;

    // Check if the authenticated user ID matches the user ID in the URL

    Credit.findOneAndDelete(
        { _id: creditId, user: userId },
    )
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Credit not found' });
            }
            // Remove the division ID from the user's divisions array
            User.findByIdAndUpdate(userId, {
                $pull: { expenses: creditId }
            }).exec();

            res.json({ message: 'Credit deleted successfully', credit: result });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
}




















