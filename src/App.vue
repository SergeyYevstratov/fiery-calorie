<template>
  <div :class="['app', theme]">
    <header class="header">
      <div class="container headerRow">
        <RouterLink to="/" class="brandLink">
          <LogoMark class="logoImg" />
          <div class="brand brandStack">
            <div class="title">FIERY</div>
            <div class="subtitle">CALORIE</div>
          </div>
        </RouterLink>

        <nav class="nav desktopNav">
          <RouterLink to="/" class="navbtn">{{ t('calc') }}</RouterLink>
          <RouterLink to="/info" class="navbtn">{{ t('info') }}</RouterLink>
          <RouterLink to="/about" class="navbtn">{{ t('about') }}</RouterLink>

          <template v-if="loggedIn">
            <div class="dropdownWrap" @keydown.esc="dropdownOpen = false">
              <button class="navbtn cabinetBtn" @click="dropdownOpen = !dropdownOpen">
                👤 {{ t('account') }}
              </button>
              <div v-if="dropdownOpen" class="dropdownMenu">
                <RouterLink to="/account" class="dropItem" @click="dropdownOpen = false">{{ t('account') }}</RouterLink>
                <RouterLink to="/history" class="dropItem" @click="dropdownOpen = false">{{ t('history') }}</RouterLink>
                <button class="dropItem danger" @click="doLogout">{{ t('logout') }}</button>
              </div>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/auth" class="navbtn cabinetBtn primaryNav">{{ t('login') }}</RouterLink>
          </template>

          <button class="navbtn icon" @click="toggleTheme" :title="theme==='light' ? t('themeDark') : t('themeLight')">
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>
        </nav>

        <button class="burger" @click="mobileOpen = true" :aria-label="t('menu')">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="backdrop" v-if="mobileOpen || dropdownOpen" @click="closeAll"></div>
      <aside class="drawer" :class="{open: mobileOpen}" @click.stop>
        <div class="drawerHead">
          <RouterLink to="/" class="drawerBrand" @click="mobileOpen=false">
            <LogoMark class="logoSm" />
            <div>
              <div class="dTitle brandStackMobile">FIERY<span>CALORIE</span></div>
              <div class="dSub">{{ t('menu') }}</div>
            </div>
          </RouterLink>
          <button class="close" @click="mobileOpen=false" aria-label="Close">✕</button>
        </div>

        <div class="drawerLinks">
          <RouterLink to="/" class="dLink" @click="mobileOpen=false">{{ t('calc') }}</RouterLink>
          <RouterLink to="/info" class="dLink" @click="mobileOpen=false">{{ t('info') }}</RouterLink>
          <RouterLink to="/about" class="dLink" @click="mobileOpen=false">{{ t('about') }}</RouterLink>
          <template v-if="loggedIn">
            <RouterLink to="/account" class="dLink" @click="mobileOpen=false">{{ t('account') }}</RouterLink>
            <RouterLink to="/history" class="dLink" @click="mobileOpen=false">{{ t('history') }}</RouterLink>
            <button class="dLink dBtn" @click="doLogout">{{ t('logout') }}</button>
          </template>
          <template v-else>
            <RouterLink to="/auth" class="dLink" @click="mobileOpen=false">{{ t('login') }}</RouterLink>
          </template>
        </div>

        <div class="drawerActions">
          <button class="dAction" @click="toggleTheme">
            {{ theme === 'light' ? t('themeDark') : t('themeLight') }}
          </button>
        </div>
      </aside>
    </header>

    <main class="content">
      <div class="container pageContainer">
        <router-view @auth-changed="refreshAuth" />
      </div>
    </main>

    <footer class="footer">
      <div class="container footerRow">
        <RouterLink to="/" class="footerBrand">
          <LogoMark class="footerLogo" />
          <div class="footerStack">
            <span>FIERY</span>
            <small>CALORIE</small>
          </div>
        </RouterLink>

        <div class="footerRight">
          <span class="copy">© 2026</span>
          <div class="langSwitch">
            <button class="langBtn" :class="{active: lang === 'ua'}" @click="setLang('ua')">UA</button>
            <span>|</span>
            <button class="langBtn" :class="{active: lang === 'eng'}" @click="setLang('eng')">ENG</button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from './services/profile'
import { useI18n } from './services/i18n'
import LogoMark from './components/LogoMark.vue'

