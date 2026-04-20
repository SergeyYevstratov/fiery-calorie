<template>
<div class="grid">
  <section class="card formCard">
    <h2><span class="step">1</span> {{ t('step1') }}</h2>

    <div class="segmented genderSeg">
      <button type="button" :class="{active:form.gender==='female'}" @click="form.gender='female'">{{ t('female') }}</button>
      <button type="button" :class="{active:form.gender==='male'}" @click="form.gender='male'">{{ t('male') }}</button>
    </div>

    <div class="row2">
      <div>
        <label>{{ t('age') }}</label>
        <input type="number" v-model.number="form.age" min="10" max="99">
      </div>
      <div>
        <label>{{ t('activity') }}</label>
        <select v-model.number="form.activity">
          <option :value="1.2">{{ t('light') }}</option>
          <option :value="1.55">{{ t('medium') }}</option>
          <option :value="1.75">{{ t('high') }}</option>
        </select>
      </div>
    </div>

    <div class="row2">
      <div>
        <label>{{ t('height') }}</label>
        <input type="number" v-model.number="form.height" min="120" max="220">
      </div>
      <div>
        <label>{{ t('weight') }}</label>
        <input type="number" v-model.number="form.weight" min="30" max="250" step="0.1">
      </div>
    </div>

    <button class="primary" @click="apply">{{ justUpdated ? t('updated') : t('update') }}</button>
    <p class="hint">{{ t('hintSave') }}</p>
  </section>

  <section class="card resultCard">
    <h2 class="rowTitle">
      <span><span class="step">2</span> {{ t('step2') }}</span>
      <span class="plainHint">{{ t('decode') }}</span>
    </h2>

    <div class="resultBlock">
      <div class="resultHead">
        <div class="kpiTitle">{{ t('bmrTitle') }}</div>
        <div class="kpiValue">{{ bmr }} {{ t('kcalDay') }}</div>
      </div>
      <div class="subValue">= {{ bmrKj }} {{ t('kj') }}</div>
      <p class="explain">{{ t('bmrExplain') }}</p>
    </div>

    <div class="divider"></div>

    <div class="resultBlock">
      <div class="resultHead">
        <div class="kpiTitle">{{ t('bmiTitle') }}</div>
        <div class="kpiValue">{{ bmi }}</div>
      </div>
      <div class="bmiScale" aria-hidden="true">
        <span v-for="i in 6" :key="i" :class="{ active: i === bmiScaleIndex }"></span>
      </div>
      <div class="bmiText">{{ bmiLabel }}</div>
      <p class="explain">{{ t('bmiExplain') }}</p>
    </div>
  </section>

  <section class="card goalCard">
    <h2><span class="step">3</span> {{ t('step3') }}</h2>

    <div class="goalChooser">
      <label class="goalLabel">{{ t('goalWant') }}</label>
      <div class="segmented goalSeg">
        <button type="button" :class="{active:form.goal==='lose'}" @click="changeGoal('lose')">{{ t('lose') }}</button>
        <button type="button" :class="{active:form.goal==='gain'}" @click="changeGoal('gain')">{{ t('gain') }}</button>
        <button type="button" :class="{active:form.goal==='keep'}" @click="changeGoal('keep')">{{ t('keep') }}</button>
      </div>

      <div class="toggleRow">
        <span>{{ t('useDesiredWeight') }}</span>
        <button type="button" class="switch" :class="{on: form.useDesiredWeight}" @click="toggleDesiredWeight" :aria-pressed="form.useDesiredWeight">
          <span></span>
        </button>
      </div>

      <div class="desiredSlot" :class="{ active: form.useDesiredWeight }">
        <transition name="fade">
          <div v-if="form.useDesiredWeight" class="desiredRow">
            <div class="desiredHeader">
              <label>{{ t('desiredWeight') }}</label>
              <div class="desiredTop">
                <input class="desiredInput" type="number" v-model.number="form.desiredWeight" min="30" max="250" step="0.1" @input="syncDesiredWeight">
                <span class="kg">{{ t('grams') === 'г' ? 'кг' : 'kg' }}</span>
              </div>
            </div>
            <input class="slider" type="range" v-model.number="form.desiredWeight" :min="sliderMin" :max="sliderMax" step="0.5" @input="syncDesiredWeight">
            <div class="sliderMeta">
              <span>{{ sliderMin }} {{ lang === 'eng' ? 'kg' : 'кг' }}</span>
              <strong>{{ Number(form.desiredWeight).toFixed(1) }} {{ lang === 'eng' ? 'kg' : 'кг' }}</strong>
              <span>{{ sliderMax }} {{ lang === 'eng' ? 'kg' : 'кг' }}</span>
            </div>
          </div>
        </transition>
      </div>

      <p class="laterText">{{ t('canChangeGoal') }}</p>
    </div>

    <div class="goalBox">
      <div class="goalTitle">{{ t('dailyNorm') }}</div>
      <div class="goalValue">{{ target }} {{ t('kcal') }}</div>
      <div class="goalKj">= {{ targetKj }} {{ t('kj') }}</div>
      <div class="goalSub">{{ goalText }}</div>
    </div>

    <div class="goalContent">
      <div class="chartWrap">
        <svg width="200" height="200" viewBox="0 0 180 180" aria-label="Macros chart">
          <circle cx="90" cy="90" r="60" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="22" />
          <circle cx="90" cy="90" r="60" fill="none" :stroke="colors.p" stroke-width="22" :stroke-dasharray="dashP" stroke-dashoffset="0" transform="rotate(-90 90 90)" stroke-linecap="round"/>
          <circle cx="90" cy="90" r="60" fill="none" :stroke="colors.c" stroke-width="22" :stroke-dasharray="dashC" :stroke-dashoffset="offC" transform="rotate(-90 90 90)" stroke-linecap="round"/>
          <circle cx="90" cy="90" r="60" fill="none" :stroke="colors.f" stroke-width="22" :stroke-dasharray="dashF" :stroke-dashoffset="offF" transform="rotate(-90 90 90)" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="legend">
        <div class="legendRow"><span class="name"><span class="dot" :style="{background:colors.p}"></span><span class="macroName">{{ t('proteins') }}</span></span><b class="macroValue">{{ pG }} {{ t('grams') }}</b><span class="macroPercent">{{ pctP }}%</span></div>
        <div class="legendRow"><span class="name"><span class="dot" :style="{background:colors.c}"></span><span class="macroName">{{ t('carbs') }}</span></span><b class="macroValue">{{ cG }} {{ t('grams') }}</b><span class="macroPercent">{{ pctC }}%</span></div>
        <div class="legendRow"><span class="name"><span class="dot" :style="{background:colors.f}"></span><span class="macroName">{{ t('fats') }}</span></span><b class="macroValue">{{ fG }} {{ t('grams') }}</b><span class="macroPercent">{{ pctF }}%</span></div>
      </div>
    </div>
  </section>
