const router = require('express').Router();
const loginCheck = require("../app/middleware/auth.middleware");
const {isAdmin, isSelfUserOrAdmin} = require("../app/middleware/rbac.middleware")
const uploader = require("../app/middleware/file-upload.middleware");

const UserController = require("../app/controller/user.controller");
let user_obj = new UserController();


router.route('/')
    // .get(loginCheck, user_obj.getAllUsers);
    .get( user_obj.getAllUsers);


router.route('/:id')
    .put(
        loginCheck,
        user_obj.updateUserById
        )

        .delete(
        loginCheck,
        user_obj.deleteUserById
        )

        .get(user_obj.getUserById)

module.exports = router;