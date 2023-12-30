const itemForm = document.querySelector("#item-form")
const itemText = document.querySelector(".form-input")
const itemList = document.querySelector("#item-list")
console.log(itemList)
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
    itemText.value = ""
    console.log(li)
    

}



itemForm.addEventListener('submit', addItem)

