document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/dogs/'
    const table = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')

    let tableDogName, tableDogBreed, tableDogSex

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
            newRow.setAttribute('class', 'tableRows')
            newRow.setAttribute('class', 'padding center')
            newRow.innerHTML = `<td>${tableDogName}</td><td>${tableDogBreed}</td><td>${tableDogSex}</td><td><button class="editButton" id='${tableDogID}'>Edit</button></td>`
            editDogButton = document.getElementById(`${tableDogID}`)
            editDogButton.addEventListener('click', function(){editDog(tableDog)})
        }
    }

    function editDog(arg){
        dogForm.name.value = arg.name
        dogForm.breed.value = arg.breed
        dogForm.sex.value = arg.sex
        let dogId = arg.id
        dogForm.addEventListener('submit', function(e){
            e.preventDefault()
            patchDog(dogId)
        })

    }
    function patchDog(id){
        let newName = dogForm.name.value
        let newBreed = dogForm.breed.value
        let newSex = dogForm.sex.value
        let newDog = {
            id: `${id}`,
            name: `${newName}`,
            breed: `${newBreed}`,
            sex: `${newSex}`
        }
        let config = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newDog)
        }
        fetch(URL+id, config)
        .then(resp => resp.json())
        .then(()=>{location.reload()
        })
    }
})