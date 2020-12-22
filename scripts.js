const usersDisplay = document.querySelector('.users');
const teamsDisplay = document.querySelector('.teams');
const animalsDisplay = document.querySelector('.animals');

const usersBtn = document.querySelector('.js-users-btn');
const teamsBtn = document.querySelector('.js-teams-btn');
const animalsBtn = document.querySelector('.js-animals-btn');

const usersClearBtn = document.querySelector('.js-users-clear');
const teamsClearBtn = document.querySelector('.js-teams-clear');
const animalsClearBtn = document.querySelector('.js-animals-clear');

console.log('test')

function getData(api) {
  const promise = fetch(api)
    .then(response => response.json())
    .then(data => data)

  return promise
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


usersBtn.addEventListener('click', getUsersData)
teamsBtn.addEventListener('click', getTeamsData)
animalsBtn.addEventListener('click', getAnimalsData)

usersClearBtn.addEventListener('click', clearData)
teamsClearBtn.addEventListener('click', clearData)
animalsClearBtn.addEventListener('click', clearData)
