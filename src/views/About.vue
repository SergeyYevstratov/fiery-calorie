<template>
<div class="page">
  <section class="card hero">
    <h1>{{ lang === 'eng' ? 'About the project' : 'Про проєкт' }}</h1>
    <p>
      {{ lang === 'eng'
        ? 'FIERY CALORIE is a coursework project created as a full web application for calorie and nutrition calculations. The idea of the project is not just to show a single formula, but to build a convenient interactive service with a clear interface, practical functions, and modern responsive design.'
        : 'FIERY CALORIE — це курсова робота, виконана у форматі повноцінного вебдодатку для розрахунку калорійності та основних показників харчування. Ідея проєкту полягає не просто в демонстрації однієї формули, а у створенні зручного інтерактивного сервісу з продуманим інтерфейсом, корисною функціональністю та сучасним адаптивним дизайном.' }}
    </p>
  </section>

  <section class="card">
    <h2>{{ lang === 'eng' ? '1. Purpose of the coursework' : '1. Призначення курсової роботи' }}</h2>
    <p>
      {{ lang === 'eng'
        ? 'The main purpose of this coursework is to design and implement a web application that helps users quickly estimate their daily calorie needs, body mass index, basal metabolic rate, and macronutrient distribution depending on a selected goal.'
        : 'Основна мета цієї курсової роботи — спроєктувати та реалізувати вебдодаток, який допомагає користувачеві швидко визначити добову потребу в калоріях, індекс маси тіла, базальний обмін речовин і розподіл макронутрієнтів відповідно до обраної цілі.' }}
    </p>
    <p>
      {{ lang === 'eng'
        ? 'The project combines theory and practice: formulas are used correctly, user data is processed on the page, results are displayed clearly, and the interface remains understandable both on desktop and mobile devices.'
        : 'Проєкт поєднує теоретичну й практичну частину: у ньому коректно застосовуються формули, обробляються введені користувачем дані, результати подаються зрозуміло, а інтерфейс залишається зручним як на комп’ютері, так і на мобільних пристроях.' }}
    </p>
  </section>

  <section class="card">
    <h2>{{ lang === 'eng' ? '2. Why it is a web application' : '2. Чому це саме вебдодаток' }}</h2>
    <p>
      {{ lang === 'eng'
        ? 'This project is implemented specifically as a web application. It works in the browser, does not require separate installation for the end user, supports page navigation, local data storage, theme switching, language switching, account pages, and responsive layout.'
        : 'Цей проєкт реалізований саме як вебдодаток. Він працює у браузері, не потребує окремого встановлення для кінцевого користувача, підтримує навігацію між сторінками, локальне збереження даних, перемикання теми, зміну мови інтерфейсу, сторінки акаунта та адаптивну верстку.' }}
    </p>
    <p>
      {{ lang === 'eng'
        ? 'Because of this, the result looks like a real online service, not like a static HTML page. The user can interact with the interface, save history, change goals, use the desired-weight slider, and receive updated calculations immediately.'
        : 'Завдяки цьому результат виглядає як справжній онлайн-сервіс, а не як статична HTML-сторінка. Користувач може взаємодіяти з інтерфейсом, зберігати історію, змінювати цілі, використовувати повзунок бажаної ваги та миттєво отримувати оновлені розрахунки.' }}
    </p>
  </section>

  <section class="card">
    <h2>{{ lang === 'eng' ? '3. Main functionality' : '3. Основні можливості проєкту' }}</h2>
    <div class="featureGrid">
      <div class="featureItem">{{ lang === 'eng' ? 'Calculation of BMR using the Mifflin–St Jeor formula' : 'Розрахунок BMR за формулою Міфліна — Сан Жеора' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Calculation of TDEE according to activity level' : 'Розрахунок TDEE з урахуванням рівня активності' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'BMI calculation and interpretation of the result' : 'Обчислення BMI та пояснення результату' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Support for goals: weight loss, maintenance, gain' : 'Підтримка цілей: схуднення, підтримка форми, набір маси' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Macronutrient distribution in grams and percentages' : 'Розподіл макронутрієнтів у грамах і відсотках' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Desired body weight slider for more flexible planning' : 'Повзунок бажаної маси тіла для більш гнучкого планування' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Local history of calculations' : 'Локальна історія розрахунків' }}</div>
      <div class="featureItem">{{ lang === 'eng' ? 'Profile pages, themes, and two interface languages' : 'Сторінки профілю, теми оформлення та дві мови інтерфейсу' }}</div>
    </div>
  </section>

  <section class="card twoCols">
    <div>
      <h2>{{ lang === 'eng' ? '4. Technologies' : '4. Використані технології' }}</h2>
      <p>
        {{ lang === 'eng'
          ? 'The interface is built with Vue and Vite. The project uses component structure, routing between pages, localStorage for saved data, and a responsive layout adapted to different screen sizes.'
          : 'Інтерфейс побудований за допомогою Vue та Vite. У проєкті використано компонентний підхід, маршрутизацію між сторінками, localStorage для збереження даних і адаптивну верстку для різних розмірів екрана.' }}
      </p>
    </div>
    <div>
      <h2>{{ lang === 'eng' ? '5. Practical value' : '5. Практичне значення' }}</h2>
      <p>
        {{ lang === 'eng'
          ? 'The completed coursework demonstrates not only interface design, but also real practical use. The application can be used repeatedly for personal calculations and can serve as a base for further development of a larger health or fitness service.'
          : 'Готова курсова робота демонструє не лише оформлення інтерфейсу, а й реальну практичну користь. Додаток можна використовувати повторно для особистих розрахунків, а також розвивати далі як основу для більшого сервісу у сфері здоров’я та фітнесу.' }}
      </p>
    </div>
  </section>

  <section class="card">
    <h2>{{ lang === 'eng' ? '6. Final result' : '6. Підсумок реалізації' }}</h2>
    <p>
      {{ lang === 'eng'
        ? 'As a result, the coursework was implemented as a complete web application with a structured interface, responsive design, understandable pages, and useful calculation tools. The project looks like a finished product and can be presented as a serious educational web solution.'
        : 'У підсумку курсова робота реалізована як завершений вебдодаток зі структурованим інтерфейсом, адаптивним дизайном, зрозумілими сторінками та корисними інструментами розрахунку. Проєкт виглядає як готовий продукт і може бути представлений як серйозне навчальне вебрішення.' }}
    </p>
  </section>
</div>
</template>

<script setup>
import { useI18n } from '../services/i18n'
const { lang } = useI18n()
</script>

<style scoped>
.page{display:grid;gap:18px}
.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:22px;box-shadow:var(--shadow)}
.hero p{font-size:17px;line-height:1.8}
h1{margin:0 0 14px 0}
h2{margin:0 0 10px 0}
p{line-height:1.75;margin:0 0 12px 0}
p:last-child{margin-bottom:0}
.twoCols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.featureGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
.featureItem{background:var(--btn);border:1px solid var(--line);border-radius:16px;padding:14px;line-height:1.6}
@media (max-width:760px){.twoCols,.featureGrid{grid-template-columns:1fr}}
</style>
