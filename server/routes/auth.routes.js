const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {
  check,
  vaidationResult
} = require('express-vaidatior')
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const router = express.Router({ mergeParams: true })

//api/auth/signUp
//1. get data from req(eamil,password...)
//2. check if user already exists
//3has password
//4. create new user
//5.generate tokens
router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400
        }
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword
    })

    const tokens = tokenService.generate({
      _id: newUser._id
    })
    await tokenService.save(
      newUser._id,
      tokens.refreshToken
    )

    res.status(201).send({ ...tokens, userId: newUser._id })
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Server error. Try again later.' })
  }
})

router.post(
  '/signInWithPassword',
  async (req, response) => {}
)
router.post('/token', async (req, response) => {})

module.exports = router
