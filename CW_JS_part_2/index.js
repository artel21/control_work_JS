// отримую дані з API
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        renderUsers(users);
    })


// створюю картки користувачів
function renderUsers(users) {
    const container = document.getElementById('usersContainer');
    //container.innerHTML = ''; // очищаємо на випадок повторного виклику

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
          <h2>${user.id}. ${user.name}</h2>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <a href="user-details.html?id=${user.id}" class="btn">Details</a>
        `;
        container.appendChild(card);
    });
}