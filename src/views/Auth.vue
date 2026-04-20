<template>
  <div class="authPage">
    <section class="card authCard">
      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">{{ t('authLogin') }}</button>
        <button :class="{ active: mode === 'register' }" @click="mode = 'register'">{{ t('authRegister') }}</button>
      </div>

      <h1>{{ mode === 'login' ? t('loginProfile') : t('createProfile') }}</h1>
      <p class="muted">{{ mode === 'login' ? t('loginText') : t('registerText') }}</p>

      <div v-if="mode === 'register'" class="field">
        <label>{{ t('name') }}</label>
        <input v-model.trim="registerForm.name" :placeholder="t('yourName')">
      </div>

      <div class="field">
        <label>{{ t('email') }}</label>
        <input v-model.trim="currentForm.email" type="email" placeholder="name@example.com">
      </div>

      <div class="field">
        <label>{{ t('password') }}</label>
        <input v-model.trim="currentForm.password" type="password" :placeholder="t('enterPassword')">
      </div>

      <button class="primary" @click="submit">{{ mode === 'login' ? t('login') : t('signUp') }}</button>
      <p v-if="message" :class="['message', success ? 'ok' : 'error']">{{ message }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, registerUser } from '../services/profile'
import { useI18n } from '../services/i18n'

const emit = defineEmits(['auth-changed'])
const router = useRouter()
const { t } = useI18n()
const mode = ref('login')
const success = ref(false)
const message = ref('')
const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ name: '', email: '', password: '' })
const currentForm = computed(() => mode.value === 'login' ? loginForm : registerForm)

function submit() {
  const result = mode.value === 'login' ? loginUser(loginForm) : registerUser(registerForm)
  success.value = !!result.ok
  message.value = result.message || (result.ok ? 'OK' : 'Error')
  if (result.ok) {
    emit('auth-changed')
    router.push('/account')
  }
}
</script>

<style scoped>
.authPage{display:grid;place-items:center;min-height:calc(100vh - 180px)}.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:24px;box-shadow:var(--shadow)}.authCard{width:min(100%, 520px)}.tabs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}.tabs button{padding:12px;border-radius:16px;border:1px solid var(--line);background:var(--btn);color:var(--text);font-weight:900;cursor:pointer}.tabs button.active{background:var(--accent);border-color:transparent;color:#fff}h1{margin:0 0 10px 0}.muted{margin:0 0 18px 0;color:var(--muted);line-height:1.5}.field + .field{margin-top:14px}label{display:block;margin-bottom:6px;color:var(--muted);font-size:14px}input{width:100%;padding:13px 14px;border-radius:16px;border:1px solid var(--line);background:transparent;color:var(--text)}.primary{width:100%;margin-top:18px;padding:14px;border:none;border-radius:16px;background:var(--accent);color:#fff;font-weight:900;cursor:pointer}.message{margin:14px 0 0 0;padding:12px 14px;border-radius:14px;font-weight:700}.message.ok{background:rgba(108,180,78,.14);color:#2f6e1c}.message.error{background:rgba(239,68,68,.14);color:#b91c1c}
</style>
