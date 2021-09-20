let pokemonList=[
{name: 'Bulbasaur', type:['grass','poison'], height:'2.04', weight:'15.2 Ibs', abilities:'overgrow',category:'seed'},
{name: 'Charmender', type:'fire', height:'2.00', weight:'18.7 Ibs', abilities:'blaze', category:'lizard'},
{name: 'Pikachu', type:'electric', height:'1.04', weight:'13.2 Ibs', abilities:'static', category:'mouse'},
{name: 'Squirtle', type:'water', height:'1.08', weight:'19.8 Ibs', abilities:'torrent', category:'tiny turtle'},
{name: 'Butterfree', type:['bug','flying'], height:'3.07', weight:'70.5 Ibs', abilities:'compound eyes', category:'butterfly'},
{name: 'Pidgeotto', type:["normal","flying"], height: '3.07', weight:"66.1 Ibs", abilities:["keen eye","tangled feet"], category:"bird"},
{name: "Primeape", type:"fighting", height:'3.03', weight:"70.5 Ibs", abilities:["vital spirit","anger point"], category:"pig monkey"},
{name: "Snorlax", type:"normal", height:'6.11', weight:"1014.1 Ibs", abilities:["thick fat","immunity"],category:"sleeping"}
];


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
