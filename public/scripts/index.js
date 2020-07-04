function getWordFormData(form) {
    let wordData = {}
    //get content, reading example
    wordData.content = document.getElementById('word-content').value
    wordData.phoneticReading = document.getElementById('word-reading').value
    wordData.example = document.getElementById('word-example').value
    //get meanings
    const currentWordMeaningsInputs = document.getElementById('word-meanings').querySelectorAll('input');
    wordData.meanings = Array.from(currentWordMeaningsInputs).map((wordInput) => { return wordInput.value })
    //get knowledge level
    let reducer = (accumulator, currentValue) => {
        return accumulator + (currentValue.checked ? parseInt(currentValue.value) : 0)
    }
    let knowledgeRateSelector = document.getElementById('word-knowledge-rate').querySelectorAll('input')
    wordData.knowledgeLevel = Array.from(knowledgeRateSelector).reduce(reducer, 0).toString()
    if (wordData.knowledgeLevel == '0') {
        wordData.knowledgeLevel = '1';
    }

    // labels
    wordLabels = document.getElementById('tag-list').querySelectorAll('.tag-element-text')
    wordData.labels = Array.from(wordLabels).map((labelSpan => { return labelSpan.getAttribute('data-value') }))
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
        console.error(error)
    }
    return response.json()
}

(function () {
    var wordForm = document.getElementById('add-word-form')
    wordForm.addEventListener('submit', function (e) {
        e.preventDefault()
    })

    var submitButton = document.getElementById('submit-word')
    submitButton.addEventListener('click', async function (e) {
        // collect data
        let wordData = getWordFormData(wordForm)
        // make request
        let response = await postWord(wordData)
        //manage the response
    })
})();

(function addMeaningsEvent() {
    let addMoreButton = document.getElementById('add-more-meanings')

    addMoreButton.addEventListener('click', (event) => {
        let inputTemplate = document.createElement('template')
        inputTemplate.innerHTML = '<input type="text" placeholder="Meaning" name = "meaning">'
        let wordMeanings = document.getElementById('word-meanings')
        wordMeanings.insertBefore(inputTemplate.content, event.target)
    })
})();


