const catalogItems = [
  {
    id: 'beer001',
    name: 'Пиво Світле «Бочкове»',
    price: '45 ₴',
    category: 'beer',
    image: '/img/items/bochkove.jpg',
  },
  {
    id: 'beer002',
    name: 'Крафт IPA «Дике Поле»',
    price: '65 ₴',
    category: 'beer',
    image: '/img/items/dyke-pole.jpg',
  },
  {
    id: 'snack001',
    name: 'Сухарики з часником',
    price: '25 ₴',
    category: 'snacks',
    image: '/img/items/suharyky.jpg',
  },
  {
    id: 'other001',
    name: 'Квас «Хлібний»',
    price: '30 ₴',
    category: 'other',
    image: '/img/items/kvass.jpg',
  },
  {
    id: 'other001',
    name: 'Квас «Хлібний»',
    price: '30 ₴',
    category: 'other',
    image: '/img/items/kvass.jpg',
  },
  {
    id: 'beer001',
    name: 'Пиво Світле «Бочкове»',
    price: '45 ₴',
    category: 'beer',
    image: '/img/items/bochkove.jpg',
  },
  {
    id: 'beer002',
    name: 'Крафт IPA «Дике Поле»',
    price: '65 ₴',
    category: 'beer',
    image: '/img/items/dyke-pole.jpg',
  },
  {
    id: 'snack001',
    name: 'Сухарики з часником',
    price: '25 ₴',
    category: 'snacks',
    image: '/img/items/suharyky.jpg',
  },
  {
    id: 'other001',
    name: 'Квас «Хлібний»',
    price: '30 ₴',
    category: 'other',
    image: '/img/items/kvass.jpg',
  },
  {
    id: 'other001',
    name: 'Квас «Хлібний»',
    price: '30 ₴',
    category: 'other',
    image: '/img/items/kvass.jpg',
  },
]

const container = document.getElementById('catalogItems')
const buttons = document.querySelectorAll('.catalog__btn')

function renderItems(category = 'all') {
  container.classList.add('fade-out')

  setTimeout(() => {
    container.innerHTML = ''

    const filtered =
      category === 'all'
        ? catalogItems
        : catalogItems.filter((item) => item.category === category)

    filtered.forEach((item) => {
      const div = document.createElement('div')
      div.className = 'catalog__card'
      div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3 class="catalog__card-name">${item.name}</h3>
          <div class="catalog__card-price">${item.price}</div>
          <button class="catalog__card-button" data-id="${item.id}">До кошика</button>
        `
      container.appendChild(div)
    })

    container.classList.remove('fade-out')
    container.classList.add('fade-in')

    setTimeout(() => {
      container.classList.remove('fade-in')
    }, 300)
  }, 200)
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'))
    btn.classList.add('active')
    const cat = btn.dataset.category
    renderItems(cat)
  })
})

renderItems()
