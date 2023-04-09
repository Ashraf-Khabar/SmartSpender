import express from "express";
import { getUsers, Register, Login, Logout, Upload, getUserImage } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {AddDivision, UpdateDivision, GetDivisions, DeleteDivision} from "../controllers/Divisions.js";
import {AddExpense, GetExpenses, UpdateExpense, DeleteExpense} from "../controllers/Expenses.js";
import {AddCredit, DeleteCredit, GetCredits, UpdateCredit} from "../controllers/Credits.js";
import { CommentBog, CreateNewBlog, DeleteBlogById, GetAllBlogs, GetBlogById, LikeBlog, UpdateBlogById } from "../controllers/Blogs.js";
import { getBlog } from "../middleware/GetBlog.js";

const router = express.Router();

/* User routing */
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.post('/upload/:email', Upload);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/getImage/:email', getUserImage)

/* Division routing */
router.put('/:userId/divisions/:divisionId', UpdateDivision);
router.post('/:userId/divisions', AddDivision);
router.get('/:userId/divisions', GetDivisions);
router.delete('/:userId/divisions/:divisionId', DeleteDivision);

/* Expense routing */ 
router.put('/:userId/expenses/:expenseId', UpdateExpense);
router.post('/:userId/expenses', AddExpense);
router.get('/:userId/expenses', GetExpenses);
router.delete('/:userId/expenses/:expenseId', DeleteExpense);

/* Credit routing */ 
router.put('/:userId/credits/:creditId', UpdateCredit);
router.post('/:userId/credits', AddCredit);
router.get('/:userId/credits', GetCredits);
router.delete('/:userId/credits/:creditId', DeleteCredit);

/* Blogs routing */ 
router.get('/blogs', GetAllBlogs);
router.get('/blogs/:id', getBlog, GetBlogById);
router.post('/blogs', CreateNewBlog);
router.patch('/blogs/:id', getBlog, UpdateBlogById);
router.delete('/blogs/:id', getBlog, DeleteBlogById);
router.post('/blogs/:id/like', getBlog, LikeBlog);
router.post('/blogs/:id/comments', getBlog, CommentBog);

export default router;
