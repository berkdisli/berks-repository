//wrapping pokemonList inside pokemonRepository to avoid global state (IIFE)
let pokemonRepository = (function(){
    //The Pokemon collection
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    let searchBar = document.getElementById('searchbar');

    searchBar.addEventListener('input', function () {
      // select all buttons
        let searchPokemon = document.querySelectorAll('.group-list-item');
        let value = searchBar.value.toUpperCase();

        searchPokemon.forEach(function (pokemon) {
            if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
                pokemon.style.display = '';
            } else {
                pokemon.style.display = 'none';
            }
        });

    });

    //add a single pokemon to the pokemonList
    function add(pokemon){
        //make sure the new pokemon has these properties
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    //return all pokemon from pokemonList
    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        //selecting the unordered list
        let myList = document.querySelector('.pokemon-list');

        //creating bullet list
        let listItem = document.createElement('li');
        listItem.classList.add("group-list-item")

        //creating a button
        let button = document.createElement('button');

        //write the pokemon's name on the button
        button.innerText = pokemon.name;

        //creating class for the list as 'button-class'
        button.classList.add( 'btn', 'button-primary');
        //creating attributes for button
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');

        button.addEventListener('click', function(){ //add event to button
              showDetails(pokemon);
            });

        //append the button on the bullet list
        listItem.appendChild(button);

        //append the bullet list to unordered list
        myList.appendChild(listItem);


    //activating the loading image
    // function showLoadingImage() {
    //     let loadImg = document.querySelector('#loading-img');
    //     window.addEventListener('load',function(){
    //         loadImg.style.visibility = 'visible';
    //     });
    // }

    //turn the vibility of loading image back to hidden, add 0.5s before hidden
    // function hideLoadingImage() {
    //     let loadImg = document.querySelector('#loading-img');
    //     setTimeout(function(){
    //         loadImg.style.visibility = 'hidden';
    //     }, 100);
    //
    // }

    //load the list of Pokémon
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json(); //this returns promise
        }).then(function(json) {
            json.results.forEach(function(item){
                //get pokemon's name and details url when resolved
                let pokemon = {
                    name : item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    //load details for each pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {

            //adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.type = details.types;
            item.ability = details.abilities;
        }).catch(function(e) {
            console.error(e);
        });
    }

    //showing the information of the selected pokemon on console log
    function showDetails(pokemon){
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    //showing modal
    let modalContainer = document.querySelector('#exampleModal');

    function showModal(pokemon) {

    let modalBody = document.querySelector('.modal-body');

    //clear all existing modal content
    modalBody.innerHTML = '';

    let titleElement = document.querySelector('.modal-title');
    titleElement.innerText = pokemon.name;

    // created an array to store the type objects.
    let pokemonTypes = [];
    //created an array to store abilities.
    let pokemonAbilities = [];

    //Looped through the type array using for each.
    Object.keys(pokemon.type).forEach(key => {
      pokemonTypes.push(pokemon.type[key].type.name);
    });

    Object.keys(pokemon.abilities).forEach(key => {
      pokemonAbilities.push(pokemon.abilities[key].ability.name);
    });

    let pokemonType = document.createElement('p');
    pokemonType.classList.add('pokemon-type');
    pokemonType.innerText = 'Type: ' + pokemonTypes;

    let pokemonAbility = document.createElement('p');
    pokemonAbility.classList.add('pokemon-ability');
    pokemonAbility.innerText = 'Abilities: ' + pokemonAbilities;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('pokemon-height');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('pokemon-weight');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('img-fluid');
    pokemonImage.src = pokemon.imageUrl;

    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonAbility);
  }

  //function for hiding the madal
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //hide the modal when press Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    //hide the modal when click outside the modal container
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        // showLoadingImage: showLoadingImage,
        // hideLoadingImage: hideLoadingImage,
        showModal: showModal,
        // hideModal:hideModal
    };

})();



//writing the content from pokemonRepository using forEach() function
pokemonRepository.loadList().then(function(){
    //now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
