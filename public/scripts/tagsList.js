let labelArray = null

function findLabelSuggestion(input) {
    let suggestion = []

    suggestion = labelArray.filter(element => {
        if (input.length > element.length)
            return false
        return input === element.substring(0, input.length)
    })
    console.log(suggestion)

    return suggestion
}

function createTagObject(content) {
    let template = document.createElement('template')
    template.innerHTML =
        `<div class="tag-element">
        <span class="tag-element-text" data-value=${content}>${content}</span> 
        <button class="delete-tag-button">x</button> 
    </div>`
    template.content.querySelector('button').onclick = (event) => {
        event.target.parentNode.remove()
    }
    return template.content  // this is so much simple :O
}

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
        console.log(error)
    }
})();

(function () {
    var tagInput = document.getElementById("tag-input")
    var tagList = document.getElementById("tag-list")
    tagInput.oninput = (e) => {
        // we will calculate the search options
        let suggestion = findLabelSuggestion(tagInput.value)
    }
    tagInput.onchange = () => {
        tagList.insertBefore(createTagObject(tagInput.value), tagInput)
        tagInput.value = ""
    }
})();
