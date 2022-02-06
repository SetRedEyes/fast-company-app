const express = require('express')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params

    // userId === current user id
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        //new - recieve const updateUser after database update
        { new: true }
      )
      res.send(updatedUser)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Server error. Try again later.' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const list = await User.find()
    //by default status =200 res.status(200).send...
    res.send(list)
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Server error. Try again later.' })
  }
})
module.exports = router
