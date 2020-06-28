function getTagObject(content){
    let template = document.createElement('template')
    template.innerHTML = 
    `<div class="tag-element">
        <span class="tag-element-text" data-value=${content}>${content}</span> 
        <button class="delete-tag-button"></button> 
    </div>`
    return template.content  // this is so much simple :O

}
(function(){
    var tagInput = document.getElementById("tag-input")
    var tagList = document.getElementById("tag-list")
    tagInput.oninput =  () => {
        // we will calculate the search options
    }
    tagInput.onchange = () => {
        tagList.insertBefore(getTagObject(tagInput.value),tagInput)
        tagInput.value = ""
    }
})()