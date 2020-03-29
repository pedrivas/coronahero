const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connections');

module.exports = {

    async index (request, response)  {
    const victims = await connection('victims').select('*');

    return response.json(victims);
    }, 

    async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('victims').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({ id });
    }
}