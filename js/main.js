const dataOfGoods = [
  {
    uid: 'p1',
    title: 'Пиво світле "Бочкове"',
    img: '/img/beer1.jpg',
    cost: 45,
  },
  {
    uid: 'p2',
    title: 'Крафтове пиво "Дідо"',
    img: '/img/beer2.jpg',
    cost: 58,
  },
  {
    uid: 'p3',
    title: 'Портер "Темний шлях"',
    img: '/img/beer3.jpg',
    cost: 69,
  },
  {
    uid: 'p4',
    title: 'Імбирне пиво "Зимове"',
    img: '/img/beer4.jpg',
    cost: 52,
  },
  {
    uid: 'p5',
    title: 'Пиво бочкове "Світле"',
    img: '/img/beer5.jpg',
    cost: 44,
  },
  {
    uid: 'p6',
    title: 'Пиво "Бояришнік"',
    img: '/img/beer6.jpg',
    cost: 64,
  },
]

const gridZone = document.querySelector('#product-list')

for (let item of dataOfGoods) {
  const card = document.createElement('div')
  card.className = 'itemBox'
  card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="itemBox__img">
      <h3 class="itemBox__name">${item.title}</h3>
      <p class="itemBox__price">${item.cost} ₴</p>
      <button class="itemBox__addbtn" data-id="${item.uid}">До кошика</button>
    `
  gridZone.appendChild(card)
}
