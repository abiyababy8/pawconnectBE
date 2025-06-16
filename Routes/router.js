// path to resolve each client request

const express = require('express');
const router = new express.Router();
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//const multerMiddleware = require('../Middlewares/multerMiddleware')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController');
const userPetController = require('../Controllers/userPetController')
const lostPetController = require('../Controllers/lostPetController')
const adoptPetController = require('../Controllers/adoptPetController')
const adoptionRequestController = require('../Controllers/adoptionRequestController')
const multerConfig = require('../Middlewares/multerMiddleware');

//provide path 
router.post('/saveproducts', productController.addProjects)
router.get('/getproducts', productController.getProducts)

router.post('/user/register', userController.registerUser)
router.post('/user/login', userController.loginUser)
router.get('/user/userDetails', jwtMiddleware, userController.userDetails)
router.put('/user/edit/:id',jwtMiddleware,userController.editUser)

router.get('/user/allUserDetails',jwtMiddleware,userController.allUsers)

router.post('/user/pets', jwtMiddleware, multerConfig.single('userPetImage'), userPetController.addUserPets)
router.get('/user/pets', jwtMiddleware, multerConfig.single('userPetImage'), userPetController.getUserPets)
router.put('/user/pets/:id', jwtMiddleware, multerConfig.single('userPetImage'), userPetController.editUserPets)
router.delete('/user/pets/:id', jwtMiddleware, userPetController.deleteUserPets)
router.get('/alluser/pets',userPetController.getAllUserPets)


router.post('/lost/pets', jwtMiddleware, multerConfig.single('lostPetImage'), lostPetController.addLostPets)
router.get('/lost/pets', jwtMiddleware, multerConfig.single('lostPetImage'), lostPetController.getLostPets)
router.put('/lostpets/:id/location', jwtMiddleware, lostPetController.updateLostPetLocation);
router.put('/lostpets/:id/status',jwtMiddleware,lostPetController.updateLostPetStatus)
router.get('/user-lost/pets', jwtMiddleware, multerConfig.single('lostPetImage'), lostPetController.getUserLostPets)
router.delete('/lostpets/:id',jwtMiddleware,lostPetController.deleteLostPet)

router.post('/adopt/pets', jwtMiddleware, multerConfig.single('image'), adoptPetController.addAdoptPet)
router.get('/adopt/pets', jwtMiddleware, multerConfig.single('image'), adoptPetController.getAdoptPet)
router.get('/user-adopt/petlist', jwtMiddleware, adoptPetController.getUserAdoptPetList)
router.put('/adopt/pets/:id/status',jwtMiddleware,adoptPetController.updateAdoptPetStatus)
router.delete('/adopt/pets/:id',jwtMiddleware,adoptPetController.deleteAdoptPet)

router.post('/adopt/request', jwtMiddleware, adoptionRequestController.addAdoptionRequest)
router.get('/user-adopt/request', jwtMiddleware, adoptionRequestController.getUserAdoptionRequest)
router.put('/adopt/request/:id/status',jwtMiddleware,adoptionRequestController.updateAdoptionRequestStatus)
router.delete('/adopt/request/:id',jwtMiddleware,adoptionRequestController.deleteAdoptionRequest)

module.exports = router;