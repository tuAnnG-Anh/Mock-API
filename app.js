var courseApi = 'http://localhost:3000/courses';

function start() {
    getCourse(renderCourses);
    handleCreateCourse();
}

start();

function getCourse(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses) {
    var listCourses = document.getElementById('list-courses');
    var htmls = courses.map(function (course) {
        return addLiCourse(course);
    });
    listCourses.innerHTML = htmls.join('');
}

// create course
function handleCreateCourse() {
    var createBtn = document.getElementById('createBtn');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var newCourse = {
            name: name,
            description: description
        }
        createCoure(newCourse);
        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="description"]').value = '';
    };
}


function createCoure(data) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, option)
        .then(function (response) {
            return response.json();
        })
    // .then(function (createdCourse) {
    //     var listCourses = document.getElementById('list-courses');
    //     listCourses.innerHTML += addLiCourse(createdCourse);
    // })
}


function addLiCourse(course) {
    return `
        <li class="course-item-${course.id}">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">Delete</button>
            <button onclick="handleUpdateCourse(${course.id})">Update</button>
        </li>
    `;
}


//delete course
function handleDeleteCourse(id) {
    var option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(courseApi + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
    // .then(function () {
    //     var deleteCourse = document.querySelector('.course-item-' + id);
    //     if (deleteCourse) {
    //         deleteCourse.remove();
    //     }
    // })
}


// update course
function handleUpdateCourse(id) {
    var name = document.querySelector('.course-item-' + id + ' h3').innerText;
    var description = document.querySelector('.course-item-' + id + ' p').innerText;
    document.querySelector('input[name="name"]').value = name;
    document.querySelector('input[name="description"]').value = description;
    var createBtn = document.getElementById('createBtn');
    createBtn.innerText = 'Save';
    createBtn.onclick = function () {
        updateCourse(id);
        createBtn.innerText = 'Add';
    }
}

function updateCourse(id) {
    var updateCourse = {
        name: document.querySelector('input[name="name"]').value,
        description: document.querySelector('input[name="description"]').value
    }
    var option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCourse)
    }
    fetch(courseApi + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            // document.querySelector('.course-item-' + id + ' h3').innerText = updateCourse.name;
            // document.querySelector('.course-item-' + id + ' p').innerText = updateCourse.description;
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="description"]').value = '';
        })
}
