<template>
  <div class="page" v-if="loggedIn">
    <section class="card">
      <div class="head">
        <div class="avatar">👤</div>
        <div>
          <h1>{{ t('account') }}</h1>
          <p class="muted">{{ t('profileHint') }}</p>
        </div>
      </div>

      <div class="formGrid">
        <div>
          <label>{{ t('name') }}</label>
          <input v-model.trim="profile.name" :placeholder="t('yourName')">
        </div>
        <div>
          <label>{{ t('email') }}</label>
          <input v-model.trim="profile.email" type="email" placeholder="name@example.com">
        </div>
      </div>

      <div class="actions"><button class="action" @click="save">{{ t('saveData') }}</button></div>
      <p v-if="message" :class="['message', saveOk ? 'ok' : 'error']">{{ message }}</p>
    </section>

    <section class="card" v-if="savedForm">
      <h2>{{ t('savedParams') }}</h2>
      <div class="dataGrid">
        <div><span>{{ t('gender') || 'Gender' }}:</span><b>{{ savedForm.gender === 'male' ? t('male') : t('female') }}</b></div>
        <div><span>{{ t('age') }}:</span><b>{{ savedForm.age }}</b></div>
        <div><span>{{ t('height') }}:</span><b>{{ savedForm.height }} см</b></div>
        <div><span>{{ t('weight') }}:</span><b>{{ savedForm.weight }} кг</b></div>
        <div><span>{{ t('activity') }}:</span><b>{{ activityText(savedForm.activity) }}</b></div>
        <div><span>{{ t('step3') }}:</span><b>{{ goalText(savedForm.goal) }}</b></div>
      </div>
    </section>

    <section class="card" v-else>
      <h2>{{ t('savedParams') }}</h2>
      <p class="muted">{{ t('noDataYet') }}</p>
    </section>
  </div>

  <div class="page" v-else>
    <section class="card">
      <h1>{{ t('account') }}</h1>
      <p class="muted">{{ t('loginFirst') }}</p>
      <RouterLink to="/auth" class="action linkBtn">{{ t('goToLogin') }}</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getProfile, getProfileFormKey, isAuthenticated, updateCurrentUser } from '../services/profile'
import { useI18n } from '../services/i18n'
const { t } = useI18n()
const emit = defineEmits(['auth-changed'])
const loggedIn = computed(() => isAuthenticated())
const profile = reactive({ ...(getProfile() || { name: '', email: '' }) })
const message = ref('')
const saveOk = ref(false)
const savedForm = computed(() => { try { return JSON.parse(localStorage.getItem(getProfileFormKey()) || 'null') } catch { return null } })
function save(){ const result = updateCurrentUser(profile); saveOk.value = !!result?.ok; message.value = result?.message || (result?.ok ? 'Saved' : 'Error'); if (result?.ok) emit('auth-changed') }
function activityText(v){ const x = Number(v); if (x === 1.2) return t('light'); if (x === 1.55) return t('medium'); if (x === 1.75) return t('high'); return '—' }
function goalText(v){ if (v === 'lose') return t('lose'); if (v === 'gain') return t('gain'); return t('keep') }
</script>

<style scoped>
.page{display:grid;gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:22px;box-shadow:var(--shadow)}.head{display:flex;align-items:center;gap:14px;margin-bottom:16px}.avatar{width:56px;height:56px;border-radius:16px;background:var(--btn);display:grid;place-items:center;font-size:28px}h1,h2{margin:0 0 10px 0}.muted{color:var(--muted);line-height:1.55}.formGrid,.dataGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}label{display:block;margin-bottom:6px;color:var(--muted);font-size:13px}input,.dataGrid div{width:100%;background:var(--btn);border:1px solid var(--line);border-radius:16px;padding:14px;color:var(--text)}.dataGrid span{display:block;color:var(--muted);font-size:13px;margin-bottom:6px}.actions{margin-top:14px}.action{display:inline-block;padding:12px 16px;border-radius:14px;background:var(--accent);color:#fff;text-decoration:none;font-weight:900;border:none;cursor:pointer}.linkBtn{margin-top:10px}.message{margin:14px 0 0 0;padding:12px 14px;border-radius:14px;font-weight:700}.message.ok{background:rgba(108,180,78,.14);color:#2f6e1c}.message.error{background:rgba(239,68,68,.14);color:#b91c1c}@media (max-width:700px){.formGrid,.dataGrid{grid-template-columns:1fr}}
</style>
