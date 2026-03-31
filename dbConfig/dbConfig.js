const config = {
    user: 'COO_UserApp',
    password: 'iL11n0X3mLwq',
    server: '172.25.74.12', // Example: 'localhost', '192.168.1.1'
    database: 'GlobalCOO_idp_test',
    options: {
        encrypt: false, // Use 'true' if connecting to Azure
        trustServerCertificate: true // Needed if using a self-signed certificate
    }
};

export default config;
