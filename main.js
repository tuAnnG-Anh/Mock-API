var coursesApi = "http://localhost:3000/courses"
function start() {
    getCourses(renderCourses)
    handleCreateForm()
}
start()
//function
function getCourses(callback) {
    fetch(coursesApi)
        .then((response) => {
            return response.json()
        })
        .then(callback)
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses')
    var html = courses.map((course) => {
        return `<li class = "courses-item-${course.id}" >
            <h4>
                ${course.name}
            </h4>
            <h4>
            ${course.description}
        </h4>
        <div>
        <button class="delete" onclick="handleDeleteCourse(${course.id})">
            &times;
        </button>
        <button class="update" onclick="handleUpdateCourse(${course.id}, {name: '${course.name}', description: '${course.description}'})">
            Sửa
        </button>
    </div>
        </li>`;
    })
    listCoursesBlock.innerHTML = html.join('');
}

function createCourses(data, callback) {
    var options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(coursesApi, options)
        .then((response) => {
            return response.json()
        })
}

function handleCreateForm() {
    var createBtn = document.querySelector('.create')
    createBtn.addEventListener('click', () => {
        var name = document.querySelector('input[name ="name"]').value
        var description = document.querySelector('input[name = "description"]').value
        var dataForm = {
            name: name,
            description: description
        }
        createCourses(dataForm)
        name.value = ''
        description.value = ''
    });
}

function handleDeleteCourse(idCourse) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    fetch(coursesApi + '/' + idCourse, options)
        .then((response) => {
            return response.json()
        })

}

function updateCourses(idCourse) {
    var updateCourse = {
        name: document.querySelector('input[name="name"]').value,
        description: document.querySelector('input[name="description"]').value
    }
    var options = {
        method: "PUT",
        body: JSON.stringify(updateCourse),
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(coursesApi + '/' + idCourse, options)
        .then((response) => {
            return response.json()
        })
}

function handleUpdateCourse(idCourse, data) {
    var createBtn = document.querySelector('.create')
    createBtn.innerText = 'Save';
    var name = document.querySelector('input[name ="name"]');
    var description = document.querySelector('input[name = "description"]')
    name.value = data.name;
    description.value = data.description
    createBtn.onclick = () => {
        updateCourses(idCourse, formData)
        name.value = '';
        description.value = ''
        createBtn.innerText = 'Create';
    }
}