const router = useRouter()
const { lang, t, setLang } = useI18n()
const theme = ref('light')
const mobileOpen = ref(false)
const dropdownOpen = ref(false)
const authVersion = ref(0)

const loggedIn = computed(() => {
  authVersion.value
  return isAuthenticated()
})

onMounted(() => {
  theme.value = localStorage.getItem('theme') || 'light'
})

function refreshAuth() { authVersion.value++ }
function toggleTheme(){
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
function closeAll() { mobileOpen.value = false; dropdownOpen.value = false }
function doLogout() {
  logout()
  closeAll()
  refreshAuth()
  router.push('/auth')
}
</script>

<style>
:root{
  --bg:#f4f5f7;
  --text:#0f172a;
  --card:#ffffff;
  --muted:#64748b;
  --line:#e5e7eb;
  --shadow:0 10px 25px rgba(0,0,0,.06);
  --accent:#6cb44e;
  --btn:#eef2f7;
}

.dark{
  --bg:#0b1220;
  --text:#e5e7eb;
  --card:#0f172a;
  --muted:#94a3b8;
  --line:#1f2937;
  --shadow:0 14px 30px rgba(0,0,0,.35);
  --accent:#6cb44e;
  --btn:#111c2f;
}

*{
  box-sizing:border-box;
}

html,body,#app{
  min-height:100%;
  width:100%;
}

body{
  margin:0;
  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  font-size:14px;
  line-height:1.4;
  background:var(--bg);
  color:var(--text);
}

button,input,select{
  font:inherit;
}

a{
  color:inherit;
}

.app{
  min-height:100vh;
  background:var(--bg);
  color:var(--text);
  display:flex;
  flex-direction:column;
}

.container{
  width:min(1180px, calc(100% - 32px));
  margin:0 auto;
}

.pageContainer{
  flex:1;
  display:flex;
  flex-direction:column;
}

.header{
  position:sticky;
  top:0;
  z-index:20;
  background:var(--card);
  border-bottom:1px solid var(--line);
  backdrop-filter:blur(8px);
}

.headerRow{
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:12px;
  min-height:68px;
}

.brandLink{
  display:flex;
  align-items:center;
  gap:10px;
  text-decoration:none;
  min-width:0;
}

.logoImg{
  width:40px;
  height:40px;
  object-fit:contain;
  display:block;
}

.logoSm{
  width:32px;
  height:32px;
  object-fit:contain;
  display:block;
}

.brandStack,
.brandStackMobile{
  display:flex;
  flex-direction:column;
  justify-content:center;
  line-height:1;
  gap:2px;
  min-width:0;
}

.brandStack .title{
  margin:0;
  font-size:17px;
  font-weight:950;
  letter-spacing:.08em;
}

.brandStack .subtitle{
  margin:0;
  font-size:12px;
  font-weight:900;
  letter-spacing:.12em;
  color:var(--muted);
}

.brandStackMobile span{
  font-size:11px;
  letter-spacing:.12em;
  color:var(--muted);
}

.nav{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:8px;
  min-width:0;
}

.navbtn{
  appearance:none;
  text-decoration:none;
  color:var(--text);
  background:var(--btn);
  border:1px solid var(--line);
  padding:9px 14px;
  border-radius:14px;
  font-weight:900;
  white-space:nowrap;
  cursor:pointer;
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
}

.navbtn:hover,
.langBtn:hover,
.dropItem:hover,
.dLink:hover,
.dAction:hover,
.close:hover{
  transform:translateY(-1px);
  box-shadow:0 8px 16px rgba(0,0,0,.07);
}

.navbtn.router-link-active{
  outline:2px solid rgba(108,180,78,.28);
}

.primaryNav{
  background:var(--accent);
  color:#fff;
  border-color:transparent;
}

.navbtn.icon{
  width:42px;
  min-width:42px;
  padding:9px;
  display:grid;
  place-items:center;
}

.cabinetBtn{
  display:flex;
  align-items:center;
  gap:8px;
}

.dropdownWrap{
  position:relative;
}

.dropdownMenu{
  position:absolute;
  top:calc(100% + 8px);
  right:0;
  min-width:220px;
  background:var(--card);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:var(--shadow);
  padding:8px;
  display:grid;
  gap:6px;
  z-index:40;
}

.dropItem{
  display:block;
  width:100%;
  text-align:left;
  text-decoration:none;
  background:var(--btn);
  border:1px solid var(--line);
  color:var(--text);
  padding:11px 13px;
  border-radius:12px;
  font-weight:800;
  cursor:pointer;
  transition:transform .18s ease, box-shadow .18s ease;
}

