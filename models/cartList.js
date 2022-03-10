// const res = require('express/lib/response');
// const fs = require('fs');
// const moment = require('moment');

// class CartList {
//     constructor(filePath) {
//         this.filePath = filePath;
//     }

//     createCart(obj) {
//         let data = fs.readFileSync(this.filePath, 'utf8')
//         let array = JSON.parse(data);
//         let product = [];
//         obj.title !== undefined ? product.push(obj) : null;
//         let newId = this.newId();
//         let cart = {
//             id: newId,
//             time: moment().format("h:mm:ss"),
//             products: product
//         }
//         array.push(cart);
//         fs.writeFileSync(this.filePath, JSON.stringify(array, null, 2));
//         return cart.id;
//     }

//     getAll(id) {
//         let exist = this.cartExist(id);
//         if (exist) {
//             let data = fs.readFileSync(this.filePath, 'utf8');
//             let newData = JSON.parse(data);
//             let result = newData.filter((item) => item.id == id);
//             let array = result[0].products;
//             return array;
//         }
//         return false;
//     }

//     deleteCart(id) {
//         let data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         let result = newData.filter((item) => item.id != id);
//         fs.writeFileSync(this.filePath, JSON.stringify(result, null, 2))
//     }

//     addProduct(id, product) {
//         let data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         let result = newData.filter((item) => item.id == id);
//         let productId = result[0].products.length + 1;
//         product.id = productId;
//         product.time = moment().format("h:mm:ss");
//         result[0].products.push(product);
//         fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2))
//     }

//     deleteProduct(id, productId) {
//         let data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         let result = newData.filter((item) => item.id == id);
//         result[0].products = result[0].products.filter((item) => item.id != productId);
//         fs.writeFileSync(this.filePath, JSON.stringify(newData, null, 2))
//     }

//     arrayLength() {
//         const data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         let length = newData.length;
//         return length;
//     }

//     newId() {
//         const data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         if (newData.length === 0) {
//             return 1;
//         }
//         let lastObj = newData[newData.length - 1].id
//         let newId = lastObj + 1;
//         return newId;
//     }

//     cartExist(id) {
//         let data = fs.readFileSync(this.filePath, 'utf8')
//         let newData = JSON.parse(data);
//         let result = newData.filter((item) => item.id == id);
//         if (result.length === 0) {
//             return false;
//         }
//         return true;
//     }
// }

// module.exports = CartList;