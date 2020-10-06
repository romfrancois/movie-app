const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { query } = JSON.parse(event.body);

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.THEMOVIEDB_API_KEY}&query=${query}`
    )
    .then((response) => response.json())
    .catch((error) => console.error(error));

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response)
    }
};
