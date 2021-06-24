document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs'
    const table = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')

    let tableDogName, tableDogBreed, tableDogSex, editButton, tableDog

    loadRegisteredDogs()


    function loadRegisteredDogs(){
        fetch(URL)
        .then(resp=>resp.json())
        .then(data=>displayDogs(data))
    }

    function displayDogs(array){
        for(i=0; i<array.length; i++){
            let tableDog = array[i]
            tableDogName = tableDog.name
            tableDogBreed = tableDog.breed
            tableDogSex = tableDog.sex
            tableDogID = tableDog.id
            newRow = table.appendChild(document.createElement('tr'))
            newRow.setAttribute('class', 'padding center')
            newRow.innerHTML = `<td>${tableDogName}</td><td>${tableDogBreed}</td><td>${tableDogSex}</td><td><button class="editButton" id='${tableDogID}'>Edit</button></td>`
            editDogButton = document.getElementById(`${tableDogID}`)
            editDogButton.addEventListener('click', function(){editDog(tableDog)})
        }
    }

    function editDog(arg){
        console.log(arg.id)
    }
})