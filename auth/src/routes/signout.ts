import express from 'express';

//Router is an object that we can use to associate routes with
const router = express.Router();

//empty the cookie
router.post('/api/users/signout', (req, res) => {
    req.session = null

    res.send({});
});

export { router as signoutRouter };