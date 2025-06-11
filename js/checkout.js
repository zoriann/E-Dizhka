document
  .getElementById('checkout-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    const name = document.getElementById('name').value.trim()
    const phone = document.getElementById('phone').value.trim()
    const comment = document.getElementById('comment').value.trim()

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')

    if (!cart.length) {
      document.getElementById('order-status').textContent = 'Кошик порожній 😕'
      return
    }

    const orderData = {
      name,
      phone,
      comment,
      items: cart,
      timestamp: new Date().toISOString(),
    }

    try {
      const res = await fetch(
        'const API_URL = "https://diplombackend.railway.internal/checkout";',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      )

      const result = await res.json()

      if (result.success) {
        document.getElementById('order-status').textContent =
          '✅ Замовлення успішно відправлено!'
        localStorage.removeItem('cart')
      } else {
        document.getElementById('order-status').textContent =
          '❌ Сталася помилка при відправці.'
      }
    } catch (err) {
      console.error('Помилка при запиті:', err)
      document.getElementById('order-status').textContent =
        '⚠️ Помилка підключення до сервера.'
    }
  })