</div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { addHistoryItem, getProfileFormKey } from '../services/profile'
import { useI18n } from '../services/i18n'

const { t, lang } = useI18n()
const defaultForm = {
  gender: 'male',
  age: 20,
  height: 170,
  weight: 70,
  desiredWeight: 70,
  useDesiredWeight: false,
  activity: 1.55,
  goal: 'keep'
}

const form = reactive({ ...defaultForm })
const applied = reactive({ ...defaultForm })

function storageKey(){ return getProfileFormKey() }

try{
  const saved = JSON.parse(localStorage.getItem(storageKey()) || 'null')
  if(saved){
    Object.assign(form, defaultForm, saved)
    Object.assign(applied, defaultForm, saved)
    if (!saved.desiredWeight) {
      form.desiredWeight = saved.weight || defaultForm.weight
      applied.desiredWeight = saved.weight || defaultForm.weight
    }
  }
}catch{}

function apply(saveToHistory = true){
  Object.assign(applied, JSON.parse(JSON.stringify(form)))
  localStorage.setItem(storageKey(), JSON.stringify(applied))
  if (!saveToHistory) return
  addHistoryItem({
    id: Date.now(),
    date: new Date().toLocaleString(lang.value === 'eng' ? 'en-GB' : 'uk-UA'),
    goalTitle: goalText.value,
    target: target.value,
    bmr: bmr.value,
    bmi: bmi.value,
    age: applied.age,
    height: applied.height,
    weight: applied.weight,
  })
}

