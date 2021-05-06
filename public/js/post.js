const newPostForm = (e) => {
    e.prevent.Default();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#content-title').value.trim();

    if( title && content ) {
        const response = await fetch('/api/posts/', {
            method:"POST",
            body:JSON.stringify({ title, content }),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new post');
        }
    }
};

document.querySelector('#new-post').addEventListener('submit', newPostForm);

