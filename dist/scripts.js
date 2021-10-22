const pokemonRepository = function() { const e = [],
        t = "https://pokeapi.co/api/v2/pokemon/?limit=300",
        n = document.getElementById("searchbar");

    function o(t) { "object" == typeof t && e.push(t) }

    function i(e) { const t = e.detailsUrl; return fetch(t).then(function(e) { return e.json() }).then(function(t) { e.imageUrl = t.sprites.front_default, e.height = t.height, e.weight = t.weight, e.type = t.types, e.ability = t.abilities }).catch(function(e) { console.error(e) }) }

    function a(e) { i(e).then(function() { s(e) }) }
    n.addEventListener("input", function() { let e = document.querySelectorAll(".group-list-item"),
            t = n.value.toUpperCase();
        e.forEach(function(e) { e.innerText.toUpperCase().indexOf(t) > -1 ? e.style.display = "" : e.style.display = "none" }) }); let l = document.querySelector("#pokemonModal");

    function s(e) { let t = $(".modal-title"),
            n = $(".modal-body");
        $(".modal-header");
        t.empty(), n.empty(); let o = $("<h1>" + e.name + "</h1>"),
            i = document.createElement("img");
        i.classList.add("pokeImage"), i.src = e.imageUrl; let a = document.createElement("p"),
            s = e.height / 10,
            c = e.weight / 10,
            r = [],
            d = [];
        Object.keys(e.type).forEach(t => { r.push(e.type[t].type.name) }), Object.keys(e.ability).forEach(t => { d.push(e.ability[t].ability.name) }), a.innerText = "Height: " + s + " m \r\nWeight: " + c + " kg \r\nTypes: " + r + "\r\nAbilities: " + d, t.append(o), n.append(i), n.append(a), l.classList.add("is-visible") }

    function c() { l.classList.remove("is-visible") } return window.addEventListener("keydown", e => { "Escape" === e.key && l.classList.contains("is-visible") && c() }), l.addEventListener("click", e => { e.target === l && c() }), { getAll: function() { return e }, add: o, addListItem: function(e) { let t = document.querySelector(".pokemon-list"),
                n = document.createElement("li");
            n.classList.add("group-list-item", "col-xl-2", "col-lg-4", "col-md-6"); let o = document.createElement("button");
            o.innerText = e.name, o.classList.add("button-class", "btn", "btn-warning", "btn-block"), o.setAttribute("data-target", "#pokemonModal"), o.setAttribute("data-toggle", "modal"), o.addEventListener("click", function() { a(e) }), n.appendChild(o), t.appendChild(n) }, loadList: function() { return fetch(t).then(function(e) { return e.json() }).then(function(e) { e.results.forEach(function(e) { o({ name: e.name, detailsUrl: e.url }) }) }).catch(function(e) { console.error(e) }) }, loadDetails: i, showDetails: a, showModal: s, hideModal: c } }();
pokemonRepository.loadList().then(function() { pokemonRepository.getAll().forEach(function(e) { pokemonRepository.addListItem(e) }) });