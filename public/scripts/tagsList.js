let labelArray = null
let currentFocus = -1

function findLabelSuggestions(input) {
    if (input === '') {
        return []
    }
    let suggestions = []

    suggestions = labelArray.filter(element => {
        if (input.length > element.length) {
            return false
        }
        return input.toUpperCase() === element.substring(0, input.length).toUpperCase()
    })

    return suggestions
}

function createTagObject(content) {
    let template = document.createElement('template')
    template.innerHTML =
        `<div class="tag-element">
            <span class="tag-element-text" data-value=${content}>${content}</span> 
            <button class="delete-tag-button" type="button">x</button> 
        </div>`
    template.content.querySelector('button').addEventListener('click', (event) => {
        event.target.parentNode.remove()
    })
    return template.content  // this is so much simple :O
}

function closeAutocompleteList() {
    let lists = document.querySelectorAll('.autocomplete-list')
    lists.forEach(element => element.remove())
}

function setActive(autocompleteList) {
    try {
        setAllInactive()
        autocompleteList.querySelectorAll('.unit-suggestion')[currentFocus].classList.add('autocomplete-active')
    } catch (error) {
        console.error(error)
    }
}

function setAllInactive() {
    document.querySelectorAll('#autocomplete-list .unit-suggestion').forEach(element => {
        element.classList.remove('autocomplete-active');
    })
}

function displayAutocompleteOptions(tagInput, suggestions) {
    let template = document.createElement('template')
    let searchValue = tagInput.value
    let autocompleteDiv = document.createElement('div')
    autocompleteDiv.setAttribute('class', 'autocomplete-list')
    autocompleteDiv.setAttribute('id', 'autocomplete-list')

    suggestions.forEach((element) => {
        let unitSuggestion = document.createElement('div')
        unitSuggestion.setAttribute('class', 'unit-suggestion')
        unitSuggestion.innerHTML = `<strong>${element.substr(0, searchValue.length)}</strong>${element.substr(searchValue.length)} 
        <input type='hidden' value="${element}">`

        unitSuggestion.addEventListener('click', (e) => {
            let currentInput = e.currentTarget.querySelector('input') // we might click on the <strong> tag so we need to bubble it up

            if (currentInput) {
                let value = e.currentTarget.querySelector('input').value
                let tagList = document.getElementById('tag-list')
                tagList.insertBefore(createTagObject(value), document.getElementById('autocomplete'))
                tagInput.value = ""
                closeAutocompleteList()
            }
        })

        autocompleteDiv.appendChild(unitSuggestion) // we stack them here
    })

    template.content.appendChild(autocompleteDiv)
    tagInput.parentNode.appendChild(template.content)
};



(async function initializeLabelArray() {
    try {
        let response = await fetch('/api/labels', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        labelArray = (await response.json()).content;
    } catch (error) {
        console.error(error)
    }
})();

(function setLabelTagEvents() {
    const tagInput = document.getElementById('tag-input')
    const tagList = document.getElementById('tag-list')
    const autocomplete = document.getElementById('autocomplete')

    tagInput.addEventListener('input', (e) => {
        closeAutocompleteList()
        currentFocus = -1  //focus on input
        // we will calculate the search options
        let suggestions = findLabelSuggestions(tagInput.value)
        displayAutocompleteOptions(tagInput, suggestions)
    })

    autocomplete.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'ArrowUp':
                if (currentFocus > -1) {
                    currentFocus += -1
                }

                if (currentFocus > -1) {
                    setActive(event.currentTarget.querySelector('#autocomplete-list'))
                }
                break
            case 'ArrowDown':
                currentFocus += 1

                setActive(event.currentTarget.querySelector('#autocomplete-list'))
                break
            case 'Enter':
                if (currentFocus == -1) {
                    tagList.insertBefore(createTagObject(tagInput.value), document.getElementById('autocomplete'))
                    tagInput.value = ""
                    closeAutocompleteList()
                } else {
                    let focusedValue = tagList.querySelector('.autocomplete-active > input').value
                    tagList.insertBefore(createTagObject(focusedValue), document.getElementById('autocomplete'))
                    tagInput.value = ""
                    closeAutocompleteList()
                }
                break
        }
    })
})();
