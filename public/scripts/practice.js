let currentWord = null
let currentWordIndex = null
let allWords = null
let practiceType = "JE"
async function getWords(index = null) {

    //get all practice words
    const fetchUrl = '/practice/words'
    let response = await fetch(fetchUrl, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        credentials: 'include'
    })
    return await response.json()
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}


function loadWordData() {
    const wordContent = document.getElementById('word-content-text')
    const wordExample = document.getElementById('word-example-text')
    const wordReading = document.getElementById('word-reading-text')
    const wordMeaning = document.getElementById('word-meaning-text')
    const knowledgeLevelRate = document.getElementById('word-knowledge-rate')

    if(practiceType === "JE"){
        wordContent.innerText = currentWord.content
        wordMeaning.innerText = currentWord.meanings[0].meaning
    } else if (practiceType === "EJ") {
        wordContent.innerText = currentWord.meanings[0].meaning
        wordMeaning.innerText = currentWord.content
    }


    wordExample.innerText = currentWord.meanings[0].example
    wordReading.innerText = currentWord.phoneticReading
    if (true) {
        wordExample.style.display = 'none'
        wordMeaning.style.display = 'none'
        wordReading.style.display = 'none'
    }
    const nextButton = document.getElementById('next')
    const previousButton = document.getElementById('previous')
    knowledgeLevelRate.querySelectorAll('input')[3 - currentWord.knowledgeLevel].checked = true
    currentWordIndex == allWords.length - 1 ? nextButton.disabled = true : nextButton.disabled = false
    currentWordIndex == 0 ? previousButton.disabled = true : previousButton.disabled = false

}


(function initializeWord() {

    window.addEventListener('load', async (event) => {
        response = await getWords()
        allWords = shuffle(response.content.results)
        currentWord = allWords[0]
        currentWordIndex = 0
        loadWordData()
    })

})();


(function initEvents() {
    const nextButton = document.getElementById('next')
    const previousButton = document.getElementById('previous')
    const closeSession = document.getElementById('close-session')
    const showExampleButton = document.getElementById('show-example-button')
    const showReadingButton = document.getElementById('show-reading-button')
    const showMeaningButton = document.getElementById('show-meaning-button')
    const knowledgeLevelRate = document.getElementById('word-knowledge-rate')
    const changePracticeTypeButton = document.getElementById('change-practice-type')

    nextButton.addEventListener('click', async (event) => {
        currentWord = allWords[++currentWordIndex]
        loadWordData()
    })

    previousButton.addEventListener('click', async (event) => {
        currentWord = allWords[--currentWordIndex]
        loadWordData()
    })

    closeSession.addEventListener('click', async (event) => {
        let response = await fetch('/practice', {
            method: 'delete',
            credentials: 'include'
        })
        if (response.redirected) {
            window.location.href = response.url
        }
    })

    showExampleButton.addEventListener('click', (event) => {
        document.getElementById('word-example-text').style.display = 'inline-block'
    })

    showReadingButton.addEventListener('click', (event) => {
        document.getElementById('word-reading-text').style.display = 'inline-block'
    })

    showMeaningButton.addEventListener('click', (event) => {
        document.getElementById('word-meaning-text').style.display = 'inline-block'
    })
    knowledgeLevelRate.addEventListener('change', async (event) => {
        currentWord.knowledgeLevel = event.target.value
        let response = await fetch('/api/words', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(currentWord)
        })
        response = await response.json()
    })
    changePracticeTypeButton.addEventListener('click', (event) => {
        practiceType = practiceType === 'JE' ? 'EJ' : 'JE'
        changePracticeTypeButton.innerHTML = practiceType
        loadWordData()
    })



})();