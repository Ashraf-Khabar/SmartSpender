import express from "express";
import { getUsers, Register, Login, Logout, Upload, getUserImage } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {AddDivision, UpdateDivision} from "../controllers/Divisions.js";

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
router.put('/:userId/divisions/:divisionId', UpdateDivision);
router.post('/:userId/divisions', AddDivision);

export default router;