.dropItem.danger{
  color:#b91c1c;
}

.content{
  flex:1;
  display:flex;
  justify-content:center;
  padding:14px 0 10px;
}

.burger{
  display:none;
  border:1px solid var(--line);
  background:var(--btn);
  border-radius:12px;
  padding:9px;
  cursor:pointer;
  justify-self:end;
  margin-left:auto;
}

.burger span{
  display:block;
  width:18px;
  height:2px;
  background:var(--text);
  margin:3px 0;
  border-radius:999px;
}

.desktopNav{
  display:flex;
}

.backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.22);
  z-index:29;
}

.drawer{
  position:fixed;
  top:0;
  right:-320px;
  width:320px;
  max-width:88vw;
  height:100vh;
  background:var(--card);
  border-left:1px solid var(--line);
  z-index:30;
  box-shadow:var(--shadow);
  transition:right .22s ease;
  display:flex;
  flex-direction:column;
}

.drawer.open{
  right:0;
}

.drawerHead{
  display:flex;
  align-items:center;
  gap:10px;
  padding:14px;
  border-bottom:1px solid var(--line);
}

.drawerBrand{
  display:flex;
  align-items:center;
  gap:10px;
  text-decoration:none;
  color:inherit;
  min-width:0;
}

.dTitle{
  font-weight:950;
}

.dSub{
  font-size:12px;
  color:var(--muted);
  margin-top:2px;
}

.close{
  margin-left:auto;
  border:1px solid var(--line);
  background:var(--btn);
  border-radius:12px;
  padding:8px 10px;
  cursor:pointer;
}

.drawerLinks{
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.dLink{
  width:100%;
  text-align:left;
  text-decoration:none;
  color:var(--text);
  background:var(--btn);
  border:1px solid var(--line);
  padding:12px;
  border-radius:12px;
  font-weight:900;
  cursor:pointer;
}

.dBtn{
  font:inherit;
}

.drawerActions{
  margin-top:auto;
  padding:12px;
  border-top:1px solid var(--line);
}

.dAction{
  width:100%;
  padding:12px;
  border-radius:12px;
  border:none;
  background:var(--accent);
  color:#fff;
  font-weight:950;
  cursor:pointer;
}

.footer{
  margin-top:auto;
  background:var(--card);
  border-top:1px solid var(--line);
  box-shadow:0 -6px 18px rgba(0,0,0,.04);
}

.footerRow{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:10px 0;
  flex-wrap:wrap;
}

.footerBrand{
  display:flex;
  align-items:center;
  gap:10px;
  text-decoration:none;
  color:inherit;
}

.footerBrand:hover{
  opacity:.92;
}

.footerLogo{
  width:36px;
  height:36px;
  display:block;
  object-fit:contain;
}

.footerStack{
  display:flex;
  flex-direction:column;
  line-height:1;
  gap:2px;
  font-weight:900;
  letter-spacing:.08em;
}

.footerStack small{
  font-size:11px;
  color:var(--muted);
  letter-spacing:.12em;
}

.footerRight{
  display:flex;
  align-items:center;
  gap:16px;
  margin-left:auto;
}

.copy{
  color:var(--muted);
  font-weight:800;
}

.langSwitch{
  display:flex;
  align-items:center;
  gap:8px;
  color:var(--muted);
  font-weight:900;
}

.langBtn{
  border:none;
  background:transparent;
  color:var(--muted);
  font-weight:900;
  cursor:pointer;
  padding:0;
}

.langBtn.active{
  color:var(--text);
}

@media (max-width:1080px){
  .desktopNav{
    display:none;
  }

  .burger{
    display:block;
  }

  .headerRow{
    grid-template-columns:auto 1fr auto;
  }
}

@media (max-width:700px){
  body{
    font-size:13px;
  }

  .container{
    width:min(100%, calc(100% - 20px));
  }

  .content{
    padding:12px 0 14px;
  }

  .footerRow{
    align-items:center;
  }

  .footerBrand{
    gap:8px;
  }

  .footerLogo{
    width:32px;
    height:32px;
  }

  .footerRight{
    width:100%;
    justify-content:space-between;
  }

  .langSwitch{
    gap:6px;
  }

  .navbtn{
    padding:8px 12px;
    border-radius:12px;
  }
}
</style>