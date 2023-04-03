import User from "../models/UserModel.js";
import Division from "../models/DivisionModel.js";


/* export const AddDivision = async (req, res) => {
    const { category, budget } = req.body;

    const division = new Division({
        category,
        budget,
    });

    division.save()
        .then((result) => {
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
};*/

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
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const division = user.divisions.id(req.params.divisionId);
        if (!division) {
            return res.status(404).json({ message: 'Division non trouvée' });
        }
        const { category, budget } = req.body;
        division.category = category;
        division.budget = budget;
        await user.save();
        res.json(division);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};