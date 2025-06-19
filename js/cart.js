document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cartItems')
  const total = document.getElementById('totalPrice')
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  if (cart.length === 0) {
    container.innerHTML = '<p>🛒 Кошик порожній</p>'
    total.textContent = '0 ₴'
    return
  }

  let sum = 0

  cart.forEach((item) => {
    const itemDiv = document.createElement('div')
    itemDiv.className = 'cart__item'
    itemDiv.innerHTML = `
      <img src="img/${item.image}" alt="${item.name}" class="cart__img">
      <div class="cart__info">
        <h3>${item.name}</h3>
        <p>${item.price} ₴ x ${item.quantity}</p>
        <p><strong>${item.price * item.quantity} ₴</strong></p>
        <button class="remove-btn" data-id="${item.id}">🗑 Видалити</button>
      </div>
    `
    container.appendChild(itemDiv)
    sum += item.price * item.quantity
  })

  total.textContent = `${sum} ₴`

  // Видалення з кошика
  const removeButtons = document.querySelectorAll('.remove-btn')
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id
      cart = cart.filter((item) => item.id != id)
      localStorage.setItem('cart', JSON.stringify(cart))
      location.reload() // перезавантажує сторінку, щоб оновити список
    })
  })
})
