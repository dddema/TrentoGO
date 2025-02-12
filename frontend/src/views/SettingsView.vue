<script setup>
import { ref, onMounted } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import BackButton from '@/components/BackButton.vue'
import RoundButton from '@/components/RoundButton.vue'
import { getUser, getCreditCardInfo } from '@/lib/api'

const name = ref('')
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const newPasswordFieldType = ref('password')
const confirmPasswordFieldType = ref('password')
const passwordMismatch = ref(false)
const passwordChanged = ref(false)
const theme = ref('Chiaro')
const favoritePlaces = ref([])
const paymentMethod = ref(null)
const hasGoogle = ref(false)

const toggleNewPasswordVisibility = () => {
    newPasswordFieldType.value = newPasswordFieldType.value === 'password' ? 'text' : 'password'
}

const toggleConfirmPasswordVisibility = () => {
    confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password'
}

const checkPasswordMatch = () => {
    if (newPassword.value.length > 0 && confirmPassword.value.length > 0) {
        passwordMismatch.value = newPassword.value !== confirmPassword.value
    if (!passwordMismatch.value) {
        passwordChanged.value = false
    }
}
    }
    

const updatePassword = () => {
    if (!passwordMismatch.value && newPassword.value.length >= 8 && confirmPassword.value.length >= 8) {
        // Simulate a successful password update
        passwordChanged.value = true
        // Here you would typically send a request to your backend to update the password
        // axios.post('/update-password', { newPassword: newPassword.value })
        //     .then(response => {
        //         passwordChanged.value = true
        //     })
        //     .catch(error => {
        //         console.error('Error updating password:', error)
        //     })
    } else {
        passwordChanged.value = false
    }
}

const toggleTheme = () => {
    theme.value = theme.value === 'Chiaro' ? 'Scuro' : 'Chiaro'
}

const fetchUserDetails = async () => {
    try {
        const response = await getUser()
        if (response.result) {
            console.log("getU: " + response)
            name.value = response.fullName
            email.value = response.email
            hasGoogle.value = response.isGoogleAuth
        }
    } catch (error) {
        console.error('Error fetching user details:', error)
    }
}

const fetchPaymentMethod = async () => {
    try {
        const response = await getCreditCardInfo()
        console.log("getCC: " + response)
        if (response.result) {
            paymentMethod.value = response.creditCardInfo
        }
    } catch (error) {
        console.error('Error fetching payment method:', error)
    }
}

const fetchFavoritePlaces = async () => {
    try {
        const response = await getUser()
        if (response.result) {
            favoritePlaces.value = response.favourites
        }
    } catch (error) {
        console.error('Error fetching favorite places:', error)
    }
}

onMounted(() => {
    fetchUserDetails()
    fetchPaymentMethod()
    fetchFavoritePlaces()
})
</script>

<template>
    <div class="settings-container">
        <BackButton text="Torna Indietro" />
        <div class="form-group mt-4">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" readonly class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" readonly class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
        </div>
        <div class="form-group" v-if="!hasGoogle">
            <label for="new-password">New Password:</label>
            <div class="flex items-center">
                <input :type="newPasswordFieldType" id="new-password" v-model="newPassword" @input="checkPasswordMatch" class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
                <RoundButton @buttonClick="toggleNewPasswordVisibility" text="Show Password" color="trento-blue" textColor="trento-white" class="ml-2 small-button" />
            </div>
        </div>
        <div class="form-group" v-if="!hasGoogle">
            <label for="confirm-password">Confirm Password:</label>
            <div class="flex items-center">
                <input :type="confirmPasswordFieldType" id="confirm-password" v-model="confirmPassword" @input="checkPasswordMatch" class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
                <RoundButton @buttonClick="toggleConfirmPasswordVisibility" text="Show Password" color="trento-blue" textColor="trento-white" class="ml-2 small-button" />
            </div>
            <p v-if="passwordMismatch" class="error-message">Le password non coincidono</p>
        </div>
        <div class="form-group" v-if="!hasGoogle">
            <RoundButton @buttonClick="updatePassword" text="Update Password" color="gray-300" textColor="black" class="mt-2 small-button" />
            <p v-if="passwordChanged" class="success-message">Password changed successfully</p>
        </div>
        <div class="form-group">
            <label for="bici">Sottoscrizione Biciclette:</label>
            <input type="checkbox" id="bici" class="mr-2" checked />
        </div>
        <div class="form-group">
            <label for="monopattino">Sottoscrizione Monopattini:</label>
            <input type="checkbox" id="monopattino" class="mr-2" />
        </div>
        <div class="form-group">
            <label for="bus">Sottoscrizione Bus:</label>
            <input type="checkbox" id="bus" class="mr-2" />
        </div>
        <div class="form-group">
            <label for="payment-method">Dati pagamento:</label>
            <p v-if="!paymentMethod" class="text-gray-500">Nessun metodo di pagamento collegato</p>
            <RoundButton v-if="!paymentMethod" @buttonClick="addPaymentMethod" text="Aggiungi nuovo metodo di pagamento" color="trento-blue" textColor="trento-white" class="mt-2 small-button" />
        </div>
        <div class="form-group">
            <label for="theme">Tema:</label>
            <button @click="toggleTheme" class="flex items-center transition duration-300 ease-in-out">
                <SunIcon v-if="theme === 'Chiaro'" class="h-5 w-5 text-yellow-500 transition duration-300 ease-in-out" />
                <MoonIcon v-else class="h-5 w-5 text-gray-500 transition duration-300 ease-in-out" />
            </button>
        </div>  
    </div>
</template>

<style>
.settings-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="checkbox"] {
    margin-right: 10px;
}

button {
    margin-top: 5px;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.success-message {
    color: green;
    margin-top: 5px;
}

.small-button {
    padding: 4px 8px;
    font-size: 0.875rem;
}
</style>