<template>
<div class="page">
  <section class="card hero">
    <h1>{{ t('infoTitle') }}</h1>
    <p>{{ t('helpIntroText') }}</p>
  </section>

  <section class="card">
    <h2>{{ t('helpBmrTitle') }}</h2>
    <p>{{ t('helpBmrText1') }}</p>
    <p>{{ t('helpBmrText2') }}</p>
    <p class="mono"><b>{{ lang === 'eng' ? 'Men:' : 'Чоловіки:' }}</b> BMR = 10 × weight + 6.25 × height − 5 × age + 5</p>
    <p class="mono"><b>{{ lang === 'eng' ? 'Women:' : 'Жінки:' }}</b> BMR = 10 × weight + 6.25 × height − 5 × age − 161</p>
  </section>

  <section class="card">
    <h2>{{ t('helpTdeeTitle') }}</h2>
    <p>{{ t('helpTdeeText1') }}</p>
    <p>{{ t('helpTdeeText2') }}</p>
    <p class="mono"><b>TDEE = BMR × {{ lang === 'eng' ? 'activity multiplier' : 'коефіцієнт активності' }}</b></p>
    <div class="table oneCol">
      <div><b>{{ t('light') }}</b><span>1.2</span></div>
      <div><b>{{ t('medium') }}</b><span>1.55</span></div>
      <div><b>{{ t('high') }}</b><span>1.75</span></div>
    </div>
  </section>

  <section class="card">
    <h2>{{ t('helpBmiTitle') }}</h2>
    <p>{{ t('helpBmiText1') }}</p>
    <p>{{ t('helpBmiText2') }}</p>
    <p class="mono"><b>BMI = {{ lang === 'eng' ? 'weight / (height in metres × height in metres)' : 'вага / (ріст у метрах × ріст у метрах)' }}</b></p>
  </section>

  <section class="card">
    <h2>{{ t('helpGoalTitle') }}</h2>
    <p>{{ t('helpGoalText1') }}</p>
    <p>{{ t('helpGoalText2') }}</p>
  </section>

  <section class="card">
    <h2>{{ t('helpMacrosTitle') }}</h2>
    <p>{{ t('helpMacrosText1') }}</p>
    <p>{{ t('helpMacrosText2') }}</p>
  </section>

  <section class="card">
    <h2>{{ lang === 'eng' ? '7. Interface tips' : '7. Поради щодо використання інтерфейсу' }}</h2>
    <p>{{ lang === 'eng' ? 'If you want a more precise recommendation for weight loss or gain, enable the desired body weight switch in the third block and move the slider to the target value. When the goal is maintenance, this option can stay disabled.' : 'Якщо потрібна точніша рекомендація для схуднення або набору маси, увімкніть перемикач бажаної маси тіла у третьому блоці та пересуньте повзунок до потрібного значення. Якщо ціль — підтримка форми, цей параметр можна не вмикати.' }}</p>
    <p>{{ lang === 'eng' ? 'The website also supports two interface languages, theme switching, profile pages, and saved history. Thanks to this, the calculator remains convenient during repeated use.' : 'Сайт також підтримує дві мови інтерфейсу, перемикання теми, сторінки профілю та збережену історію. Завдяки цьому калькулятор залишається зручним і при повторному використанні.' }}</p>
  </section>

  <section class="card">
    <h2>{{ t('helpHistoryTitle') }}</h2>
    <p>{{ t('helpHistoryText') }}</p>
  </section>
</div>
</template>

<script setup>
import { useI18n } from '../services/i18n'
const { t, lang } = useI18n()
</script>

<style scoped>
.page{display:grid;gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:22px;box-shadow:var(--shadow)}.hero p{font-size:17px;line-height:1.7}h1{margin:0 0 14px 0}h2{margin:0 0 10px 0}p{line-height:1.7}.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;line-height:1.6}.table{display:grid;gap:12px;margin-top:12px}.table div{background:var(--btn);border:1px solid var(--line);border-radius:16px;padding:12px;display:grid;gap:8px}
</style>
