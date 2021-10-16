const menuOpen = document.querySelector('.nav-menu--open');
const menuClose = document.querySelector('.nav-menu--close');
const navList = document.querySelector('.nav-list');
const addSection = document.querySelector('.add-section');
const content = document.querySelector('.content');
const navbar = document.querySelector('.nav-list');
let taskCount = 0;

const menuOpenClose = function (open = 'open') {
    menuOpen.style.display = open === 'open' ? "none" : 'block';
    menuClose.style.display = open === 'open' ? "block" : 'none';
    navList.style.display = open === 'open' ? "flex" : 'none';
};


menuOpen.addEventListener('click', function () {
    menuOpenClose('open');
});

menuClose.addEventListener('click', function () {
    menuOpenClose('close');
});

addSection.addEventListener('click', function () {

    // Add New Section
    const sectionName = prompt("New Section Name:");
    const sectionExist = document.getElementById(sectionName);
    if (sectionName === null) {
        return;
    } else if (sectionExist) {
        alert('Section Already exist!');
    } else if (!(sectionName === "") && !(sectionName === undefined)) {
        const newSection = document.createElement('section');
        newSection.classList.add('section');
        newSection.innerHTML = `
            <div class="section-body" id="${sectionName}">
                
                <div class="heading-container">
                <ion-icon class="section-delete ${sectionName}-section-delete" name="skull-outline"></ion-icon>
                    <h2 id="heading-secondary">${sectionName}<h2>
                    <ion-icon class="add-task ${sectionName}-task" name="add-outline"></ion-icon>
                </div>
                <ol class="task-list ${sectionName}-task-list">
                </ol>
                
            </div>
        `;
        content.appendChild(newSection);

        //Add the new section in the navigation --------------------------------------------------------
        const newNavigation = document.createElement('li');
        newNavigation.classList.add('nav-element');
        newNavigation.innerHTML = `<a class="nav-link" href="#${sectionName}">${sectionName}</a>`;
        navList.appendChild(newNavigation);

        //Clicking on skull button deletes the section ------------------------------------------------
        const deleteButton = document.querySelector(`.${sectionName}-section-delete`);
        deleteButton.addEventListener('click', function () {

            // Delete section
            content.removeChild(newSection);

            // Delete from navigation bar
            navList.removeChild(newNavigation);
        })

        // add task adding scene -----------------------------------------------------------------------
        const newScene = document.createElement('div');
        newScene.classList.add('add-task-background', `${sectionName}-task-background`)
        newScene.innerHTML = `
            <div class="add-task-container ${sectionName}-task-container">
                <ion-icon class="add-task-close ${sectionName}-task-close" name="close-circle-outline"></ion-icon>
                <div class="add-task-body ${sectionName}-task-body">
                    <h2 id="heading-secondary">Add a task<h2>
                            <input class="task-name ${sectionName}-task-name" type="text" placeholder="Gotta poop">
                            <button class="task-button ${sectionName}-task-button">Add</button>
                </div>
            </div>
        `;
        content.appendChild(newScene);

        // Make add task button work ---------------------------------------------------------------------
        // Button that shows the scene to add more tasks
        const addTaskButton = document.querySelector(`.${sectionName}-task`);

        // Blurred background
        const addTaskBackground = document.querySelector(`.${sectionName}-task-background`);

        // Close button
        const addTaskClose = document.querySelector(`.${sectionName}-task-close`);

        // Task submit button
        const submitTask = document.querySelector(`.${sectionName}-task-button`);

        // Show task adding scene
        addTaskButton.addEventListener('click', function () {
            addTaskBackground.style.display = 'block';
        });

        // Click to close the scene
        addTaskClose.addEventListener('click', function () {
            addTaskBackground.style.display = 'none';
        });

        // add task
        submitTask.addEventListener('click', function () {
            const taskName = document.querySelector(`.${sectionName}-task-name`);
            if (!(taskName.value === "")) {

                const addToList = document.querySelector(`.${sectionName}-task-list`);


                const newTaskElement = document.createElement('li');
                taskCount += 1;
                newTaskElement.classList.add('task-element');
                newTaskElement.id = taskCount;
                newTaskElement.innerHTML = `
                <span class="task-element-content">
                ${taskName.value} <ion-icon class="task-delete task-delete-${taskCount}" name="remove-circle-outline"></ion-icon>
                </span/
                `;

                addToList.appendChild(newTaskElement);
                taskName.value = "";
                const deleteTask = document.querySelector(`.task-delete-${taskCount}`);
                deleteTask.addEventListener('click', function () {
                    addToList.removeChild(newTaskElement);
                });
            }

        });
        // ----------------------------------------------------------------------------------------------

    } else {
        alert("Need section name!");
    }
});