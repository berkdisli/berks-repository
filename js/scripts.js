let pokemonRepository = (function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

//get element by ID
    let searchBar = document.getElementById('searchbar');

    searchBar.addEventListener('input', function () {
      // select all buttons
        let searchPokemon = document.querySelectorAll('.button-class');
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
        // new pokemon has these properties
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
        //selecting the list
        let myList = document.querySelector('.pokemon-list');
        //creating list
        let listItem = document.createElement('li');
        //creating a button
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        //creating class for the button
        button.classList.add('button-class');
        listItem.appendChild(button);
        myList.appendChild(listItem);
        //add click event to button to display pokemon details on console
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

    //activating the loading image
    function showLoadingImage() {
        let loadImg = document.querySelector('#loading-img');
        window.addEventListener('load',function(){
            loadImg.style.visibility = 'visible';
        });
    }

    //0.75 before hidden
    function hideLoadingImage() {
        let loadImg = document.querySelector('#loading-img');
        setTimeout(function(){
            loadImg.style.visibility = 'hidden';
        }, 150);

    }

    //load the list of Pokémon
    function loadList() {
        showLoadingImage();
        return fetch(apiUrl).then(function(response) {
            return response.json(); //this returns promise
        }).then(function(json) {
            hideLoadingImage();
            json.results.forEach(function(item){
                //get pokemon's name and details url when resolved
                let pokemon = {
                    name : item.name,
                    detailsUrl : item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            hideLoadingImage();
            console.error(e);
        })
    }

    //load details for each pokemon
    function loadDetails(item) {
        showLoadingImage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            hideLoadingImage();
            return response.json();
        }).then(function(details) {

            //adding details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.type = details.types;
            item.ability = details.abilities;
        }).catch(function(e) {
            hideLoadingImage();
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
    function showModal(pokemon) {


        //creating the modal as div
        let modal = document.createElement('div');
        //add class to div : modal
        modal.classList.add('modal');

        //add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //close modal when 'Close' button is clicked
        closeButtonElement.addEventListener('click', hideModal);

        //assigned for Modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        //assigned for Modal text
        let contentElement = document.createElement('p');
        let pokeHeight = pokemon.height / 10; //meters
        let pokeWeight = pokemon.weight / 10; //kg
        let pokeTypes = [];
        let pokeAbilities = [];

        Object.keys(pokemon.type).forEach(key => {//add pokemon type to pokeTypes
            pokeTypes.push(pokemon.type[key].type.name);
        });

        Object.keys(pokemon.ability).forEach(key => {//add pokemon ability to pokeAbilities
            pokeAbilities.push(pokemon.ability[key].ability.name);
        });

        //write the details of selected pokemon onto the modal
        contentElement.innerText = 'Height: ' + pokeHeight + ' m '+ '\r\n'
                                    + 'Weight: ' + pokeWeight + ' Ibs '+ '\r\n'
                                    + 'Types: ' + pokeTypes + '\r\n'
                                    + 'Abilities: ' + pokeAbilities;

        //adding pokemon front image
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt', pokemon.name);

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalBody.appendChild(modalContainer);


    }

    let dialogPromiseReject;

    //hiding modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }



    //hiding modal when 'Esc' button is pressed down
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList. contains('is-visible')) {
            hideModal();
        }
    });

    //hiding modal when modal container is clicked
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingImage: showLoadingImage,
        hideLoadingImage: hideLoadingImage,
        showModal: showModal,
        hideModal:hideModal
    };

})();



//writing the content from pokemonRepository using forEach() function
pokemonRepository.loadList().then(function(){
    //now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
