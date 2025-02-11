<script setup>
import { ref } from 'vue'

const name = ref('John Doe')
const email = ref('john.doe@example.com')
const password = ref('password123')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordFieldType = ref('password')
const newPasswordFieldType = ref('password')
const confirmPasswordFieldType = ref('password')
const passwordMismatch = ref(false)
const theme = ref('Chiaro')

const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const toggleNewPasswordVisibility = () => {
    newPasswordFieldType.value = newPasswordFieldType.value === 'password' ? 'text' : 'password'
}

const toggleConfirmPasswordVisibility = () => {
    confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password'
}

const checkPasswordMatch = () => {
    passwordMismatch.value = newPassword.value !== confirmPassword.value
}

const toggleTheme = () => {
    theme.value = theme.value === 'Chiaro' ? 'Scuro' : 'Chiaro'
}
</script>

<template>
    <div class="settings-container">
        <p class="greeting">{{ greeting }}</p>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" readonly class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" readonly class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input :type="passwordFieldType" id="password" v-model="password" readonly class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
            <button @click="togglePasswordVisibility" class="bg-blue-500 text-white px-4 py-2 rounded-md">Show Password</button>
        </div>
        <div class="form-group">
            <label for="new-password">New Password:</label>
            <input :type="newPasswordFieldType" id="new-password" v-model="newPassword" @input="checkPasswordMatch" class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
            <button @click="toggleNewPasswordVisibility" class="bg-blue-500 text-white px-4 py-2 rounded-md">Show Password</button>
        </div>
        <div class="form-group">
            <label for="confirm-password">Confirm Password:</label>
            <input :type="confirmPasswordFieldType" id="confirm-password" v-model="confirmPassword" @input="checkPasswordMatch" class="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs" />
            <button @click="toggleConfirmPasswordVisibility" class="bg-blue-500 text-white px-4 py-2 rounded-md">Show Password</button>
            <p v-if="passwordMismatch" class="error-message">Le password non coincidono</p>
        </div>
        <div class="form-group">
            <label for="bici">Sottoscrizione Biciclette:</label>
            <input type="checkbox" id="bici" class="mr-2" />
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
            <label for="theme">Tema:</label>
            <button @click="toggleTheme" class="bg-blue-500 text-white px-4 py-2 rounded-md">{{ theme }}</button>
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
</style>