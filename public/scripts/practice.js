let currentWord = null
let currentWordIndex = null
let allWords = null
async function getWords(index = null) {

    //get all practice words
    const fetchUrl = '/practice/words'
    console.log(fetchUrl)
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

    wordContent.innerText = currentWord.content
    wordExample.innerText = currentWord.meanings[0].example
    wordMeaning.innerText = currentWord.meanings[0].meaning
    wordReading.innerText = currentWord.phoneticReading
    if (true) {
        wordExample.style.display = 'none'
        wordMeaning.style.display = 'none'
        wordReading.style.display = 'none'
    }
    const nextButton = document.getElementById('next')
    const previousButton = document.getElementById('previous')
    currentWordIndex == allWords.length - 1 ? nextButton.disabled = true : nextButton.disabled = false
    currentWordIndex == 0 ? previousButton.disabled = true : previousButton.disabled = false

}

(function initializeWord() {

    window.addEventListener('load', async (event) => {
        response = await getWords()
        console.log(response)
        allWords = shuffle(response.content.results)
        console.log(allWords)
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
        console.log(response)
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



})();