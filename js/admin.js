const API = 'https://diplombackend-production-a7f8.up.railway.app/api/products'

document.addEventListener('DOMContentLoaded', () => {
  loadProducts()

  document.getElementById('addProduct').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim()
    const price = +document.getElementById('price').value
    const category = document.getElementById('category').value.trim()
    const image = document.getElementById('image').value.trim()

    if (!name || !price || !category || !image) {
      alert('❗ Всі поля обовʼязкові')
      return
    }

    const newProduct = { name, price, category, image }

    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })

    clearForm()
    loadProducts()
  })
})

async function loadProducts() {
  const list = document.getElementById('productList')
  list.innerHTML = 'Завантаження...'

  const res = await fetch(API)
  const products = await res.json()

  list.innerHTML = ''
  products.forEach((p) => {
    const item = document.createElement('div')
    item.className = 'admin__item'
    item.innerHTML = `
      <input type="text" value="${p.name}" class="edit-name" />
      <input type="number" value="${p.price}" class="edit-price" />
      <input type="text" value="${p.category}" class="edit-category" />
      <input type="text" value="${p.image}" class="edit-image" />
      <div>
        <button class="save-btn" data-id="${p.id}">💾 Зберегти</button>
        <button class="delete-btn" data-id="${p.id}">🗑 Видалити</button>
      </div>
    `
    list.appendChild(item)
  })

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      loadProducts()
    })
  })

  document.querySelectorAll('.save-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id
      const item = btn.closest('.admin__item')
      const name = item.querySelector('.edit-name').value.trim()
      const price = +item.querySelector('.edit-price').value
      const category = item.querySelector('.edit-category').value.trim()
      const image = item.querySelector('.edit-image').value.trim()

      if (!name || !price || !category || !image) {
        alert('❗ Заповни всі поля')
        return
      }

      const updatedProduct = { name, price, category, image }

      await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })

      loadProducts()
    })
  })
}

function clearForm() {
  document.getElementById('name').value = ''
  document.getElementById('price').value = ''
  document.getElementById('category').value = ''
  document.getElementById('image').value = ''
}
