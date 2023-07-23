
const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputlElement = document.getElementById("quoteInput")

quoteInputlElement.addEventListener("input",() =>{
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayValues = quoteInputlElement.value.split("")
    arrayQuote.forEach((characterSpan, index) =>{
        const character = arrayValues[index]
        if (character == null){
            //Si no escribimos ningun caracter eliminales las 2 clases
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("incorrect")
        }
        else if (character === characterSpan.innerText){
            //Si escribimos el caracter y coincide con el de la Quote asignale la clase correct
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        }
        else{
            //Si no coincide asignale la clase incorrect
            characterSpan.classList.add("incorrect")
            characterSpan.classList.remove("correct")
        }
    })

    if (arrayQuote.length == arrayValues.length){
        // Si coinciden los largos se renderea otra quote
        renderNewQuote();
    }
    
})

function getRandomquote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(Response => Response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomquote()
    quoteDisplayElement.innerText = "";
    quoteInputlElement.value = null;
    quote.split("").forEach(character => { // Iteramos por toda la quote y por cada una de las letras creamos un span en el DOM
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
}


renderNewQuote()

// Tengo que hacer un contador de 3 quotes que agregue en alguna parte de la ui un promedio de wpm y un contador de errores cada vez que a una letra se le pone la clase incorrect
// - Tambien falta el cronometro ver si queda fachero o no 