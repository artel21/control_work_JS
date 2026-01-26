// отримую id посту з URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// перевіряю наявність посту
if (!postId) {
    document.getElementById('postInfo').innerHTML =
        '<p style="color:red">ID посту не передано в URL</p>';
    document.getElementById('commentsList').innerHTML = '';
} else {
    // завантажую повну інформацію про пост
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) throw new Error('Пост не знайдено');
            return response.json();
        })
        .then(post => {
            document.getElementById('postInfo').innerHTML = `
            <h2 class="post-title">${post.title}</h2>
            <p><strong>ID:</strong> ${post.id}</p>
            <p><strong>Author (userId):</strong> ${post.userId}</p>
            <p><strong>Text:</strong></p>
            <p style="white-space: pre-wrap;">${post.body}</p>
          `;

            // завантажую всі коментарі до цього посту
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => response.json())
                .then(comments => {
                    const container = document.getElementById('commentsList');
                    container.innerHTML = '';

                    if (comments.length === 0) {
                        container.innerHTML = '<p style="color: gray;">До цього посту ще немає коментарів.</p>';
                        return;
                    }

                    comments.forEach(comment => {
                        const commentDiv = document.createElement('div');
                        commentDiv.className = 'comment';
                        commentDiv.innerHTML = `
                  <div class="comment-name">${comment.name}</div>
                  <div class="comment-email">${comment.email}</div>
                  <p class="comment-body">${comment.body}</p>
                `;
                        container.appendChild(commentDiv);
                    });
                })
        })
}