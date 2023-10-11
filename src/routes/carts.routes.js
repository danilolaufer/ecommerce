describe('Testing del Router de Carts', () => {
    // producto cart
    it('Debería agregar un producto al carrito', async () => {
      const cartId = 1; // Reemplaza con un ID de carrito existente
        const productToAdd = { productId: 1, quantity: 2 };
        const response = await request.post(`/api/carts/${cartId}/add`).send(productToAdd);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
      //si se haya agregado correctamente
    const addedProduct = response.body.find((item) => item.productId === productToAdd.productId);
    expect(addedProduct).to.exist;
    expect(addedProduct.quantity).to.equal(productToAdd.quantity);
    });

    // delete un producto del carrito
    it('Debería eliminar un producto del carrito', async () => {
      const cartId = 1; // Reemplaza con un ID de carrito existente
    const productToRemove = { productId: 1, quantity: 1 };
    const response = await request.post(`/api/carts/${cartId}/remove`).send(productToRemove);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
      // el producto se haya eliminado correctamente
    const removedProduct = response.body.find((item) => item.productId === productToRemove.productId);
    expect(removedProduct).to.not.exist;
    });
});
