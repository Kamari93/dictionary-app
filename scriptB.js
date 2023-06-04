const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const similar = document.getElementById("similar");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    // console.log(inpWord);
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // let synonym = data[0].meanings[0].synonyms.length;
            // if (synonym > 0) { document.getElementById("similar").style.color = "red" }
            if (data[0].meanings[0].synonyms.length === 0) {
                result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || "No example given"}
                </p>`;
            } else {
                result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-synonym">
                <span id="similar">Similar:</span> ${data[0].meanings[0].synonyms.slice(0, 2)}  
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No example given"}
            </p>`;
            }
            sound.setAttribute("src", data[0].phonetics[0].audio);
            // console.log(sound.getAttribute("src"))
            // console.log('')
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Sorry, Word Could Not Found</h3>`;
        });
});

function playSound() {
    // The DOM play() method starts playing the current audio
    if (sound.getAttribute("src") === '') {
        alert("There is no audio for this word")
    } else {
        sound.play();
    }
}