let currentPage = 1
let currentQuery = {}

function getSearchParameters() {

    searchLabelsInputs = document.querySelectorAll('#tag-list .tag-element-text')
    const searchLabels = Array.from(searchLabelsInputs).map(labelSpan => { return labelSpan.getAttribute('data-value') })

    const searchKnowledgeInputs = document.querySelectorAll('#search-criteria-knowledge-level input')
    const searchKnowledge = Array.from(searchKnowledgeInputs).map(checkbox => { return checkbox.checked ? checkbox.value : 0 }).filter(e => e != 0)

    const wordLimit = document.getElementById('word-limit').value

    let query = {}
    if (searchKnowledge.length !== 0) {
        query.knowledgeLevel = searchKnowledge
    }
    if (searchLabels.length !== 0) {
        query.labels = searchLabels
    }
    query.limit = wordLimit

    return query
}

function refreshWordsPool(responseContent) {
    const words = responseContent.results
    const previous = responseContent.previous
    const next = responseContent.next
    let templateListItem = document.createElement('template')
    let templateAllItems = document.createElement('template')
    let wordContent = document.createElement('div')
    let wordMeaning = document.createElement('div')
    templateListItem.innerHTML =
        `<li>
        <button class="edit-button"></button>
        <div class="word-content"></div>
        <div class="word-meaning"></div>
    </li>`

    words.forEach((e, index) => {
        let listItem = templateListItem.cloneNode(true).content
        listItem.querySelector('.word-content').innerHTML = e.content
        listItem.querySelector('.word-meaning').innerHTML = e.meanings[0].meaning
        const editButton = listItem.querySelector('.edit-button')
        editButton.value = index
        editButton.addEventListener('click', (event) => {
            let wordData = words[event.target.value]
            //open a new thing
            //you are able to change everything
            //
        })
        templateAllItems.content.appendChild(listItem)
    })

    document.getElementById('word-list').innerHTML = ""
    document.getElementById('word-list').appendChild(templateAllItems.content)

    const previousButton = document.getElementById('previous-button')
    const nextButton = document.getElementById('next-button')

    previousButton.style.display = previous ? 'block' : 'none';
    nextButton.style.display = next ? 'block' : 'none';
}

async function getWords(query = {}) {
    let searchQuery = new URLSearchParams(query)
    let response = await fetch('/api/words?' + searchQuery.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        credentials: 'include'
    })
    return await response.json()
}

(function addSearchEvent() {
    let button = document.getElementById('word-search-button')

    button.addEventListener('click', async (event) => {
        currentQuery = getSearchParameters()
        currentQuery.page = 1
        currentPage = 1
        let response = await getWords(currentQuery)
        refreshWordsPool(response.content)
    })

})();

(async function initializeWords() {
    currentQuery = { page: 1, limit: 30 }
    let wordList = document.getElementById('word-list')
    let response = await getWords(currentQuery)
    //manage next and previous buttons
    refreshWordsPool(response.content)
})();

(function addPreviousAndNextEvent() {
    let previousButton = document.getElementById('previous-button')
    let nextButton = document.getElementById('next-button')

    previousButton.addEventListener('click', async (event) => {
        currentPage--
        currentQuery.page = currentPage
        let response = await getWords(currentQuery)
        refreshWordsPool(response.content)
    })
    nextButton.addEventListener('click', async (event) => {
        currentPage++
        currentQuery.page = currentPage
        let response = await getWords(currentQuery)
        refreshWordsPool(response.content)
    })
})();