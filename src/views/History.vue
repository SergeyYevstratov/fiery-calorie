<template>
  <div class="page" v-if="loggedIn">
    <section class="card">
      <div class="headRow">
        <div>
          <h1>{{ t('history') }}</h1>
          <p class="muted">{{ t('historyHint') }}</p>
        </div>
        <button class="clearBtn" @click="doClear" v-if="items.length">{{ t('clearHistory') }}</button>
      </div>

      <div v-if="items.length" class="list">
        <article class="item" v-for="item in items" :key="item.id">
          <div class="top"><b>{{ item.goalTitle }}</b><span>{{ item.date }}</span></div>
          <div class="grid">
            <div><span>Calories</span><b>{{ item.target }} ккал</b></div>
            <div><span>BMR</span><b>{{ item.bmr }} ккал</b></div>
            <div><span>BMI</span><b>{{ item.bmi }}</b></div>
            <div><span>Params</span><b>{{ item.weight }} кг / {{ item.height }} см / {{ item.age }}</b></div>
          </div>
        </article>
      </div>

      <p v-else class="muted">Empty.</p>
    </section>
  </div>

  <div class="page" v-else>
    <section class="card">
      <h1>{{ t('history') }}</h1>
      <p class="muted">{{ t('loginFirst') }}</p>
      <RouterLink to="/auth" class="clearBtn linkBtn">{{ t('goToLogin') }}</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { clearHistory, getHistory, isAuthenticated } from '../services/profile'
import { useI18n } from '../services/i18n'
const { t } = useI18n()
const refresh = ref(0)
const loggedIn = computed(() => isAuthenticated())
const items = computed(() => { refresh.value; return getHistory() })
function doClear(){ clearHistory(); refresh.value++ }
</script>

<style scoped>
.page{display:grid;gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:22px;box-shadow:var(--shadow)}.headRow{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:14px}h1{margin:0 0 8px 0}.muted{color:var(--muted);line-height:1.55}.clearBtn{display:inline-block;padding:10px 14px;border-radius:14px;border:1px solid var(--line);background:var(--btn);color:var(--text);font-weight:800;cursor:pointer;text-decoration:none}.linkBtn{margin-top:10px}.list{display:grid;gap:12px}.item{background:var(--btn);border:1px solid var(--line);border-radius:18px;padding:14px}.top{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.top span{color:var(--muted);font-size:13px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.grid div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px}.grid span{display:block;color:var(--muted);font-size:13px;margin-bottom:6px}@media (max-width:700px){.headRow,.top{flex-direction:column}.grid{grid-template-columns:1fr}}
</style>
