// отримую id з URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// перевіряю наявність користувача
if (!userId) {
    document.getElementById('userInfo').innerHTML =
        '<p style="color:red">ID користувача не передано в URL</p>';
} else {

    // виводжу всю інформацію про обраного користувача
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error('Користувача не знайдено');
            return response.json();
        })
        .then(user => {
            const info = document.getElementById('userInfo');
            info.innerHTML = `
            <h2>${user.name}</h2>
            <dl>
              <dt>ID</dt><dd>${user.id}</dd>
              <dt>Username</dt><dd>${user.username}</dd>
              <dt>Email</dt><dd>${user.email}</dd>
              <dt>Phone</dt><dd>${user.phone}</dd>
              <dt>Website</dt><dd><a href="http://${user.website}" target="_blank">${user.website}</a></dd>
              <dt>Company</dt><dd>${user.company.name}</dd>
              <dt>CatchPhrase</dt><dd>${user.company.catchPhrase}</dd>
              <dt>BS</dt><dd>${user.company.bs}</dd>
              <dt>Address</dt><dd>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</dd>
              <dt>GEO</dt><dd>Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}</dd>
            </dl>
          `;

            // кнопка "Posts of current user"
            document.getElementById('showPostsBtn').addEventListener('click', () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then(response => response.json())
                    .then(posts => {
                        const container = document.getElementById('postsContainer');
                        container.innerHTML = '<h3>USER POSTS:</h3>';

                        posts.forEach(post => {
                            const postDiv = document.createElement('div');
                            postDiv.className = 'post-item';
                            postDiv.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.body.substring(0, 150)}...</p>
                    <a href="post-details.html?id=${post.id}" class="btn">Post details</a>
                  `;
                            container.appendChild(postDiv);
                        });
                    })
            });
        })
}