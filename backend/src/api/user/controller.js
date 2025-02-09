import { User } from '../../model.js'

const userInfo = async (req, res) => {
  const user = await User.findById(req.user.id, '-_id -password -creditCardInfo -__v -preferences._id')
  res.status(200).json(user)
}

const updatePreferences = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences = req.body

  await user.save()

  res.status(200).json(user.preferences)
}

const updateCreditCardInfo = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.creditCardInfo = req.body

  await user.save()

  res.status(200).json(user.creditCardInfo)
}

const getCreditsCardInfo = async (req, res) => {
  const user = await User.findById(req.user.id, 'creditCardInfo')
  res.status(200).json(user.creditCardInfo)
}

const addFavouritePlace = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences.favourites.push(req.body)

  await user.save()

  res.status(200).json(user.preferences.favourites)
}

const removeFavouritePlace = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences.favourites.pull(req.params.id)

  await user.save()

  res.status(200).json(user.preferences.favourites)
}

export {
  userInfo,
  updatePreferences,
  updateCreditCardInfo,
  getCreditsCardInfo,
  addFavouritePlace,
  removeFavouritePlace
}