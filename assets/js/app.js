/*==================== Profile Name and Avatar Showing Function ====================*/
setNameData();
setImgSrc();

/*==================== Swiper Category ====================*/
let swiperCategory = new Swiper(".swiper__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 38,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamiBullets: true,
    },
    // mousewheel: true,
    // keyboard: true,
    breakpoints:{
        380: {
            slidesPerView: 2,
        }
    }
});

/*==================== Task Add Page Popup ====================*/
let addTaskBtn = document.getElementById('addTaskBtn');
let timesIcon = document.getElementById('timesIcon');
let options = document.getElementById('options');

// Show Add Task Popup Page 
addTaskBtn.addEventListener('click', function() {
    options.classList.add('slid-up');
});
// Remove Add Task Popup Page 
timesIcon.addEventListener('click', function() {
    options.classList.remove('slid-up');
    let optionForm = document.getElementById('optionForm');
    optionForm.reset();
})

/*==================== Welcome Page Animation ====================*/
let startBtn = document.getElementById('startBtn');
let startUpPage = document.querySelector('.startup__page');

// Remove First Welcome Page
startBtn.addEventListener('click', function() {
    startUpPage.classList.add('slide-left');
})

let firstName = document.getElementById('f-name');
let lastName = document.getElementById('l-name');
let goBtn = document.getElementById('go');

// Remove Second Welcome Page and Add Name to Profile
goBtn.addEventListener('click', function() {
    if(firstName.value == '' || lastName.value == '') {
        let fNameRegx = /^[a-zA-Z]([0-9a-zA-Z ]){3,10}$/;

        if(!fNameRegx.test(firstName.value)) {
            firstName.classList.add('invalid');
            firstName.addEventListener('input', () => {
                firstName.classList.remove('invalid');
            })
        } else if(!fNameRegx.test(lastName.value)) {
            lastName.classList.add('invalid')
            lastName.addEventListener('input', () => {
                lastName.classList.remove('invalid');
            })
        }
    } else{
        let nameArr = JSON.parse(localStorage.getItem('name'))
        if(nameArr == null) {
            let newArr = [];
            newArr[0] = firstName.value;
            localStorage.setItem('name', JSON.stringify(newArr))

            let welcome = document.getElementById('welcome');
            welcome.classList.add('slide-left');
            setTimeout(function() {
                welcome.style.display = 'none';
            }, 1000)
        }else{
            setNameData()
        }
        setNameData()
    }
})

function setNameData() {
    let welcome = document.getElementById('welcome');
    let nameArr = JSON.parse(localStorage.getItem('name'))
    if(nameArr == null) {
        welcome.style.display = 'block';
    } else {
        let profileName = document.getElementById('profileName');
        profileName.innerHTML = nameArr[0];

        welcome.style.display = 'none';
    }
}


let mainAvatar = document.getElementById('mainAvatar');
let avatarGroup = document.getElementById('avatarGroup');

// Show Avater Select Option
mainAvatar.addEventListener('click', () => {
    let avatarGroup = document.getElementById('avatarGroup');
    avatarGroup.style.top = '1.5rem';
})

let avatarArr = [...avatarGroup.children]
avatarArr.forEach((val) => {

    // Show Selected Avater in Main Profile
    val.addEventListener('click', function(e) {
        let link = e.target.src + '';

        let linkArr = [];
        linkArr[0] = link;
        localStorage.setItem('src', JSON.stringify(linkArr))

        setImgSrc();

        avatarGroup.style.top = '-100%';
    })

})

function setImgSrc() {
    let profileImg = document.querySelector('.profile__img');
    let srcArr = JSON.parse(localStorage.getItem('src'));
    if(srcArr == null) {
        profileImg.src = profileImg.src;
    } else {
        profileImg.src = srcArr[0];
    }
}

// ========= Task Add Functionality =========
let taskTitle = document.getElementById('title');
let categoryOption = document.getElementById('categoryOption');
let startTime = document.getElementById('startTime');
let deadLine = document.getElementById('deadLine');
let endTime = document.getElementById('endTime');
let addTask = document.getElementById('addTask');

let taskNumber = document.getElementById('taskNumber');


// List Data Constructor
function Listdata(title, category, deadLine, start, end) {
    this.title = title
    this.category = category
    this.deadLine = deadLine
    this.start = start
    this.end = end
}

// Add all the Data in front end
addTask.addEventListener('click', (e) => {
    e.preventDefault();
    let taskRegx = /^[a-zA-z]([0-9a-zA-Z ]){3,30}$/;
    if(!taskRegx.test(taskTitle.value)) {
        taskTitle.classList.add('invalid__task');
        onInputFunc(taskTitle)
    } else if(categoryOption.value == '') {
        categoryOption.classList.add('invalid__task');
        categoryOption.addEventListener('change', () => {
            categoryOption.classList.remove('invalid__task');
        })
    } else if(deadLine.value == '') {
        deadLine.classList.add('invalid__task');
        onInputFunc(deadLine)
    } else if(startTime.value == '') {
        startTime.classList.add('invalid__task');
        onInputFunc(startTime)
    } else if(endTime.value == '') {
        endTime.classList.add('invalid__task');
        onInputFunc(endTime)
    } else {
        let listData = new Listdata(taskTitle.value, categoryOption.value, deadLine.value, startTime.value, endTime.value);
        manageList(listData);
        showListData();
        options.classList.remove('slid-up');

        let optionForm = document.getElementById('optionForm');
        optionForm.reset();
    }

    pendingTask();
    pendingTaskOnCategory();
    hideListImg();
})

