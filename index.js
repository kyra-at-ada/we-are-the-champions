import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: DATABASE_URL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const endorsementsEl = document.getElementById("endorsements")
const publishBtnEl = document.getElementById("publish-btn")
const endorsementInputEl = document.getElementById("endorsements-input")

publishBtnEl.addEventListener("click", function() {
    let inputValue = endorsementInputEl.value
    
    push(endorsementsInDB, inputValue)

    clearEndorsementInputEl()
})


onValue(endorsementsInDB, function(snapshot) {

    let endorsementsArray = Object.values(snapshot.val())

    clearEndorsementsListEl()

    for (let i = 0; i < endorsementsArray.length; i++) {
        let currentEndorsement = endorsementsArray[i]
        appendEndorsementToEndorsementsListEl(currentEndorsement)
    }


})

const clearEndorsementInputEl = () => {
    endorsementInputEl.value = ""
}

const clearEndorsementsListEl = () => {
    endorsementsEl.innerHTML = ""
}

const appendEndorsementToEndorsementsListEl = (endorsementValue) => {
    let newEl = document.createElement("li")
    newEl.textContent = endorsementValue
    endorsementsEl.append(newEl)
}