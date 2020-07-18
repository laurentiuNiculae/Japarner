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


(function startPracticeEvent() {
    const practiceButton = document.getElementById('practice-button')

    practiceButton.addEventListener('click', async (event) => {
        let query = getSearchParameters()
        query.limit = 1
        let searchQuery = new URLSearchParams(query)

        let response = await fetch('/practice/choose?' + searchQuery.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            credentials: 'include'
            }
        )
        if (response.redirected) {
            window.location.href = response.url;
        }
        
    })
})()