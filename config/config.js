const config = {
    development: {
        siteUrl: "http://192.9.100.92:8084/LommeWeb/rest/LommeWebService",
    },
    production: {
        siteUrl: "http://192.168.1.117:8128/AzWeb/rest/AzWebService",
    },
};

// Détermine l'environnement
const getEnv = () => {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
        return process.env.NODE_ENV;
    }
    return 'development';
};

const env = getEnv();

// Exporte la configuration
const currentConfig = config[env];

// Vérifie si nous sommes dans un environnement qui supporte module.exports (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = currentConfig;
} else {
    // Si nous sommes dans un navigateur, on définit une variable globale
    window.appConfig = currentConfig;
}
