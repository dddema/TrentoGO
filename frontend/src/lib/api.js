import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authtoken')
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, (error) => Promise.reject(error))

const checkErrorStatus = (error, knownCodes) => ({
  result: false,
  message: (knownCodes.includes(error.response.status) ?
    error.response.data.message : 'Errore del server.')
})

/**
 * Logs in the user with the provided credentials.
 * 
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} An object containing the result of the operation and the 
 * generated JWT token or an error message if the request failed.
 * 
 * @example
 * const response = await signIn('user@example.com', 'password123');
 * if (response.result) {
 *   console.log('Login successful:', response.token);
 * } else {
 *   // do something with the error
 *   console.error('Login error:', response.message);
 * }
 */
export const signIn = async (email, password) => {
  try {
    const response = await api.post('auth/login', { email, password })
    localStorage.setItem('authtoken', response.data.token)

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [403])
  }
}

/**
 * Logs out the current user.
 * 
 * @returns {Promise<Object>} An object containing the result of the operation and
 * an error message if request failed.
 * 
 * @example
 * const response = await logOut();
 * if (response.result) {
 *   console.log('Logout successful.');
 * } else {
 *   console.error('Logout error:', response.message);
 * }
 */
export const logOut = async () => {
  try {
    const response = await api.get('auth/logout')
    localStorage.removeItem('authtoken')

    return { result: true }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Registers a new user with the provided credentials.
 * 
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} fullName - The user's full name.
 * @returns {Promise<Object>} An object containing the result of the operation and user data
 * or an error message if the request failed.
 * 
 * @example
 * const response = await signUp('user@example.com', 'password123', 'John Doe');
 * if (response.result) {
 *   console.log('Registration successful:', response);
 * } else {
 *   console.error('Registration error:', response.message);
 * }
 */
export const signUp = async (email, password, fullName) => {
  try {
    const response = await api.post('auth/signup', { email, password, fullName })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [409])
  }
}

/**
 * Retrieves the current user's information and preferences.
 * 
 * @returns {Promise<Object>} An object containing the result of the operation and user data
 * or an error message if the request failed.
 * 
 * @example
 * const response = await getUser();
 * if (response.result) {
 *   console.log('User data:', response);
 * } else {
 *   console.error('Error fetching user data:', response.message);
 * }
 */
export const getUser = async () => {
  try {
    const response = await api.get('user/')

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Updates the user's preferences.
 * 
 * @param {string} theme - The user's preferred theme.
 * @param {boolean} ratingWarning - The user's rating warning preference.
 * @returns {Promise<Object>} An object containing the result of the operation and updated preferences
 * or an error message if the request failed.
 * 
 * @example
 * const response = await updatePreferences('dark', true);
 * if (response.result) {
 *   console.log('Preferences updated:', response);
 * } else {
 *   console.error('Error updating preferences:', response.message);
 * }
 */
export const updatePreferences = async (theme, ratingWarning) => {
  try {
    const response = await api.patch('user/preferences', { theme, ratingWarning })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Retrieves the user's credit card information.
 * 
 * @returns {Promise<Object>} An object containing the result of the operation and credit card information
 * or an error message if the request failed.
 * 
 * @example
 * const response = await getCreditCardInfo();
 * if (response.result) {
 *   console.log('Credit card info:', response);
 * } else {
 *   console.error('Error fetching credit card info:', response.message);
 * }
 */
export const getCreditCardInfo = async () => {
  try {
    const response = await api.get('user/credit-card-info')

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Sets the user's credit card information.
 * 
 * @param {string} ownerName - The credit card owner's name.
 * @param {string} ownerSurname - The credit card owner's surname.
 * @param {string} number - The credit card number.
 * @param {string} cvc - The credit card CVC.
 * @param {string} expireAt - The credit card expiration date.
 * @returns {Promise<Object>} An object containing the result of the operation and updated credit card information
 * or an error message if the request failed.
 * 
 * @example
 * const response = await setCreditCardInfo('John', 'Doe', '1234567890123456', '123', '12/23');
 * if (response.result) {
 *   console.log('Credit card info updated:', response);
 * } else {
 *   console.error('Error updating credit card info:', response.message);
 * }
 */
export const setCreditCardInfo = async (ownerName, ownerSurname, number, cvc, expireAt) => {
  try {
    const response = await api.put('user/credit-card-info', { ownerName, ownerSurname, number, cvc, expireAt })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Adds a favourite place for the user.
 * 
 * @param {string} title - The title of the favourite place.
 * @param {string} icon - The icon representing the favourite place.
 * @param {string} color - The color representing the favourite place.
 * @param {number} lat - The latitude of the favourite place.
 * @param {number} lng - The longitude of the favourite place.
 * @returns {Promise<Object>} An object containing the result of the operation and updated favourites
 * or an error message if the request failed.
 * 
 * @example
 * const response = await addFavouritePlace('Home', 'house', 'blue', 46.066, 11.121);
 * if (response.result) {
 *   console.log('Favourite place added:', response.favourites);
 * } else {
 *   console.error('Error adding favourite place:', response.message);
 * }
 */
export const addFavouritePlace = async (title, icon, color, lat, lng) => {
  try {
    const response = await api.post('user/favourites', { title, icon, color, lat, lng })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Deletes a favourite place for the user.
 * 
 * @param {string} id - The ID of the favourite place to delete.
 * @returns {Promise<Object>} An object containing the result of the operation and updated favourites
 * or an error message if the request failed.
 * 
 * @example
 * const response = await deleteFavouritePlace('12345');
 * if (response.result) {
 *   console.log('Favourite place deleted:', response.favourites);
 * } else {
 *   console.error('Error deleting favourite place:', response.message);
 * }
 */
export const deleteFavouritePlace = async (id) => {
  try {
    const response = await api.delete(`user/favourites/${id}`)

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Retrieves the nearest bike stall based on the provided coordinates.
 * 
 * @param {number} lat - The latitude of the current location.
 * @param {number} lng - The longitude of the current location.
 * @returns {Promise<Object>} An object containing the result of the operation and nearest bike stall information
 * or an error message if the request failed.
 * 
 * @example
 * const response = await getNearestBikeStall(46.066, 11.121);
 * if (response.result) {
 *   console.log('Nearest bike stall:', response);
 * } else {
 *   console.error('Error fetching nearest bike stall:', response.message);
 * }
 */
export const getNearestBikeStall = async (lat, lng) => {
  try {
    const response = await api.get('transport/near-bike-stall', { params: { lat, lng } })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

/**
 * Retrieves the nearest scooter based on the provided coordinates.
 * 
 * @param {number} lat - The latitude of the current location.
 * @param {number} lng - The longitude of the current location.
 * @returns {Promise<Object>} An object containing the result of the operation and nearest scooter information
 * or an error message if the request failed.
 * 
 * @example
 * const response = await getNearestScooter(46.066, 11.121);
 * if (response.result) {
 *   console.log('Nearest scooter:', response);
 * } else {
 *   console.error('Error fetching nearest scooter:', response.message);
 * }
 */
export const getNearestScooter = async (lat, lng) => {
  try {
    const response = await api.get('transport/near-scooter', { params: { lat, lng } })

    return { result: true, data: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}