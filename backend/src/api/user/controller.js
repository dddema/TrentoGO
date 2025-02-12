import { User } from '../../model.js'

export const userInfo = async (req, res) => {
  const user = await User.findById(req.user.id, '-_id -password -creditCardInfo -__v -preferences._id')
  res.status(200).json(user)
}

export const updatePreferences = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences.theme = req.body.theme
  user.preferences.bikeSubscription = req.body.bikeSubscription
  user.preferences.scooterSubscription = req.body.scooterSubscription
  user.preferences.busSubscription = req.body.busSubscription

  await user.save()

  res.status(200).json(user.preferences)
}

export const updateCreditCardInfo = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.creditCardInfo = req.body

  await user.save()

  res.status(200).json(user.creditCardInfo)
}

export const getCreditsCardInfo = async (req, res) => {
  const user = await User.findById(req.user.id, 'creditCardInfo')
  res.status(200).json(user.creditCardInfo)
}

export const addFavouritePlace = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences.favourites.push(req.body)

  await user.save()

  res.status(200).json(user.preferences.favourites)
}

export const deleteFavouritePlace = async (req, res) => {
  const user = await User.findById(req.user.id)
  user.preferences.favourites.pull(req.params.id)

  await user.save()

  res.status(200).json(user.preferences.favourites)
}