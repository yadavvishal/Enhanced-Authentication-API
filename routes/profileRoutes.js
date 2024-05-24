const express = require('express');
const { getProfile, getProfileById, setProfileVisibility, editProfile } = require('../controllers/profileController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getProfile);
router.get('/:id', authMiddleware, getProfileById);
router.patch('/visibility', authMiddleware, setProfileVisibility);
router.patch('/', authMiddleware, upload.single('photo'), editProfile);

module.exports = router;
