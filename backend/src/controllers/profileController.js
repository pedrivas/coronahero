const connection = require('../database/connections');

module.exports = {
    async index(request, response) {
        const victim_id = request.headers.authorization;

        const incidents = await connection('incidents')
                                .where('victim_id', victim_id)
                                .select('*');

        return response.json(incidents);
    }
}