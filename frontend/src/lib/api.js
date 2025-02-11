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

    return { result: true, ...response.data }
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

    return { result: true, ...response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [409])
  }
}

export const getUser = async () => {
  try {
    const response = await api.get('user/')

    return { result: true, ...response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

export const updatePreferences = async (theme, ratingWarning) => {
  try {
    const response = await api.patch('user/preferences', { theme, ratingWarning })

    return { result: true, ...response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

export const getCreditCardInfo = async () => {
  try {
    const response = await api.get('user/credit-card-info')

    return { result: true, ...response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

export const setCreditCardInfo = async (ownerName, ownerSurname, number, cvc, expireAt) => {
  try {
    const response = await api.put('user/credit-card-info', { ownerName, ownerSurname, number, cvc, expireAt })

    return { result: true, ...response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

export const addFavouritePlace = async (title, icon, color, lat, lng) => {
  try {
    const response = await api.post('user/favourites', { title, icon, color, lat, lng })

    return { result: true, favourites: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}

export const deleteFavouritePlace = async (id) => {
  try {
    const response = await api.delete(`user/favourites/${id}`)

    return { result: true, favourites: response.data }
  } catch (error) {
    console.error(error.message)
    return checkErrorStatus(error, [401])
  }
}