document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('catalogItems')

  try {
    const response = await fetch(
      'https://diplombackend.railway.app/api/products'
    )
    const products = await response.json()

    renderProducts(products, container)
    handleFilter(products)
  } catch (err) {
    container.innerHTML =
      '<p class="error">❌ Помилка при завантаженні товарів.</p>'
    console.error(err)
  }
})

function renderProducts(products, container, category = 'all') {
  container.innerHTML = ''

  const filtered =
    category === 'all'
      ? products
      : products.filter((p) => p.category === category)

  filtered.forEach((product) => {
    const card = document.createElement('div')
    card.className = 'catalog__item'
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="catalog__img">
      <div class="catalog__info">
        <h3>${product.name}</h3>
        <p>${product.price} ₴</p>
        <button data-id="${product.id}">До кошика</button>
      </div>
    `
    container.appendChild(card)
  })

  setupAddToCart(filtered)
}

function setupAddToCart(products) {
  const buttons = document.querySelectorAll('.catalog__item button')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id
      const product = products.find((p) => p.id == id)
      if (!product) return

      let cart = JSON.parse(localStorage.getItem('cart')) || []
      const existing = cart.find((i) => i.id == id)

      if (existing) {
        existing.quantity += 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      alert(`✅ ${product.name} додано до кошика!`)
    })
  })
}

function handleFilter(products) {
  const buttons = document.querySelectorAll('.catalog__btn')

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.catalog__btn.active')?.classList.remove('active')
      btn.classList.add('active')

      const category = btn.dataset.category
      const container = document.getElementById('catalogItems')
      renderProducts(products, container, category)
    })
  })
}
