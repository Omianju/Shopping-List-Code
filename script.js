const itemForm = document.querySelector("#item-form")
const itemText = document.querySelector(".form-input")
const itemList = document.querySelector("#item-list")
const clearAll = document.querySelector('#clear')
const filter = document.querySelector('#filter')

// console.log(itemlist)
function addItem(e) {
    e.preventDefault()
    
    if (itemText.value == "") {
        alert("Please fill Necessary fields.")
        return;
    }
    
    const li = document.createElement('li')
    li.className = 'singleItemList'
    li.appendChild(document.createTextNode(itemText.value))
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')

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

    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
    checkUI()
    itemText.value = ""
}


function removeItem(e) {
    if (e.target.tagName === 'I') {
        if (confirm(`Are you sure to delete ${e.target.parentElement.parentElement.innerText} ?`)) {
            e.target.parentElement.parentElement.remove()
            checkUI()
        }
    }
}


function removeAll(e) {
    const allLi = itemList.children
    const nodeLi= Array.from(allLi)
    nodeLi.forEach((e) => {
        e.remove()
    })
    checkUI()
}

function checkUI() {
    const itemlist = document.querySelectorAll('li')
    if (itemlist.length === 0) {
        
        filter.style.display = "none"
        clearAll.style.display = "none"
    } else {
        filter.style.display = "initial"
        clearAll.style.display = "initial"
    }
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


itemForm.addEventListener('submit', addItem)

itemList.addEventListener('click', removeItem)

clearAll.addEventListener('click', removeAll)

filter.addEventListener('input', searchOut)

