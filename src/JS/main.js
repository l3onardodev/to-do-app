const newTaskButton = document.querySelector('.create-item-button');
const clearAllButton = document.querySelector('.delete-item-button');
const modal = document.querySelector('.modal');

const modalCancel = document.querySelector('.button-cancel-modal');
const modalCreate = document.querySelector('.button-confirm-modal');
const modalLabelError = document.querySelector('.modal-label-error');
const modalBackground = document.querySelector('.modal-background');

const taskContainer = document.querySelector('.tasks-container');
const taskNameInput = document.querySelector('[data-js="task-name-input"]');
const appContainer = document.querySelector('.flex-container');

const screenHeight = screen.height;

//se hovuer alguma task no localStorage, as mostra.
getLocalStorageItems();

//verifies height
verifyHeight();


//button to create a new task (opens the modal)
newTaskButton.addEventListener('click', function() {
    modal.style.display = 'flex';
    modal.style.animation = 'modalAnimation 1s ease';
    modalBackground.classList.remove('hidden');

    taskNameInput.focus();

    taskNameInput.value = '';
})

clearAllButton.addEventListener('click', function() {
    taskContainer.innerHTML = '';
    clearAllButton.classList.add('hidden');

    //delete all the data in the localStorage
    localStorage.clear();

    verifyHeight();
})

modalCancel.addEventListener('click', function() {
    modal.style.display = 'none';
    modalLabelError.style.display = 'none';
    modalBackground.classList.add('hidden');
});

document.addEventListener('keydown', function(event) {
    if (!modal.classList.contains('hidden')) {
        if (event.key === 'Enter') {
            event.preventDefault();
            createItem();
        } else if (event.key === 'Escape') {
            modal.style.display = 'none';
            modalLabelError.style.display = 'none';
            modalBackground.classList.add('hidden');
            // modal.classList.add('hidden');
        }
    }
});

modalCreate.addEventListener('click', createItem);

function createItem() {
    verifyHeight();

    // console.log(`total height:` + screen.height)
    if(taskNameInput.value.length === 0) {
        modalLabelError.style.display = 'block';
    } 
    else {
        //armazena a task no localStorage
        localStorage.setItem(taskNameInput.value, ' ');

        //display the tasks accordingly the data coming from localStorage
        getLocalStorageItems();

        modalLabelError.style.display = 'none';
        modal.style.display = 'none';
        modalBackground.classList.add('hidden');

        if(clearAllButton.classList.contains('hidden')) clearAllButton.classList.remove('hidden');
        
        listenersDoneAndDeleteInTaskItem();
    }
}

function getLocalStorageItems() {
    taskContainer.innerHTML = '';

    if (localStorage.length === 0) {
        return;
    } else {
        //display the clearAll button
        clearAllButton.classList.remove('hidden');

        const localStorageItems = Object.entries(localStorage);
        console.log(localStorage);

        localStorageItems.forEach((element) => {
            taskContainer.insertAdjacentHTML('afterbegin', `
            <div class="task-item">
                <div class="task-item-text">
                    <label>${element[0]}</label>
                </div>
                <div class="task-item-icons">
                    <img src="src/images/icon-done.png" data-js="done-icon">
                    <img src="src/images/icon-remove.png" data-js="remove-icon">
                </div>
            </div>`);
        })
        //add listeners to container task's buttons
        listenersDoneAndDeleteInTaskItem();
    }
}

function listenersDoneAndDeleteInTaskItem() {
    console.log('cheguei aqui');
    document.querySelector('[data-js="remove-icon"]').addEventListener('click', function(event) {
        //remove item from list
        const taskName = event.target.parentElement.parentElement.children[0].innerText;

        localStorage.removeItem(taskName, ' ');
        console.log('Excluído com sucesso.');
        //get the data again and update the UI.
        getLocalStorageItems();
    })

    document.querySelector('[data-js="done-icon"]').addEventListener('click', function(event) {
        event.target.parentElement.parentElement.firstElementChild.childNodes[1].style.textDecoration = 'line-through';
    })
};

function verifyHeight() {
    console.log(appContainer.offsetHeight);
    console.log(window.innerHeight);
    if (appContainer.clientHeight >= window.innerHeight * 90 / 100) {
        document.querySelector('.background').style.height = 'auto';
        console.log('auto');
    } else {
        document.querySelector('.background').style.height = '100vh';
        console.log('100vh');
    }
}