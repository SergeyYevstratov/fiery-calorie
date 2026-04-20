const PROFILE_KEY = 'fiery_profile'
const USERS_KEY = 'fiery_users'
const AUTH_KEY = 'fiery_auth'

function safeParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function getUsers() {
  return safeParse(localStorage.getItem(USERS_KEY) || '[]', [])
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getProfile() {
  return safeParse(localStorage.getItem(PROFILE_KEY) || 'null', null)
}

export function saveProfile(profile) {
  const clean = {
    name: String(profile?.name || 'Користувач').trim() || 'Користувач',
    email: String(profile?.email || '').trim().toLowerCase(),
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(clean))
  localStorage.setItem(AUTH_KEY, '1')
  return clean
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === '1' && !!getProfile()?.email
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(PROFILE_KEY)
}

export function ensureProfile() {
  if (isAuthenticated()) {
    return getProfile()
  }
  return { name: 'Користувач', email: 'guest@fiery.local' }
}

export function registerUser(payload) {
  const name = String(payload?.name || '').trim()
  const email = String(payload?.email || '').trim().toLowerCase()
  const password = String(payload?.password || '').trim()

  if (!name || !email || !password) {
    return { ok: false, message: 'Заповніть усі поля' }
  }

  const users = getUsers()
  const exists = users.find(user => user.email === email)
  if (exists) {
    return { ok: false, message: 'Користувач з таким email уже існує' }
  }

  users.push({ name, email, password })
  saveUsers(users)
  saveProfile({ name, email })
  return { ok: true, profile: { name, email } }
}

export function loginUser(payload) {
  const email = String(payload?.email || '').trim().toLowerCase()
  const password = String(payload?.password || '').trim()
  const users = getUsers()
  const user = users.find(item => item.email === email && item.password === password)

  if (!user) {
    return { ok: false, message: 'Невірний email або пароль' }
  }

  saveProfile({ name: user.name, email: user.email })
  return { ok: true, profile: { name: user.name, email: user.email } }
}

export function updateCurrentUser(profile) {
  if (!isAuthenticated()) return null

  const current = getProfile()
  const name = String(profile?.name || '').trim() || 'Користувач'
  const email = String(profile?.email || '').trim().toLowerCase() || current.email
  const users = getUsers()
  const currentIndex = users.findIndex(user => user.email === current.email)

  if (users.some((user, index) => user.email === email && index !== currentIndex)) {
    return { ok: false, message: 'Такий email уже використовується' }
  }

  if (currentIndex >= 0) {
    users[currentIndex] = {
      ...users[currentIndex],
      name,
      email,
    }
    saveUsers(users)
  }

  const saved = saveProfile({ name, email })
  return { ok: true, profile: saved }
}

export function getProfileFormKey() {
  const p = ensureProfile()
  return `fiery_calorie_form_${String(p.email).toLowerCase()}`
}

export function getHistoryKey() {
  const p = ensureProfile()
  return `fiery_history_${String(p.email).toLowerCase()}`
}

export function getHistory() {
  return safeParse(localStorage.getItem(getHistoryKey()) || '[]', [])
}

export function addHistoryItem(item) {
  const list = getHistory()
  list.unshift(item)
  localStorage.setItem(getHistoryKey(), JSON.stringify(list.slice(0, 20)))
}

export function clearHistory() {
  localStorage.removeItem(getHistoryKey())
}
