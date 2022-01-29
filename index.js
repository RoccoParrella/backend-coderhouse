const Contenedor = require('./clase');

const newProduct = new Contenedor ('./productos.txt');

// Primero muestro que el metodo save funciona para guardar objetos en el archivo y devuelvo un console log por cada objeto especificando su id!

newProduct.save({ title: 'Pizza', price: '$600', thumbnail: `wwww.google.com/images/pizza`});
newProduct.save({ title: 'Empanda', price: '$120', thumbnail: `wwww.google.com/images/empanada`});
newProduct.save({ title: 'Faina', price: '$50', thumbnail: `wwww.google.com/images/faina`});
newProduct.save({ title: 'Cocacola', price: '$200', thumbnail: `wwww.google.com/images/cocacola`});

console.log(' ')
console.log("Ahora muestro el metodo getAll, el cual muestra por consola un array con todos los objetos")
console.log(' ')

newProduct.getAll();

console.log(' ')
console.log("Ahora llamo al metodo getById y le paso como parametro un numero el cual me sirve para traer un solo objeto, en este caso el id que coincida");
console.log(' ')

newProduct.getById(3);

// Ahora con el metodo deleteById le paso nuevamente un parametro para que borrer el objeto que coincida con su numero de id

newProduct.deleteById(1);

console.log(' ')
console.log("Llamo nuevamente a getAll para verificar que se elimino un objeto luego de utilizar el metodo anterior ");
console.log(' ')

newProduct.getAll();

console.log(' ')
console.log("Ahora llamo al metodo deleteAll para eliminar todos los objetos del array");
console.log(' ')

newProduct.deleteAll();

console.log(' ')
console.log("Vuelvo a llamar a getAll para mostrar que se elimino todo correctamente");
console.log(' ')

newProduct.getAll();
console.log(' ')