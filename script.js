const itemForm = document.querySelector("#item-form")
const itemText = document.querySelector(".form-input")
const itemList = document.querySelector("#item-list")
const clearAll = document.querySelector('#clear')
const filter = document.querySelector('#filter')
const submitBtn = itemForm.querySelector('.btn')
let isEditMode = false
// console.log(itemlist)


function displayItems() {
    const itemsFromStorage = getItemFromStorage()
    itemsFromStorage.forEach((item) => {
        addingItemsToDOM(item)
    })
    checkUI()
}


function addItem(e) {
    e.preventDefault()
    
    if (itemText.value == "") {
        alert("Please fill Necessary fields.")
        return;
    }

    if (isEditMode) {
        const editMode = itemList.querySelector('.add-toedit')
        removeItemFromStorage(editMode.textContent)
        editMode.classList.remove('.add-toedit')
        editMode.remove()
        isEditMode = false
    } else {
        if (checkIfItemExist(itemText.value)) {
            alert(`Hey buddy ${itemText.value} already exists in the list.`)
            return
        }
    }


    addingItemsToDOM(itemText.value)
    addToStorage(itemText.value)
    checkUI()
    itemText.value = ""
}


function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    return button;
}


function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon;
}


function addToStorage(item) {
    const itemsFromStorage = getItemFromStorage()
    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function getItemFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') == null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}


function addingItemsToDOM(item) {
    const li = document.createElement('li')
    li.className = 'singleItemList'
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    li.appendChild(document.createTextNode(item))
    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
}


function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        if (confirm(`Are you sure to delete ${e.target.parentElement.parentElement.innerText} ?`)) {
            removeItem(e.target.parentElement.parentElement)
        } 
        checkUI()
    }else {
        setItemsToEdit(e.target)
    }

    
}


function checkIfItemExist(newItem) {
    const itemsFromStorage = getItemFromStorage()
    return itemsFromStorage.includes(newItem)
}


function setItemsToEdit(item) {
    isEditMode = true
    document.querySelectorAll("li").forEach((item) => item.classList.remove('add-toedit'))    
    item.classList.add('add-toedit')
    submitBtn.innerHTML = '<i class="fa-solid fa-pen" ></i>  Update Item'
    itemText.value = item.innerText
    submitBtn.style.backgroundColor = '#228B22'

}


function removeItem(item) {
    item.remove()
    removeItemFromStorage(item.textContent)

    // if (e.target.tagName === 'I') {
    //     if (confirm(`Are you sure to delete ${e.target.parentElement.parentElement.innerText} ?`)) {
    //         e.target.parentElement.parentElement.remove()
    //         checkUI()
    //     }
    // }
}


function removeItemFromStorage(item) {
    let itemsFromStorage = getItemFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i) => i != item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


function removeAll(e) {
    const allLi = itemList.children
    const nodeLi= Array.from(allLi)
    nodeLi.forEach((e) => {
        e.remove()
    })

    const itemsFromStorage = []
    console.log(itemsFromStorage)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
    
    checkUI()
}


function checkUI() {
    itemText.value = ""
    const itemlist = document.querySelectorAll('li')
    if (itemlist.length === 0) {
        
        filter.style.display = "none"
        clearAll.style.display = "none"
    } else {
        filter.style.display = "initial"
        clearAll.style.display = "initial"
    }
    submitBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Add item'
    submitBtn.style.backgroundColor = '#333'
    isEditMode = false
}


function searchOut(e) {
    const inputed = e.target.value.toLowerCase()
    const itemLists = document.querySelectorAll("li")
    itemLists.forEach((item) => {
        if (item.innerText.toLowerCase().indexOf(inputed) != -1) {
            item.style.display = "flex"
        } else {
            item.style.display = "none"
            console.log('chala')
        }
    })
}


function init() {
    itemForm.addEventListener('submit', addItem)

    itemList.addEventListener('click', onClickItem)

    clearAll.addEventListener('click', removeAll)

    filter.addEventListener('input', searchOut)

    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()


}


init();