function changeGoal(goal){
  form.goal = goal
  if (goal === 'lose' && form.desiredWeight >= form.weight) form.desiredWeight = Math.max(30, Number((form.weight - 5).toFixed(1)))
  if (goal === 'gain' && form.desiredWeight <= form.weight) form.desiredWeight = Number((form.weight + 5).toFixed(1))
  if (goal === 'lose' && form.useDesiredWeight && form.desiredWeight >= form.weight) form.desiredWeight = Math.max(30, Number((form.weight - 5).toFixed(1)))
  if (goal === 'gain' && form.useDesiredWeight && form.desiredWeight <= form.weight) form.desiredWeight = Number((form.weight + 5).toFixed(1))
  if (goal === 'keep' && form.useDesiredWeight) {
    const base = Number(form.weight || 70)
    if (Math.abs(form.desiredWeight - base) > 5) form.desiredWeight = base
  }
  apply()
}

function toggleDesiredWeight(){
  form.useDesiredWeight = !form.useDesiredWeight
  if (form.useDesiredWeight) {
    if (form.goal === 'lose' && form.desiredWeight >= form.weight) form.desiredWeight = Math.max(30, Number((form.weight - 5).toFixed(1)))
    if (form.goal === 'gain' && form.desiredWeight <= form.weight) form.desiredWeight = Number((form.weight + 5).toFixed(1))
    if (form.goal === 'keep') form.desiredWeight = Number(form.weight || 70)
  }
  apply(false)
}

function syncDesiredWeight(){
  const base = Number(form.weight || 70)
  if (form.goal === 'lose' && form.desiredWeight >= base) {
    form.desiredWeight = Math.max(30, Number((base - 0.5).toFixed(1)))
  }
  if (form.goal === 'gain' && form.desiredWeight <= base) {
    form.desiredWeight = Number((base + 0.5).toFixed(1))
  }
  if (form.goal === 'keep') {
    const min = Math.max(30, Number((base - 5).toFixed(1)))
    const max = Math.min(250, Number((base + 5).toFixed(1)))
    if (form.desiredWeight < min) form.desiredWeight = min
    if (form.desiredWeight > max) form.desiredWeight = max
  }
  apply(false)
}

watch(() => form.weight, (value) => {
  if (form.goal === 'keep' && form.useDesiredWeight) {
    const min = Math.max(30, Number((value - 5).toFixed(1)))
    const max = Math.min(250, Number((value + 5).toFixed(1)))
    if (form.desiredWeight < min) form.desiredWeight = min
    if (form.desiredWeight > max) form.desiredWeight = max
    apply(false)
    return
  }
  if (form.goal === 'keep') {
    form.desiredWeight = value
    apply(false)
    return
  }
  if (form.goal === 'lose' && form.useDesiredWeight && form.desiredWeight >= value) {
    form.desiredWeight = Math.max(30, Number((value - 0.5).toFixed(1)))
  }
  if (form.goal === 'gain' && form.useDesiredWeight && form.desiredWeight <= value) {
    form.desiredWeight = Number((value + 0.5).toFixed(1))
  }
})

const sliderMin = computed(() => {
  const base = Number(form.weight || 70)
  if (form.goal === 'lose') return 30
  if (form.goal === 'gain') return Math.min(249.5, Number((base + 0.5).toFixed(1)))
  return Math.max(30, Number((base - 5).toFixed(1)))
})
const sliderMax = computed(() => {
  const base = Number(form.weight || 70)
  if (form.goal === 'lose') return Math.max(30, Number((base - 0.5).toFixed(1)))
  if (form.goal === 'gain') return 250
  return Math.min(250, Number((base + 5).toFixed(1)))
})

const macroSets = {
  keep: { p: 0.25, c: 0.47, f: 0.28 },
  lose: { p: 0.28, c: 0.43, f: 0.29 },
  gain: { p: 0.25, c: 0.49, f: 0.26 }
}

