var router = require('express').Router();
var meRoute = require('./user/userRoutes');
var authRoute = require('./auth/routes');
var groupsRoute = require('./group/groupRoutes')
var auth = require('./auth/auth')

authMiddleware = [ auth.decodeToken(), auth.getFreshUser()]

/* This api will mount other apis */

/* specific auth in meRoute */
router.use('/me', meRoute);
/* signin auth on authRoute */
router.use('/signin', authRoute);
/*everything in groups requires auth middleware*/
router.use('/groups', authMiddleware, groupsRoute)

module.exports = router;
