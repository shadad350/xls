const numeros = [1, 2, 3, 4, 5, 10, 15];

const letras = ["a", "b", "c", "a", "b", "c", "a", "c", "a", "d"];

let suma = 0;
let contado = {};

numeros.forEach((item) => {
  suma += item;
});

letras.forEach(item => {
  if (contado[item]) {
    contado[item]++;
  } else {
    contado[item] = 1;
  }
});


console.log(suma);
console.log(contado);