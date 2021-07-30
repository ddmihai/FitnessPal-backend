const express        = require('express');
const router         = express.Router();

/* Signup, login, user edit */
const auth           = require('../controllers/authController.js');
const update         = require('../controllers/userEdit.js');
const dayWork        = require('../controllers/dayWork.js');
const exercise       = require('../controllers/exercise.js');
const sets           = require ('../controllers/sets.js');
const authorization  = require('../middleware/jwt.js');


/* Post routes */
router.post('/signup',              auth.signup);
router.post('/login',               auth.login);
router.post('/create-day',          authorization, dayWork.create);
router.post('/create-ex',           authorization, exercise.create);
router.post('/create-set',          authorization, sets.createSet);

/* Update routes */
router.put('/update/:id',           authorization, update.update);
router.put('/update-day/:id',       authorization, dayWork.edit);
router.put('/update-exe/:id',       authorization, exercise.update);
router.put('/update-set/:id',       authorization, sets.update);

/* Delete routes */
router.delete('/delete-day/:id',    authorization, dayWork.delete);
router.delete('/delete/:id',        authorization, exercise.deleteEx);

/* Get routes */
router.get('/account/:id',          auth.getOne);
router.get('/day/:id',              authorization, dayWork.getOne);
router.get('/all-days/:id',         authorization, dayWork.getAll);




module.exports = router;