const bmr = computed(() => {
  const w = Number(applied.weight) || 0
  const h = Number(applied.height) || 0
  const a = Number(applied.age) || 0
  const val = applied.gender === 'male' ? (10*w + 6.25*h - 5*a + 5) : (10*w + 6.25*h - 5*a - 161)
  return Math.round(val)
})
const bmrKj = computed(() => Math.round(bmr.value * 4.184))
const bmi = computed(() => {
  const w = Number(applied.weight) || 0
  const hm = (Number(applied.height) || 0) / 100
  if(!hm) return '0.00'
  return (w / (hm * hm)).toFixed(2)
})
const bmiLabel = computed(() => {
  const x = parseFloat(bmi.value)
  if (x < 18.5) return t('under')
  if (x < 25) return t('normal')
  if (x < 30) return t('over')
  return t('obesity')
})
const bmiScaleIndex = computed(() => {
  const x = parseFloat(bmi.value)
  if (x < 18.5) return 2
  if (x < 25) return 3
  if (x < 30) return 4
  return 5
})
const tdee = computed(() => Math.round(bmr.value * (Number(applied.activity) || 1)))
const target = computed(() => {
  let t = tdee.value
  const current = Number(applied.weight) || 0
  const desired = Number(applied.desiredWeight) || current
  if (applied.goal === 'lose') {
    if (applied.useDesiredWeight && desired < current) {
      const diff = Math.max(0, current - desired)
      const cutPct = Math.min(0.2, 0.1 + diff / Math.max(current, 1) * 0.25)
      t *= (1 - cutPct)
    } else {
      t *= 0.85
    }
  }
  if (applied.goal === 'gain') {
    if (applied.useDesiredWeight && desired > current) {
      const diff = Math.max(0, desired - current)
      const addPct = Math.min(0.15, 0.05 + diff / Math.max(current, 1) * 0.2)
      t *= (1 + addPct)
    } else {
      t *= 1.1
    }
  }
  return Math.round(t)
})
const targetKj = computed(() => Math.round(target.value * 4.184))
const goalText = computed(() => applied.goal === 'lose' ? t('lose') : applied.goal === 'gain' ? t('gain') : t('keep'))
const pctP = computed(() => Math.round((macroSets[applied.goal]?.p || 0) * 100))
const pctC = computed(() => Math.round((macroSets[applied.goal]?.c || 0) * 100))
const pctF = computed(() => Math.round((macroSets[applied.goal]?.f || 0) * 100))
const pG = computed(() => Math.round((target.value * (macroSets[applied.goal]?.p || 0)) / 4))
const cG = computed(() => Math.round((target.value * (macroSets[applied.goal]?.c || 0)) / 4))
const fG = computed(() => Math.round((target.value * (macroSets[applied.goal]?.f || 0)) / 9))
const CIRC = 2 * Math.PI * 60
const dashP = computed(() => `${CIRC * (macroSets[applied.goal]?.p || 0)} ${CIRC}`)
const dashC = computed(() => `${CIRC * (macroSets[applied.goal]?.c || 0)} ${CIRC}`)
const dashF = computed(() => `${CIRC * (macroSets[applied.goal]?.f || 0)} ${CIRC}`)
const offC = computed(() => -(CIRC * (macroSets[applied.goal]?.p || 0)))
const offF = computed(() => -(CIRC * ((macroSets[applied.goal]?.p || 0) + (macroSets[applied.goal]?.c || 0))))
const colors = { p: '#ef4444', c: '#3b82f6', f: '#f59e0b' }
const justUpdated = ref(false)
watch(applied, () => {
  justUpdated.value = true
  setTimeout(() => justUpdated.value = false, 900)
}, { deep: true })

apply(false)
</script>

