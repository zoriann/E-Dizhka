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

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart__item-remove')) {
      const id = e.target.dataset.id
      cart = cart.filter((item) => item.id != id)
      localStorage.setItem('cart', JSON.stringify(cart))
      location.reload()
    }
  })

  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('cart')
    location.reload()
  })

  confirmBtn.addEventListener('click', () => {
    if (cart.length === 0) return

    const orderNumber = generateShortOrderNumber()
    showToast(
      `✅ Замовлення №${orderNumber} прийнято! Ви зможете забрати його за 15 хв на касі.`
    )
    sendOrderToEmail(cart, orderNumber)
    localStorage.removeItem('cart')

    setTimeout(() => location.reload(), 4000)
  })
})

function generateShortOrderNumber() {
  const part1 = Math.floor(100 + Math.random() * 900)
  const part2 = Math.floor(10 + Math.random() * 90)
  return `Z${part1}-${part2}`
}

function showToast(message) {
  const toast = document.getElementById('toast')
  if (!toast) return

  toast.textContent = message
  toast.classList.add('show')
  setTimeout(() => {
    toast.classList.remove('show')
  }, 4000)
}

function sendOrderToEmail(cart, orderNumber) {
  const items = cart
    .map(
      (item) =>
        `${item.name} x${item.quantity} — ${item.price * item.quantity}₴`
    )
    .join('\n')

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const message = `Нове замовлення №${orderNumber}:\n\n${items}\n\nЗагальна сума: ${total}₴`

  emailjs
    .send('service_7zgca0s', 'template_0q14kum', {
      message: message,
      order_number: orderNumber,
    })
    .then(
      () => console.log('Замовлення надіслано'),
      (error) => console.error('Помилка відправки:', error)
    )
}
