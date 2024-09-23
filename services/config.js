const config = {
    apiHost: process.env.NODE_ENV === 'production' ? 'https://prod-api.example.com' : 'http://localhost:8080'
  };
  
  export default config;