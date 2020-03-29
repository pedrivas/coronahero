const connection = require('../database/connections')

module.exports = {

    async index(request, response) {
        const { page = 1} = request.query; // se não existir nos query param considera 1

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
                                .join('victims', 'victims.id', '=', 'incidents.victim_id')
                                .limit(5)
                                .offset((page-1)*5)
                                .select([
                                    'incidents.*',
                                    'victims.name', 
                                    'victims.email', 
                                    'victims.whatsapp', 
                                    'victims.city', 
                                    'victims.uf']);

        response.header('X-Total-Count', count['count(*)']); //'count(*)' é a propriedade de [count]

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const victim_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description, 
            value,
            victim_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const victim_id = request.headers.authorization;
        
        const incident = await connection('incidents')
                                .where('id', id)
                                .select('victim_id')
                                .first();
        if (incident.victim_id != victim_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }       
        
        await connection('incidents')
                .where('id', id)
                .delete();

        return response.status(204).send();
    }
};