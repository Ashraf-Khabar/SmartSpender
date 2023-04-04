import User from "../models/UserModel.js";
import Expense from "../models/ExpenseModel.js";


export const UpdateExpense = async (req, res) => {
    const { description, amount } = req.body;
    const userId = req.params.userId;
    const expenseId = req.params.expenseId;

    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: expenseId, user: userId },
            { $set: { description, amount } },
            { new: true }
        ).populate('user', 'name');

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.json({
            message: 'Expense updated successfully',
            expense: expense
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while updating the expense'
        });
    }
};

export const AddExpense = async (req, res) => {
    const { description, amount } = req.body;
    const userId = req.params.userId;

    const expense = new Expense({
        description,
        amount,
        user: userId
    });

    expense.save()
        .then((result) => {
            // Add the expense ID to the user's expenses array
            User.findByIdAndUpdate(userId, {
                $push: { expenses: result._id }
            }).exec();

            res.status(201).json({
                message: 'Expense added successfully',
                expense: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error,
            });
        });
};

export const GetExpenses = async (req, res) => {
    const userId = req.params.userId;
    Expense.find({ user: userId })
    .populate('user', 'name')
    .exec()
    .then((expenses) => {
        res.json({ expenses });
    })
    .catch((error) => {
        res.status(500).json({
            error,
        });
    });
};