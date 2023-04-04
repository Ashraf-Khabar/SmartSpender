import express from "express";
import { getUsers, Register, Login, Logout, Upload, getUserImage } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {AddDivision, UpdateDivision, GetDivisions} from "../controllers/Divisions.js";

const router = express.Router();

/* User routing */
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.post('/upload/:email', Upload);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/getImage/:email', getUserImage)

/*Division routing*/
router.put('/:userId/divisions/:divisionId', verifyToken, UpdateDivision);
router.post('/:userId/divisions', AddDivision);
router.get('/:userId/divisions', GetDivisions);

export default router;