function getWordFormData(form) {
    let wordData = {}
    //get content, reading example
    wordData.content = document.getElementById('word-content').value
    wordData.phoneticReading = document.getElementById('word-reading').value
    wordData.example = document.getElementById('word-example').value
    //get meanings
    wordData.meanings = Array.from(document.getElementById('word-meanings').querySelectorAll('input')).map((word) => { return word.value })

    //get knowledge level
    let reducer = (accumulator, currentValue) => {
        if (currentValue.checked) {
            return accumulator + parseInt(currentValue.value)
        } else { return accumulator }
    }
    wordData.knowledgeLevel = Array.from(document.getElementById('word-knowledge-rate').querySelectorAll('input')).reduce(reducer, 0)
    if (wordData == 0)
        wordData = 1;

    // labels
    wordData.labels = Array.from(document.getElementById('tag-list').querySelectorAll('.tag-element-text')).map((labelSpan => { return labelSpan.getAttribute('data-value') }))
    return wordData
}

async function postWord(wordData) {
    let response
    try {
        response = await fetch('/api/words', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wordData)
        })
    } catch (error) {
        response = error
    }
    return response.json()
}

(function () {
    var wordForm = document.getElementById('add-word-form')
    wordForm.onsubmit = function (e) {
        e.preventDefault()
    }

    var submitButton = document.getElementById('submit-word')
    submitButton.onclick = async function (e) {
        // collect data
        let wordData = getWordFormData(wordForm)
        console.log(wordData)
        // make request
        let response = await postWord(wordData)
        console.log(response)
        //manage the response
    }
    console.log('addedEvent')
})();

(function addMeaningsEvent(){
    let addMoreButton = document.getElementById('add-more-meanings')

    addMoreButton.onclick = (event) => {
        let inputTemplate = document.createElement('template')
        inputTemplate.innerHTML = '<input type="text" placeholder="Meaning" name = "meaning">'
        let wordMeanings = document.getElementById('word-meanings')
        wordMeanings.insertBefore(inputTemplate.content , event.target)
    }
})();


