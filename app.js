
  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA0Z-xZgFh5sZ-mjDXvrzJ3JCfOYJs8yC0",
    authDomain: "minicrudapp-a20c5.firebaseapp.com",
    databaseURL: "https://minicrudapp-a20c5-default-rtdb.firebaseio.com",
    projectId: "minicrudapp-a20c5",
    storageBucket: "minicrudapp-a20c5.firebasestorage.app",
    messagingSenderId: "1079334221061",
    appId: "1:1079334221061:web:16ff69f9bb6a50d102336c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = firebase.database();

const postList = document.getElementById('post-list');
const form = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');

// Fetch and display posts
async function getPosts() {
  postList.innerHTML = '';

  const snapshot = await database.ref('posts').once('value');
  const posts = snapshot.val();

  for (let id in posts) {
    const post = posts[id];
    const div = document.createElement('div');
    div.classList.add('post');
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button onclick="deletePost('${id}')">Delete</button>
      <button onclick="updatePost('${id}', '${post.title}', '${post.body}')">Edit</button>
    `;
    postList.appendChild(div);
  }
}

// Add new post
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPostRef = database.ref('posts').push(); // auto ID
  await newPostRef.set({
    title: titleInput.value,
    body: bodyInput.value
  });

  alert('Post saved to Firebase!');
  form.reset();
  getPosts();
});

// Delete post
function deletePost(id) {
  database.ref('posts/' + id).remove()
    .then(() => {
      alert('Post deleted!');
      getPosts();
    });
}

// Update post (prompt style)
function updatePost(id, oldTitle, oldBody) {
  const newTitle = prompt('Enter new title:', oldTitle);
  const newBody = prompt('Enter new body:', oldBody);

  database.ref('posts/' + id).update({
    title: newTitle,
    body: newBody
  }).then(() => {
    alert('Post updated!');
    getPosts();
  });
}

// Initial call
getPosts();
