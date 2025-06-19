document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('popularProducts')

  try {
    const response = await fetch(
      'https://diplombackend-production-a7f8.up.railway.app/api/products'
    )
    const products = await response.json()

    const popular = products.slice(0, 6) // Перші 6

    popular.forEach((item) => {
      const card = document.createElement('div')
      card.className = 'itemBox'
      card.innerHTML = `
        <img src="img/${item.image}" alt="${item.name}" class="itemBox__img">
        <h3 class="itemBox__name">${item.name}</h3>
        <p class="itemBox__price">${item.price} ₴</p>
        <button class="itemBox__addbtn" data-id="${item.id}">До кошика</button>
      `
      container.appendChild(card)
    })
  } catch (err) {
    console.error('❌ Помилка при завантаженні товарів:', err)
    container.innerHTML = '<p>Не вдалося завантажити товари 😔</p>'
  }
})
