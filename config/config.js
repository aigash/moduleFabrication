const config = {
    development: {
        siteUrl: "http://192.9.100.92:8084/LommeWeb/rest/LommeWebService",
    },
    production: {
        siteUrl: "http://192.168.1.117:8128/AzWeb/rest/AzWebService",
    },
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
