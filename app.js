const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newStudent = {
    fullName: form.fullName.value,
    age: form.age.value,
    imageUrl: form.url.value,
  };

  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStudent),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
});

function getData() {
  fetch("http://localhost:3000/students")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getData();

function updateUI(students) {
  students.forEach((student) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src=${student.imageUrl} alt='' width='200' height='200' />
    <h3>FullName: ${student.fullName}</h3>
    <h4>Age: ${student.age}</h4>
    <button onClick='deleteStudent(${student.id})'>Delete</button>
    `;

    ul.appendChild(li);
  });
}

function deleteStudent(id) {
  fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: null,
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      getData();
    })
    .catch((error) => {
      console.log(error);
    });
}
