import express from 'express';
import { currentUser } from '../middlewares/current-user';

//This handler is for React to make request to see if a user is log in and who is current user
//There will be a cookie if a user is log in 


//Router is an object that we can use to associate routes with
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };