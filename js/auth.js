const API = 'https://diplombackend-production-a7f8.up.railway.app'

async function registerUser(username, password) {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  alert(data.message)
}

async function loginUser(username, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()

  if (data.status) {
    localStorage.setItem('token', data.token)
    alert('Успішно авторизовано!')
  } else {
    alert(data.message)
  }
}
