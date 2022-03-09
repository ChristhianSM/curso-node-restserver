const { Router } = require("express");
const { check } = require("express-validator");
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require("../controllers/users.controller");
const { isRoleValid, existEmail, existUserById } = require("../helpers/db-validators");
const { validateInputs } = require("../middlewares/validate-inputs");
const router = Router();

router.get('/',[
    check('limit', "Debe ser un valor numerico").optional().isNumeric(),
    check('desde', "Debe ser un valor numerico").optional().isNumeric(),
    validateInputs,
],
 usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El Password debe ser mas de 6 letras').isLength({min:6}),
    // check('email', 'El correo no es valido').isEmail(),
    // check('email').custom( existEmail ),
    check('email', 'El correo no es valido').custom(existEmail).isEmail(),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validateInputs
] ,usersPost)

router.put('/:id',[
    check('id', 'No es un id Valido').isMongoId(), 
    check('id').custom( existUserById ),
    check('role').custom( isRoleValid ),
    validateInputs,
],usersPut);

router.patch('/',usersPatch)

router.delete('/:id',[
    check('id', 'No es un id Valido').isMongoId(), 
    check('id').custom( existUserById ),
    validateInputs,
], usersDelete)

module.exports = router;