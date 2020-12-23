const usersDisplay = document.querySelector('.users');
const teamsDisplay = document.querySelector('.teams');
const animalsDisplay = document.querySelector('.animals');

const usersBtn = document.querySelector('.js-users-btn');
const teamsBtn = document.querySelector('.js-teams-btn');
const animalsBtn = document.querySelector('.js-animals-btn');

const addDataBtn = document.querySelector('.js-add-data-btn')
const deleteBtn = document.querySelector('.js-delete-btn')

const usersClearBtn = document.querySelector('.js-users-clear');
const teamsClearBtn = document.querySelector('.js-teams-clear');
const animalsClearBtn = document.querySelector('.js-animals-clear');

const userId = document.querySelector('#id');
const userName = document.querySelector('#name');
const thirdInput = document.querySelector('#status');
const fourthInput = document.querySelector('#interests');

const radios = document.querySelectorAll('input[name="data"]')


function getData(url) {
  const promise = fetch(url)
    .then(response => response.json())
    .then(data => data)

  return promise
}

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

const removeData = async (url, id) => {
  return fetch(url + '/' + id, {
    method: 'DELETE',
  })
  .then(response => response.json());
}

const getUsersData = async () => {
  let users = await getData('http://localhost:3001/api/v1/users');
  users.forEach(user => usersDisplay.innerText += `
  Id: ${user.id}
  Name: ${user.name}
  Status: ${user.status}
  Interests: ${user.interests}
  `)
}

const getTeamsData = async () => {
  let teams = await getData('http://localhost:3001/api/v1/sport-teams');
  teams.forEach(team => teamsDisplay.innerText += `
  Id: ${team.id}
  Name: ${team.name}
  Head Coach: ${team.head_coach}
  Sport: ${team.sport}
  `)
}

const getAnimalsData = async () => {
  let animals = await getData('http://localhost:3001/api/v1/animals');
  animals.forEach(animal => animalsDisplay.innerText += `
  Id: ${animal.id}
  Name: ${animal.name}
  Diet: ${animal.diet}
  Fun Fact: ${animal.fun_fact}
  `)
}

function clearData()  {
  if (this.classList.contains('js-users-clear')) {
    usersDisplay.innerText = '';
  } else if (this.classList.contains('js-teams-clear')) {
    teamsDisplay.innerText = '';
  } else {
    animalsDisplay.innerText = '';
  }
}

const makeItem = (att1, att2, att3, att4) => {
  if (radios[0].checked) {
    return { id: att1, name: att2, status: att3, interests: att4 }
  } else if (radios[1].checked) {
    return { id: att1, name: att2, head_coach: att3, sport: att4 }
  } else if (radios[2].checked) {
    return { id: att1, name: att2, diet: att3, fun_fact: att4 }
  }
}

const updateText = () => {
  const thirdLabel = document.querySelector('.third-label')
  const fourthLabel = document.querySelector('.fourth-label')
  if (radios[0].checked) {
    thirdLabel.innerText = 'Status'
    fourthLabel.innerText = 'Interests'
  } else if (radios[1].checked) {
    thirdLabel.innerText = 'Head Coach'
    fourthLabel.innerText = 'Sport'
  } else if (radios[2].checked) {
    thirdLabel.innerText = 'Diet'
    fourthLabel.innerText = 'Fun Fact'
  }
}

const makeData = () => {
  let url;
  if (radios[0].checked) {
    url = 'http://localhost:3001/api/v1/users'
  } else if (radios[1].checked) {
    url = 'http://localhost:3001/api/v1/sport-teams'
  } else if (radios[2].checked) {
    url = 'http://localhost:3001/api/v1/animals'
  }
  let item = makeItem(userId.value, userName.value, thirdInput.value, fourthInput.value);
  postData(url, item)
}

const deleteData = () => {
  let url;
  number = userId.value;
  if (radios[0].checked) {
    url = 'http://localhost:3001/api/v1/users'
  } else if (radios[1].checked) {
    url = 'http://localhost:3001/api/v1/sport-teams'
  } else if (radios[2].checked) {
    url = 'http://localhost:3001/api/v1/animals'
  }
  removeData(url, number)
}


usersBtn.addEventListener('click', getUsersData)
teamsBtn.addEventListener('click', getTeamsData)
animalsBtn.addEventListener('click', getAnimalsData)

usersClearBtn.addEventListener('click', clearData)
teamsClearBtn.addEventListener('click', clearData)
animalsClearBtn.addEventListener('click', clearData)

addDataBtn.addEventListener('click', makeData)
deleteBtn.addEventListener('click', deleteData)

radios.forEach(radio => {
  radio.addEventListener('change', updateText)
})
