let previous = null
let next = null
let currentWord = null

async function getWord(index = null) {
    let searchQuery
    let fetchUrl
    index ? searchQuery = new URLSearchParams({ page: index }) : searchQuery = null
    searchQuery ? fetchUrl = '/practice/words?' + searchQuery.toString() : fetchUrl = '/practice/words'
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

function loadWordData(){
    const wordContent = document.getElementById('word-content-text')
    const wordExample = document.getElementById('word-example-text')
    const wordReading = document.getElementById('word-reading-text')
    const wordMeaning = document.getElementById('word-meaning-text')

    console.log(next, previous)
    wordContent.innerText = currentWord.content
    wordExample.innerText = currentWord.meanings[0].example
    wordMeaning.innerText = currentWord.meanings[0].meaning
    wordReading.innerText = currentWord.phoneticReading
    const nextButton = document.getElementById('next')
    const previousButton = document.getElementById('previous')

    !next ? nextButton.classList.add('hidden') : nextButton.classList.remove('hidden')
    !previous ? previousButton.classList.add('hidden') : previousButton.classList.remove('hidden')

}

(function initializeWord() {

    window.addEventListener('load', async (event) => {
        response = await getWord()
        currentWord = response.content.results[0]
        next = response.content.next
        previous = response.content.previous
        loadWordData()
    })

})();


(function initEvents() {
    const nextButton = document.getElementById('next')
    const previousButton = document.getElementById('previous')
    const closeSession = document.getElementById('close-session')

    nextButton.addEventListener('click', async (event) => {
        let response = await getWord(next.page)
        console.log(response)
        currentWord = response.content.results[0]
        next = response.content.next
        previous = response.content.previous
        loadWordData()
    })

    previousButton.addEventListener('click', async (event) => {
        let response = await getWord(previous.page)
        currentWord = response.content.results[0]
        next = response.content.next
        previous = response.content.previous
        loadWordData()
    })

    closeSession.addEventListener('click', async (event)=>{
        let response = await fetch('/practice',{
        method: 'delete',
        credentials: 'include'
        })
        console.log(response)
        if(response.redirected){
            window.location.href = response.url
        }
    })


})();