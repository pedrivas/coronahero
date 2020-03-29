const connection = require('../database/connections');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const victim = await connection('victims').where('id', id).select('name').first();
        if (!victim) {
            return response.status(400).json({ error: "No Victim found with this ID" });
        }
        return response.json(victim);

    }
}