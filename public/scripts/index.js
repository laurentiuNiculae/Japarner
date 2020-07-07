function getWordFormData(form) {
    let wordData = {}
    //get content, reading example
    wordData.content = document.getElementById('word-content').value
    wordData.phoneticReading = document.getElementById('word-reading').value
    //get meanings-examples
    const currentWordMeaningsInputs = document.getElementById('word-meanings-examples').querySelectorAll('.word-input');
    const currentWordExamplesInputs = document.getElementById('word-meanings-examples').querySelectorAll('.word-example');
    let wordMeanings = Array.from(currentWordMeaningsInputs).map((wordInput) => { return wordInput.value })
    let wordExamples = Array.from(currentWordExamplesInputs).map((wordInput) => { return wordInput.value })

    wordData.meanings = wordMeanings.map((wordMeaning, i) => { return { 'meaning': wordMeaning, 'example': wordExamples[i] } })
    //get knowledge level
    let reducer = (accumulator, currentValue) => {
        return accumulator + (currentValue.checked ? parseInt(currentValue.value) : 0)
    }
    let knowledgeRateSelector = document.getElementById('word-knowledge-rate').querySelectorAll('input')
    wordData.knowledgeLevel = Array.from(knowledgeRateSelector).reduce(reducer, 0).toString()
    if (wordData.knowledgeLevel === '0') {
        wordData.knowledgeLevel = '1';
    }

    // labels
    wordLabels = document.getElementById('tag-list').querySelectorAll('.tag-element-text')
    wordData.labels = Array.from(wordLabels).map((labelSpan => { return labelSpan.getAttribute('data-value') }))

    console.log(wordData)
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

(function setPostWordEvent() {
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
        console.log(response)
    })
})();

(function setAddMeaningsEvent() {
    let addMoreButton = document.getElementById('add-more-meanings')

    addMoreButton.addEventListener('click', (event) => {
        let inputTemplate = document.createElement('template')
        inputTemplate.innerHTML =
            `<div class="meaning-example-group">
            <input class="word-input" type="text" placeholder="Meaning" name="meaning">
            <input class="word-example"type="text" placeholder="Example" name="example">
        </div>`
        let wordMeanings = document.getElementById('word-meanings-examples')
        wordMeanings.insertBefore(inputTemplate.content, event.target)
    })
})();


