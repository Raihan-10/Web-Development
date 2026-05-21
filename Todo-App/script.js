const input = document.getElementById('input');
const listContainer = document.getElementById('list-container')
const addBtn = document.getElementById('add-btn');

function addTask() {
    const inputValue = input.value.trim()
    // trim() used so that even if user put a space and then click add, it cannot add a task
    if (inputValue === '') return


    // create list
    const list = document.createElement('li');
    list.classList.add('font-semibold', 'flex', 'justify-between', 'items-center', 'rounded-2xl', 'gap-4', 'text-start')
    // list.innerText = inputValue;


    // text span to get line-through
    const text = document.createElement('span')
    text.innerText = inputValue;
    text.classList.add('pl-2', 'flex-1', 'min-w-0');
    // create div
    const div = document.createElement('div');
    div.classList.add('flex', 'gap-3');

    // create done button
    const doneBtn = document.createElement('button')
    // doneBtn.innerText = 'Done';
    doneBtn.setAttribute('data-action', 'done')
    doneBtn.innerHTML = `<i class="pointer-events-none fa-regular fa-circle-check"></i>`;
    doneBtn.classList.add('bg-gray-100', 'cursor-pointer', 'px-3', 'py-1.5', 'font-semibold', 'rounded-2xl', 'hover:text-green-500', 'transition-colors')

    // create delete button

    const deleteBtn = document.createElement('button');
    // deleteBtn.innerText = 'Delete'
    deleteBtn.setAttribute('data-action', 'delete')
    deleteBtn.innerHTML = `<i class="pointer-events-none fa-regular fa-trash-can"></i>`;
    deleteBtn.classList.add('bg-gray-100', 'cursor-pointer', 'hover:text-red-500', 'px-3', 'py-1.5', 'font-semibold', 'rounded-2xl', 'transition-colors')


    // append delete and done button
    div.appendChild(deleteBtn)
    div.appendChild(doneBtn)

    // append div button
    list.appendChild(text)
    list.appendChild(div)


    // append list 
    listContainer.appendChild(list)



    input.value = ''
    // calling saveData function to save locally
    saveData();

};

addBtn.addEventListener('click', addTask)
input.addEventListener('keydown', function (e) {

    if (e.key === 'Enter') {
        addTask();
    }
})

// Event delegation
listContainer.addEventListener('click', function (e) {
    if (e.target.dataset.action === 'delete') {
        e.target.parentElement.parentElement.remove();
        saveData()
    }
    if (e.target.dataset.action === 'done') {
        e.target.parentElement.parentElement.querySelector('span').classList.toggle('line-through')
        saveData();

    }
})



// deleteBtn.addEventListener('click', function () {
//     list.remove();
//     // calling saveData function to save locally
//     saveData();
// })
// doneBtn.addEventListener('click', function done() {
//     text.classList.toggle('line-through')
//     // calling saveData function to save locally
//     saveData();
// })


//    save data locally
function saveData() {
    localStorage.setItem('todoData', listContainer.innerHTML)
}

// load data when refreshing a page
function showData() {
    const savedItems = localStorage.getItem('todoData')
    if (savedItems) {
        listContainer.innerHTML = savedItems
    }
}


// when page reloads it will show the saved data
showData()