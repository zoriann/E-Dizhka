document.addEventListener('DOMContentLoaded', () => {
  const API_URL =
    'https://diplombackend-production-a7f8.up.railway.app/api/products'
  const form = document.getElementById('addProductForm')
  const tableBody = document.getElementById('productTableBody')
  const toast = document.getElementById('toast')

  function showToast(message) {
    toast.textContent = message
    toast.classList.add('show')
    setTimeout(() => toast.classList.remove('show'), 4000)
  }

  async function fetchProducts() {
    try {
      const res = await fetch(API_URL)
      const products = await res.json()
      tableBody.innerHTML = ''
      products.forEach(createProductRow)
    } catch (err) {
      console.error('Помилка при завантаженні товарів:', err)
    }
  }

  function createProductRow(product) {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td><input type="text" value="${product.name}" data-field="name"></td>
      <td><input type="text" value="${product.price}" data-field="price"></td>
      <td><input type="text" value="${product.category}" data-field="category"></td>
      <td><input type="text" value="${product.image}" data-field="image"></td>
      <td>
        <button class="edit-btn" data-id="${product.id}">💾</button>
        <button class="delete-btn" data-id="${product.id}">🗑</button>
      </td>
    `
    tableBody.appendChild(row)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = form.name.value.trim()
    const price = parseFloat(form.price.value.trim())
    const category = form.category.value.trim()
    const image = form.image.value.trim()

    if (!name || !price || !category || !image) {
      showToast('⚠️ Заповніть всі поля')
      return
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, category, image }),
      })
      if (!res.ok) throw new Error('❌ Помилка додавання')
      showToast('✅ Товар додано!')
      form.reset()
      fetchProducts()
    } catch (err) {
      console.error(err)
      showToast('❌ Помилка при додаванні')
    }
  })

  tableBody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id
    const row = e.target.closest('tr')
    const inputs = row.querySelectorAll('input')

    if (e.target.classList.contains('edit-btn')) {
      const updated = {}
      inputs.forEach((input) => {
        updated[input.dataset.field] = input.value
      })

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        })
        if (!res.ok) throw new Error('❌ Помилка оновлення')
        showToast('✅ Товар оновлено!')
        fetchProducts()
      } catch (err) {
        console.error(err)
        showToast('❌ Помилка при оновленні')
      }
    }

    if (e.target.classList.contains('delete-btn')) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error('❌ Помилка видалення')
        showToast('🗑 Товар видалено')
        fetchProducts()
      } catch (err) {
        console.error(err)
        showToast('❌ Помилка при видаленні')
      }
    }
  })

  fetchProducts()
})
