(function (){
    var wordForm = document.getElementById('addWordForm')
    wordForm.onsubmit = function(e){
        e.preventDefault()
        console.log(e.target)
    }

    var submitButton = document.getElementById('submitWord')
    submitButton.onclick = function(e){
        // collect data
        // make request
        //gestion the response
    }
})()