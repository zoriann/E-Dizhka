document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cartItems')
  const totalElement = document.getElementById('totalPrice')
  const clearBtn = document.getElementById('clearCart')
  const confirmBtn = document.getElementById('confirmOrder')

  let cart = JSON.parse(localStorage.getItem('cart')) || []

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart__empty">
        <h3 class="cart__empty-title">🛒 Кошик порожній</h3>
        <p class="cart__empty-text">Перейдіть до каталогу, щоб додати товари.</p>
        <a href="catalog.html" class="catalog__link">← До каталогу</a>
      </div>
    `
    totalElement.textContent = '0 ₴'
    return
  }

  let total = 0
  cart.forEach((item) => {
    const itemDiv = document.createElement('div')
    itemDiv.className = 'cart__item'

    itemDiv.innerHTML = `
      <div class="cart__item-info">
        <span class="cart__item-name">${item.name}</span>
        <span class="cart__item-price">${item.price} ₴ × ${item.quantity}</span>
      </div>
      <button class="cart__item-remove" data-id="${item.id}">✖</button>
    `

    container.appendChild(itemDiv)
    total += item.price * item.quantity
  })

  totalElement.textContent = `${total} ₴`

  // Видалення окремого товару
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart__item-remove')) {
      const id = e.target.dataset.id
      cart = cart.filter((item) => item.id != id)
      localStorage.setItem('cart', JSON.stringify(cart))
      location.reload() // оновлення кошика
    }
  })

  // Очистити кошик
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cart')
    location.reload()
  })

  // Підтвердження замовлення
  confirmBtn.addEventListener('click', () => {
    if (cart.length === 0) return
    alert('✅ Замовлення підтверджено!')
    localStorage.removeItem('cart')
    location.reload()
  })
})
