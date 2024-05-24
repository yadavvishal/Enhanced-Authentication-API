const User = require('../models/user');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found' });

    if (!user.isProfilePublic && !req.user.isAdmin) {
      return res.status(403).send({ message: 'Access Denied' });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.setProfileVisibility = async (req, res) => {
  try {
    const { isProfilePublic } = req.body;
    await User.findByIdAndUpdate(req.user._id, { isProfilePublic });
    res.send({ message: 'Profile visibility updated' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (req.file) {
      updates.photo = `/uploads/${req.file.filename}`;
    }

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
