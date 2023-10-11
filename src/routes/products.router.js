const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const { expect } = require('chai');

describe('testing del Router de Products', () => {
  //creando 
    it('Debería crear un nuevo producto', async () => {
        const newProduct = { name: 'Producto de Prueba', price: 9.99 };
        const response = await request.post('/api/products').send(newProduct);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    expect(response.body.name).to.equal(newProduct.name);
    expect(response.body.price).to.equal(newProduct.price);
    });

  //producto por ID
    it('Debería obtener un producto por ID', async () => {
    const productId = 1; // Reemplaza con un ID existente
    const response = await request.get(`/api/products/${productId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body.id).to.equal(productId);
    });

  // update
    it('Debería actualizar un producto existente', async () => {
    const productId = 1; // Reemplaza con un ID existente
    const updatedProduct = { name: 'Producto Actualizado', price: 12.99 };
    const response = await request.put(`/api/products/${productId}`).send(updatedProduct);

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(updatedProduct.name);
    expect(response.body.price).to.equal(updatedProduct.price);
    });
});

