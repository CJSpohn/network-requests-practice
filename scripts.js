const usersDisplay = document.querySelector('.users');
const teamsDisplay = document.querySelector('.teams');
const animalsDisplay = document.querySelector('.animals');

const usersBtn = document.querySelector('.js-users-btn');
const teamsBtn = document.querySelector('.js-teams-btn');
const animalsBtn = document.querySelector('.js-animals-btn');

const addDataBtn = document.querySelector('.js-add-data-btn')

const usersClearBtn = document.querySelector('.js-users-clear');
const teamsClearBtn = document.querySelector('.js-teams-clear');
const animalsClearBtn = document.querySelector('.js-animals-clear');

const userId = document.querySelector('#id');
const userName = document.querySelector('#name');
const userStatus = document.querySelector('#status');
const userInterests = document.querySelector('#interests');


function getData(url) {
  const promise = fetch(url)
    .then(response => response.json())
    .then(data => data)

  return promise
}

function postData(url, data) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      status: data.status,
      interest: data.intersts
    })
  })
    .then(response => response.json())
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

function makeData() {
  const item = {
    id: userId.value,
    name: userName.value,
    status: userStatus.value,
    interests: userInterests.value
  }
  postData('http://localhost:3001/api/v1/users', item)
}



usersBtn.addEventListener('click', getUsersData)
teamsBtn.addEventListener('click', getTeamsData)
animalsBtn.addEventListener('click', getAnimalsData)

usersClearBtn.addEventListener('click', clearData)
teamsClearBtn.addEventListener('click', clearData)
animalsClearBtn.addEventListener('click', clearData)

addDataBtn.addEventListener('click', makeData)