// Manage List Data
function manageList(obj) {
    let listArr = JSON.parse(localStorage.getItem('list'));
    if(listArr == null) {
        let newArr = [obj];
        localStorage.setItem('list', JSON.stringify(newArr));
    } else {
        listArr.push(obj);
        localStorage.setItem('list', JSON.stringify(listArr));
    }
}

// Show List Data in front end
function showListData() {
    let listArr = JSON.parse(localStorage.getItem('list'));
    if(listArr == null) {
        console.log('No Data Found')
    } else {
        let htmlTemplate = '';
        listArr.forEach((val, ind) => {
            let date = val.deadLine
            let jsDate = new Date(date);
            let monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']

            htmlTemplate += `
                                <div class="task">
                                    <div class="task__details">
                                        <h3 class="task__title">${val.title}</h3>
                                        <span class="task__subtitle">${val.category}</span>
                                        <p class="task__deadline">
                                            <span><i class="fas fa-calendar-week"></i> ${jsDate.getDate()} ${monthArr[jsDate.getMonth()]}, ${jsDate.getFullYear()}</span>
                                        </p>
                                        <p class="task__time">
                                            <span><i class="fas fa-clock"></i></span> ${val.start} PM - ${val.end} AM
                                        </p>
                                    </div>
                                    <div class="task__modal-icon" id="${ind}" onclick="deleteTask(this.id)">
                                        <i class="far fa-trash-alt arrow__icon"></i>
                                    </div>
                                </div>
                                `;
        })
        let taskContainer = document.getElementById('taskContainer');
        taskContainer.innerHTML = htmlTemplate
    }
}
showListData()

// Search Todo list
let search = document.getElementById('search');
search.addEventListener('input', () => {
    let inpText = search.value.toLowerCase();
    let singleTask = document.getElementsByClassName('task');
    Array.from(singleTask).forEach((val) => {
        let taskVal = val.getElementsByTagName('h3')[0].innerText.toLowerCase();

        if(taskVal.includes(inpText)) {
            val.style.display = 'flex';
        } else {
            val.style.display = 'none';
        }
    })
})


// Delete Task Function
function deleteTask(ind) {
    let listArr = JSON.parse(localStorage.getItem('list'));
    if(listArr == null) {
        console.log('No Data Found')
    } else {
        listArr.splice(ind, 1);
        localStorage.setItem('list', JSON.stringify(listArr));
        showListData();
        pendingTask();
        pendingTaskOnCategory();
        hideListImg()
    }
}


// Hiding List Container Img After adding Task
function hideListImg() {
    let taskArr = [...taskContainer.children];

    if(taskArr.length != 0){
        taskContainer.classList.add('hide-list-img');
    } else{
        taskContainer.classList.remove('hide-list-img');
    }
}
hideListImg()

// OnInput function
function onInputFunc(inpVal) {
    inpVal.addEventListener('input', () => {
        inpVal.classList.remove('invalid__task');
    })
}

// Remove Invalid Class
function removeInvalid() {
    taskTitle.classList.remove('invalid__task');
    categoryOption.classList.remove('invalid__task');
    startTime.classList.remove('invalid__task');
    endTime.classList.remove('invalid__task');
}

// Show pending task at Top
function pendingTask() {
    let taskArr = [...taskContainer.children];
    taskNumber.innerHTML = taskArr.length
}
pendingTask();

function pendingTaskOnCategory() {
    let demoCategory = document.querySelectorAll('.task__subtitle');
    
    let marketingArr = []
    let designArr = []
    let developArr = []
    let meetingArr = []
    let businessArr = []
    
    demoCategory.forEach(val => {
        if(val.innerHTML === 'Marketing') {
            marketingArr.push(val.innerHTML)
        }
        if(val.innerHTML === 'Design') {
            designArr.push(val.innerHTML)
        }
        if(val.innerHTML === 'Development') {
            developArr.push(val.innerHTML)
        }
        if(val.innerHTML === 'Meeting') {
            meetingArr.push(val.innerHTML)
        }
        if(val.innerHTML === 'Business') {
            businessArr.push(val.innerHTML)
        }
    })

    let categoryTasks = document.getElementsByClassName('category__tasks');
    let arrOfCategory = [...categoryTasks]
    
    arrOfCategory.forEach(val => {
        if(val.previousElementSibling.innerHTML === 'Marketing') {
            val.innerHTML = `${marketingArr.length} Tasks`
        }
        if(val.previousElementSibling.innerHTML === 'Design') {
            val.innerHTML = `${designArr.length} Tasks`
        }
        if(val.previousElementSibling.innerHTML === 'Development') {
            val.innerHTML = `${developArr.length} Tasks`
        }
        if(val.previousElementSibling.innerHTML === 'Meeting') {
            val.innerHTML = `${meetingArr.length} Tasks`
        }
        if(val.previousElementSibling.innerHTML === 'Business') {
            val.innerHTML = `${businessArr.length} Tasks`
        }
    })

}
pendingTaskOnCategory()