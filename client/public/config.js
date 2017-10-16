/*global System */
'use strict';

System.config({
    transpiler: "babel",
    packages: {
        './': { defaultExtension: false },
        './actions': { main: 'index.js' },
        './components': { main: 'index.js', defaultExtension: false },
        './constants': { main: 'index.js' },
        './helpers': { main: 'index.js' },
        './reducers': { main: 'index.js' },
        './services': { main: 'index.js' },
        './App': { main: 'index.js', defaultExtension: false },
        './HomePage': { main: 'index.js', defaultExtension: false },
        './LoginPage': { main: 'index.js', defaultExtension: false },
        './RegisterPage': { main: 'index.js', defaultExtension: false }
    },
    map: {
        'npm:react@16.0eta.5': 'npm:react@16.0.0',
        'react-redux': 'npm:react-redux@5.0.2'
    },


    paths: {
        "*": "https://npm.jspm.io/*.js"
    }
});
