let pokemonRepository = (function  () {

let pokemonList=[
{name: 'Bulbasaur', type:['grass','poison'], height:'2.04', weight:'15.2 Ibs', abilities:'overgrow',category:'seed'},
{name: 'Charmender', type:'fire', height:'2.00', weight:'18.7 Ibs', abilities:'blaze', category:'lizard'},
{name: 'Pikachu', type:'electric', height:'1.04', weight:'13.2 Ibs', abilities:'static', category:'mouse'},
{name: 'Squirtle', type:'water', height:'1.08', weight:'19.8 Ibs', abilities:'torrent', category:'tiny turtle'},
{name: "Primeape", type:"fighting", height:'3.03', weight:"70.5 ", abilities:["vital spirit","anger point"], category:"pig monkey"},
{name: "Snorlax", type:"normal", height:'6.11', weight:"1014.1 ", abilities:["thick fat","immunity"],category:"sleeping"}
];

 // getting all pokemon objects from pokemonList
function getAll() {
  return pokemonList;
}

function add(pokemon) {
          if (
            typeof pokemon === 'object' && 'name' && 'type' in pokemon
        ) {
            pokemonList.push(pokemon)
          }
          else {
            document.write('Pokemon is wrong')
        }


    /*  let pokemonType = [];
      Object.keys(pokemon.type).forEach(key => {
      pokemonType.push(pokemon.type[key].type.name); });*/
      }
function addListItem(pokemon) {
  let listPokemon = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listItem.appendChild(button);
  listPokemon.appendChild(listItem);

  //click on pokemon button for details in the console
  button.addEventListener('click', function (event) {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
console.log(pokemon);

}



return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  showDetails: showDetails
};

})();



pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon) ;

  });






/*let pokemonList2=[
{name: 'Butterfree', type:['bug','flying'], height:'3.07', weight:'70.5 ', abilities:'compound eyes', category:'butterfly'},
{name: 'Pidgeotto', type:["normal","flying"], height: '3.07', weight:"66.1 ", abilities:["keen eye","tangled feet"], category:"bird"},
{name: "Primeape", type:"fighting", height:'3.03', weight:"70.5 ", abilities:["vital spirit","anger point"], category:"pig monkey"},
{name: "Snorlax", type:"normal", height:'6.11', weight:"1014.1 ", abilities:["thick fat","immunity"],category:"sleeping"}
];*/

//printArrayExample(pokemonList);
//printArrayExample(pokemonList2);







/*let name = prompt('Please enter your name!');
document.write(name);

let isAccepted = confirm('Do you accept?');
document.write(isAccepted);


let array = [1,2,3,4];

array.forEach(function(item,index,array) {
document.write("item: " + item + " at index: " + index + " in the array: " + array);
})*/
/*function printArrayDetails(pokemonList){
for (let i = 0; i < pokemonList.length; i++) {

  let pName = pokemonList[i].name;
  let pHeight = pokemonList[i].height;

      if (pHeight >= 4) {
      document.write('<p>' + pName + ' ' + '(Height: ' + pHeight + ')' +' ' + "- Wow, that's really big!" + '</p>');
 }

      else if (pHeight >=2.5 && pHeight<4 ){
      document.write('<p>' + pName + ' ' + '(Height: ' + pHeight + ')' +' ' + "- Average sized Pokemon." + '</p>');
 }

      else {
      document.write('<p>' + pName + ' ' + '(Height: ' + pHeight + ')' +' ' + "- It is a small Pokemon." + '</p>');
  }
 }
}

function printArray(pokemonList2){
for (let i = 0; i < pokemonList2.length; i++) {

  let pName = pokemonList2[i].name;
  let pWeight = pokemonList2[i].weight;

      if (pWeight >= 300 ) {
      document.write('<p>' + pName + ' ' + '(Weight: ' + pWeight + ')' +' ' + "- Wow, that's really heavy!" + '</p>');
 }

      else if (pWeight >=70  && pWeight<300 ){
      document.write('<p>' + pName + ' ' + '(Weight: ' + pWeight + ')' +' ' + "- Average weight Pokemon." + '</p>');
 }

      else {
      document.write('<p>' + pName + ' ' + '(Weight: ' + pWeight + ')' +' ' + "- It is light." + '</p>');
  }
 }
}*/
//printArrayDetails(pokemonList);
//printArray(pokemonList2);


 // executes the function using ‘pokemonList2‘ as its input

/*function agag(firstName,lastName){
  document.write("Hello , My name is  " + firstName + " " + lastName);
}

agag("Brad", "Pitt");

function ShowMessage() {
   console.log("Hello Ron!");
   document.write("<br>Hello Ron!");
}

ShowMessage();*/



// print();
// print();
// print();

/*let text1 = "";
let i = 0;

do {
  text1 = text1 + " "+ i;
  i++;
}
while (i < 10);
console.log(text1);

let fruits = ["apple", "banana", "orange", "grape"]
let text2 = "";
let item = 0;

while (fruits[item]){
  text2 = text2 + " " + fruits[item];
  item++;
}

console.log(text2);


let veggies = ["tomato", "cucumber", "potato"];
let text3 = "";
let a = 0;
for (;veggies[a];){
  text3 = text3 + " " + veggies[a];
  a++;
}
console.log(text3);*/
