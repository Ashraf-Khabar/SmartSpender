import User from "../models/UserModel.js";

export const AddDivision = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const { category, budget } = req.body;
        const division = { category, budget };
        user.divisions.push(division);
        await user.save();
        res.json(division);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
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