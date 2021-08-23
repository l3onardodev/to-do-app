const newTaskButton = document.querySelector('.create-item-button');
const clearAllButton = document.querySelector('.delete-item-button');
const modal = document.querySelector('.modal');

const modalCancel = document.querySelector('.button-cancel-modal');
const modalCreate = document.querySelector('.button-confirm-modal');
const modalLabelError = document.querySelector('.modal-label-error');

const taskContainer = document.querySelector('.tasks-container');
const taskNameInput = document.querySelector('[data-js="task-name-input"]');

newTaskButton.addEventListener('click', function() {
    modal.style.display = 'flex';
    modal.style.animation = 'modalAnimation 1s ease';

    taskNameInput.focus();

    taskNameInput.value = '';
})

clearAllButton.addEventListener('click', function() {
    taskContainer.innerHTML = '';
})

modalCancel.addEventListener('click', function() {
    modal.style.display = 'none';
    modalLabelError.style.display = 'none';
});

document.addEventListener('keydown', function(event) {
    if (!modal.classList.contains('hidden')) {
        if (event.key === 'Enter') {
            event.preventDefault();
            createItem();
        } else if (event.key === 'Escape') {
            modal.style.display = 'none';
            modalLabelError.style.display = 'none';
        }
    }
});

modalCreate.addEventListener('click', createItem);

function createItem() {
    if(taskNameInput.value.length === 0) {
        modalLabelError.style.display = 'block';
    } 
    else {
        modalLabelError.style.display = 'none';
        modal.style.display = 'none';

        clearAllButton.classList.remove('hidden');

        taskContainer.insertAdjacentHTML('afterbegin', `
        <div class="task-item">
            <div class="task-item-text">
                <label>${taskNameInput.value}</label>
            </div>
            <div class="task-item-icons">
                <img src="src/images/icon-done.png" data-js="done-icon">
                <img src="src/images/icon-remove.png" data-js="remove-icon">
            </div>
        </div>
        `)
        
        b();
    }
}

function b() {
    document.querySelector('[data-js="remove-icon"]').addEventListener('click', function(event) {
        //remove item from list
        event.target.parentElement.parentElement.remove();
    })

    document.querySelector('[data-js="done-icon"]').addEventListener('click', function(event) {
        event.target.parentElement.parentElement.firstElementChild.childNodes[1].style.textDecoration = 'line-through';
    })
}