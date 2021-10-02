const ENV = {
    development: {
        apiURL: 'http://localhost:1337',
    },
    prod: {
        apiURL: 'http://localhost:1337',
    },
};

const getEnvironmentVariables = () => {
    if (process.env.NODE_ENV === 'development') {
        return ENV.development;
    }

    return ENV.production;
};

export default getEnvironmentVariables();
