const express        = require('express');
const router         = express.Router();

/* Signup, login, user edit */
const auth           = require('../controllers/authController.js');
const update         = require('../controllers/userEdit.js');
const dayWork        = require('../controllers/dayWork.js');

const authorization  = require('../middleware/jwt.js');


/* Post routes */
router.post('/signup',              auth.signup);
router.post('/login',               auth.login);
router.post('/create-day',          authorization, dayWork.create);

/* Update routes */
router.put('/update/:id',           authorization, update.update);
router.put('/update-day/:id',       authorization, dayWork.edit);

/* Delete routes */
router.delete('/update-day/:id',    dayWork.delete);

module.exports = router;