const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connections')

describe('Victim', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a nem victim', async () => {
        const response = await request(app)
            .post('/victims')
            .send({
                name: "Dona Nilda",
                email: "nilda@gmail.com",
                whatsapp: "5511944723018",
                city: "São Paulo",
                uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});