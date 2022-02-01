const express = require('express')
const router = express.Router({ mergeParams: true })

//api/auth/signUp
router.post('/signUp', async (req, response) => {})
router.post(
  '/signInWithPassword',
  async (req, response) => {}
)
router.post('/token', async (req, response) => {})

module.exports = router
