//wrapping pokemonList inside pokemonRepository to avoid global state (IIFE)
const pokemonRepository = (function() {
    //The Pokemon collection
    const pokemonList = [];
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=300";
    const searchBar = document.getElementById("searchbar");
    searchBar.addEventListener("input", function() {
        // select all buttons
        let searchPokemon = document.querySelectorAll(".group-list-item");
        let value = searchBar.value.toUpperCase();
        searchPokemon.forEach(function(pokemon) {
            if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
                pokemon.style.display = "";
            } else {
                pokemon.style.display = "none";
            }
        });
    });

    //add a single pokemon to the pokemonList
    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        }
    }
    //return all pokemon from pokemonList
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        //selecting the unordered list
        let myList = document.querySelector(".pokemon-list");

        //creating bullet list
        let listItem = document.createElement("li");
        listItem.classList.add(
            "group-list-item",
            "col-xl-2",
            "col-lg-4",
            "col-md-6"
        );

        //creating a button
        let button = document.createElement("button");

        //write the pokemon's name on the button
        button.innerText = pokemon.name;

        //creating class for the list as 'button-class'
        button.classList.add("button-class", "btn", "btn-warning", "btn-block"); //creating attributes for button
        //creating attributes for button
        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-toggle", "modal");

        button.addEventListener("click", function() {
            //add event to button
            showDetails(pokemon);
        });

        //append the button on the bullet list
        listItem.appendChild(button);

        //append the bullet list to unordered list
        myList.appendChild(listItem);
    }

    //load the list of Pokémon
    function loadList() {
        return fetch(apiUrl)
            .then(function(response) {
                return response.json(); //this returns promise
            })
            .then(function(json) {
                json.results.forEach(function(item) {
                    //get pokemon's name and details url when resolved
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    //load details for each pokemon
    function loadDetails(item) {
        const url = item.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                //adding details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;
                item.type = details.types;
                item.ability = details.abilities;
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    //showing the information of the selected pokemon on console log
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    //showing modal
    let modalContainer = document.querySelector("#exampleModal");

    function showModal(pokemon) {
        let modalTitle = $(".modal-title");
        let modalBody = $(".modal-body");
        let modalHeader = $(".modal-header");

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h1>" + pokemon.name + "</h1>");

        let imageElement = document.createElement("img");
        imageElement.classList.add("pokeImage");
        imageElement.src = pokemon.imageUrl;

        let contentElement = document.createElement("p");
        let pokeHeight = pokemon.height / 10; //meters
        let pokeWeight = pokemon.weight / 10; //kg
        let pokeTypes = [];
        let pokeAbilities = [];

        Object.keys(pokemon.type).forEach((key) => {
            //add pokemon type to pokeTypes
            pokeTypes.push(pokemon.type[key].type.name);
        });

        Object.keys(pokemon.ability).forEach((key) => {
            //add pokemon ability to pokeAbilities
            pokeAbilities.push(pokemon.ability[key].ability.name);
        });

        //write the details of selected pokemon onto the modal
        contentElement.innerText =
            "Height: " +
            pokeHeight +
            " m " +
            "\r\n" +
            "Weight: " +
            pokeWeight +
            " kg " +
            "\r\n" +
            "Types: " +
            pokeTypes +
            "\r\n" +
            "Abilities: " +
            pokeAbilities;

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(contentElement);

        modalContainer.classList.add("is-visible");
    }

    //function for hiding the madal
    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    //hide the modal when press Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });

    //hide the modal when click outside the modal container
    modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // function fetchPokemon() {
    // fetch('https://pokeapi.co/api/v2/pokemon/?limit=151)
    // .then(response =>.json())
    // .then(allpokemon =>console.log(allpokemon))
    // }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
    };
})();

//writing the content from pokemonRepository using forEach() function
pokemonRepository.loadList().then(function() {
    //now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});