const API_BASE_URL = 'http://localhost:8080/api/posts';

async function fetchPosts() {
    const container = document.getElementById('posts-container');
    if (!container) {
        return;
    }

    container.innerHTML = '<p>Loading posts...</p>';

    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="form-message form-message--error">Unable to load posts. Please make sure the backend is running.</p>';
    }
}

function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    if (!container) {
        return;
    }

    if (!posts || posts.length === 0) {
        container.innerHTML = '<p>No posts yet. Be the first to create one!</p>';
        return;
    }

    container.innerHTML = '';

    posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .forEach(post => {
            const item = document.createElement('article');
            item.className = 'post-item';

            const created = post.createdAt ? new Date(post.createdAt) : null;
            const formattedDate = created
                ? created.toLocaleString()
                : '';

            item.innerHTML = `
                <h3 class="post-item-title">${escapeHtml(post.title)}</h3>
                <div class="post-item-meta">
                    <span>By ${escapeHtml(post.author)}</span>
                    ${formattedDate ? `<span> • ${formattedDate}</span>` : ''}
                </div>
                <div class="post-item-content">${escapeHtml(post.content)}</div>
            `;

            container.appendChild(item);
        });
}

function setupPostForm() {
    const form = document.getElementById('post-form');
    const messageEl = document.getElementById('form-message');
    const yearEl = document.getElementById('year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    if (!form) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!messageEl) return;

        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('content').value.trim();

        if (!title || !author || !content) {
            showFormMessage('Please fill in all fields.', true);
            return;
        }

        const newPost = { title, author, content };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                const bodyText = await response.text();
                console.error('Backend error:', bodyText);
                throw new Error(`Failed to create post: ${response.status}`);
            }

            form.reset();
            showFormMessage('Post created successfully!', false);
            await fetchPosts();
        } catch (error) {
            console.error(error);
            showFormMessage('Could not create post. Please check if the backend is running.', true);
        }
    });
}

function showFormMessage(message, isError) {
    const messageEl = document.getElementById('form-message');
    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.className = 'form-message ' + (isError ? 'form-message--error' : 'form-message--success');
}

function escapeHtml(unsafe) {
    if (unsafe == null) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('posts-container')) {
        fetchPosts();
    }
    setupPostForm();
});