<style scoped>
.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;align-items:stretch}
.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:16px;box-shadow:var(--shadow);display:flex;flex-direction:column;height:100%;min-height:560px}
.rowTitle{display:flex;justify-content:space-between;align-items:center;gap:10px}.plainHint{color:var(--accent);font-weight:800;font-size:14px}
h2{margin:0 0 10px 0;font-size:20px}.step{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:999px;background:rgba(108,180,78,.15);color:var(--accent);font-weight:900;margin-right:10px}
.segmented{display:grid;gap:10px}.genderSeg{grid-template-columns:1fr 1fr;margin-bottom:12px}.goalSeg{grid-template-columns:1fr 1fr 1fr}.segmented button{border:none;background:var(--btn);color:var(--text);padding:12px 10px;border-radius:18px;font-weight:900;cursor:pointer;line-height:1.12;min-height:64px;display:flex;align-items:center;justify-content:center;text-align:center;transition:.2s}.segmented button:hover{transform:translateY(-1px)}.segmented button.active{background:var(--accent);color:#fff;transform:scale(1.01);box-shadow:0 4px 12px rgba(0,0,0,.08)}.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:10px}label{display:block;font-size:14px;color:var(--muted);margin-bottom:8px}input,select{width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:18px;background:transparent;color:var(--text)}
.primary{margin-top:2px;border:none;background:var(--accent);color:#fff;font-weight:900;padding:14px;border-radius:18px;cursor:pointer;transition:.2s}.primary:hover{filter:brightness(.98);transform:translateY(-1px)}.hint{margin:10px 0 0 0;color:var(--muted);line-height:1.4}.resultHead{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.kpiTitle{color:var(--muted);font-size:15px}.kpiValue{font-size:27px;font-weight:950;text-align:right}.subValue{margin-top:2px;color:var(--muted);font-size:15px;text-align:right}.explain{margin:10px 0 0 0;color:var(--muted);line-height:1.38}.divider{height:1px;background:var(--line);margin:14px 0}.bmiScale{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin:12px 0 8px}.bmiScale span{height:18px;background:#cdd2da;border-radius:999px}.bmiScale span.active{background:#eab308}.bmiText{font-size:18px;font-weight:900;color:var(--accent)}
.goalCard{overflow:hidden}.goalChooser{display:grid;gap:8px}.goalLabel{margin:0}.toggleRow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:2px}.switch{width:58px;height:32px;border:none;border-radius:999px;background:#cfd5dc;position:relative;cursor:pointer;transition:.2s;flex:0 0 auto}.switch span{position:absolute;top:4px;left:4px;width:24px;height:24px;border-radius:50%;background:white;box-shadow:0 2px 6px rgba(0,0,0,.18);transition:.2s}.switch.on{background:var(--accent)}.switch.on span{left:30px}
.desiredSlot{min-height:102px;display:flex;align-items:stretch;opacity:.35;transition:opacity .18s ease}.desiredSlot:not(.active){pointer-events:none}.desiredSlot.active{opacity:1}.desiredRow{display:grid;gap:6px;background:var(--btn);border:1px solid var(--line);border-radius:18px;padding:10px;width:100%;height:100%}.sliderMeta{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;color:var(--muted);font-size:13px}.sliderMeta strong{justify-self:center;color:var(--text);white-space:nowrap}.desiredHeader{display:flex;align-items:center;justify-content:space-between;gap:12px}.desiredTop{display:flex;align-items:center;gap:8px}.desiredInput{width:98px;text-align:right;padding-right:12px;background:var(--card)}.kg{font-weight:800;color:var(--text)}.slider{padding:0;border:none;border-radius:999px;accent-color:var(--accent);cursor:pointer}.laterText{margin:0;color:var(--muted);line-height:1.35}
.goalBox{margin-top:6px;background:rgba(108,180,78,.12);border:1px solid rgba(108,180,78,.2);border-radius:24px;padding:14px 16px;text-align:center}.goalTitle{font-size:16px;color:var(--muted)}.goalValue{font-size:28px;font-weight:950;margin-top:2px}.goalKj{font-size:16px;font-weight:900;margin-top:2px}.goalSub{margin-top:6px;color:var(--muted);font-weight:800}.goalContent{display:grid;grid-template-columns:160px minmax(0,1fr);gap:12px;align-items:center;margin-top:8px}.chartWrap{display:flex;align-items:center;justify-content:center}.chartWrap svg{width:160px;height:160px}.legend{display:grid;gap:10px}.legendRow{display:grid;grid-template-columns:minmax(0,1fr) 72px 40px;gap:12px;align-items:center;font-size:16px}.legendRow b{justify-self:end;white-space:nowrap;display:block;width:100%;text-align:right;font-variant-numeric:tabular-nums}.legendRow span:last-child{justify-self:end;white-space:nowrap;display:block;width:100%;text-align:right;font-variant-numeric:tabular-nums}.name{display:flex;align-items:center;gap:10px;min-width:0;white-space:nowrap}.dot{width:14px;height:14px;border-radius:50%;flex:0 0 auto}.fade-enter-active,.fade-leave-active{transition:all .18s ease}.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-6px)}
@media (max-width:1200px){.grid{grid-template-columns:1fr 1fr}.goalCard{grid-column:1 / -1}.card{min-height:auto;height:auto}.goalContent{grid-template-columns:220px 1fr}.desiredSlot{min-height:102px}}
@media (max-width:760px){.grid{grid-template-columns:1fr}.card{min-height:auto}.row2,.goalContent,.desiredHeader{grid-template-columns:1fr;display:grid}.resultHead{flex-direction:column}.kpiValue,.subValue{text-align:left}.goalContent{gap:10px}.chartWrap svg{width:170px;height:170px}.legendRow{font-size:16px;grid-template-columns:minmax(0,1fr) 72px 40px}.desiredTop{justify-content:flex-start}.goalValue{font-size:30px}.segmented button{min-height:62px;padding:14px 10px}.goalSeg{grid-template-columns:1fr}.toggleRow{align-items:center}.desiredSlot{min-height:auto;opacity:1}.desiredSlot:not(.active){display:none}.name{white-space:normal}}
</style>