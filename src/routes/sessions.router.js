describe('Testing del Router de Sessions', () => {
    it('Debería autenticar a un usuario válido', async () => {
        const userCredentials = { username: 'nombredeusuario', password: 'contraseña' };
        const response = await request.post('/api/sessions').send(userCredentials);
    
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    });

    it('Debería cerrar la sesión de un usuario', async () => {
        const response = await request.delete('/api/sessions');

    expect(response.status).to.equal(204);
    });
});
