const fs = require('fs');
const path = require('path');

const votesFilePath = path.resolve(__dirname, 'votes.json');

// Leer votos desde el archivo
function readVotes() {
    if (!fs.existsSync(votesFilePath)) {
        return {
            "Oasis Aurora": 0,
            "Jardín de Alas": 0,
            "Refugio de Colores": 0,
            "Paraíso de Mariposas": 0
        };
    }
    return JSON.parse(fs.readFileSync(votesFilePath, 'utf-8'));
}

// Guardar votos en el archivo
function saveVotes(votes) {
    fs.writeFileSync(votesFilePath, JSON.stringify(votes, null, 2));
}

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { option } = JSON.parse(event.body);
        const votes = readVotes();

        if (votes[option] !== undefined) {
            votes[option]++;
            saveVotes(votes);
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, votes })
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Opción inválida' })
        };
    }

    if (event.httpMethod === 'GET') {
        const votes = readVotes();
        return {
            statusCode: 200,
            body: JSON.stringify(votes)
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Método no permitido' })
    };
};
