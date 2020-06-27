function getTagObject(content){
    let tagElement = document.createElement('div')
    tagElement.classList.add('tagElement')

    let tagElementText = document.createElement('span')
    let text = document.createTextNode(content)
    tagElementText.classList.add('tagElementText')
    tagElementText.appendChild(text)

    let deleteTag = document.createElement('button')
    deleteTag.value = "X"

    tagElement.appendChild(tagElementText)
    tagElement.appendChild(deleteTag)

    return tagElement

}
(function(){
    console.log('wow')
    var tagInput = document.getElementById("tagInput")
    tagInput.oninput =  () => {
        console.log(tagInput.value)
    }
    tagInput.onchange = () => {
        console.log('WORKS' + tagInput.value)
        tagInput.insertAdjacentElement('beforebegin',getTagObject(tagInput.value))
        tagInput.value = ""
    }
})()