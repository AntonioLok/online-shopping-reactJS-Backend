const { NODE_ENV } = process.env;

const development = {
  WEB_APP_BASE_URL: 'http://localhost:8080',
};

const production = {
  WEB_APP_BASE_URL: 'https://shopping-site.antoniolok.com',
};

module.exports = NODE_ENV === 'production' ? production : development;
