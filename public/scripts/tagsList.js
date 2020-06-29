let labelArray

function findSuggestion(input) {
    let suggestion = []

    suggestion = labelArray.filter(element => {
        if (input.length > element.length)
            return false
        return input === element.substring(0, input.length)
    })
    console.log(suggestion)

    return suggestion
}

function getTagObject(content) {
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

(function initializeLabelArray() {
    
})();

(function () {
    console.log("bunica")
    var tagInput = document.getElementById("tag-input")
    var tagList = document.getElementById("tag-list")
    tagInput.oninput = () => {
        // we will calculate the search options
    }
    tagInput.onchange = () => {
        tagList.insertBefore(getTagObject(tagInput.value), tagInput)
        tagInput.value = ""
    }
})();