document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems')
  const totalPriceEl = document.getElementById('totalPrice')
  const clearCartBtn = document.getElementById('clearCart')
  const confirmOrderBtn = document.getElementById('confirmOrder')

  function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || []
    cartItemsContainer.innerHTML = ''

    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart__empty">
          <h2 class="cart__empty-title">Кошик порожній</h2>
          <p class="cart__empty-text">Ви ще нічого не додали до замовлення. Перейдіть до <a href="catalog.html">каталогу</a>, щоб обрати товари.</p>
        </div>
      `
      totalPriceEl.textContent = '0 ₴'
      return
    }

    let total = 0

    cartData.forEach((item, index) => {
      total += parseFloat(item.price)

      const div = document.createElement('div')
      div.className = 'cart__item'
      div.innerHTML = `
        <div class="cart__item-info">
          <span class="cart__item-name">${item.name}</span>
          <span class="cart__item-price">${item.price} ₴</span>
        </div>
        <button class="cart__item-remove" data-index="${index}">Видалити</button>
      `
      cartItemsContainer.appendChild(div)
    })

    totalPriceEl.textContent = `${total.toFixed(2)} ₴`

    document.querySelectorAll('.cart__item-remove').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index
        cartData.splice(i, 1)
        localStorage.setItem('cart', JSON.stringify(cartData))
        loadCart()
      })
    })
  }

  clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart')
    loadCart()
  })

  confirmOrderBtn.addEventListener('click', () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || []

    if (!cartData.length) {
      alert(
        '😕 Ваш кошик порожній. Додайте товари, перш ніж оформляти замовлення.'
      )
      return
    }

    window.location.href = 'checkout.html'
  })
  

  loadCart()
})
