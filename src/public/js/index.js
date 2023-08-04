const socket = io();
const formProduct = document.getElementById('formProducts')
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');
const tableProducts = document.getElementById('listaProd')


socket.on('allProducts', async (data) => {

 const html=  await data?.map( ( prod )=> {
        return (
            ` <tr>

                <td>${prod.title}</td>
                <td>${prod.description}</td>
                <td>$ ${prod.price}</td>
                <td>${prod.stock}</td>
                <td>${prod.category}</td>
                <td>${prod.code}</td>
                <td><img src=${prod.thumbnails} alt="" width="50%" /> </td>
            </tr>
            `
           
        )
       
    
});

  tableProducts.innerHTML= html

})




formProduct.addEventListener('submit', e => {
    e.preventDefault();

    socket.emit('addProduct', {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value
    })
    formProduct.reset();
    alert('El producto ha sido agregado correctamente');

})