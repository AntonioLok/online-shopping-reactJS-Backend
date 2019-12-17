const development = {
  WEB_APP_BASE_URL: 'http://localhost:8080',
};

const production = {
  WEB_APP_BASE_URL: 'https://shopping-site.antoniolok.com',
};

module.exports = process.env.NODE_ENV === 'production' ? production.WEB_APP_BASE_URL : development.WEB_APP_BASE_URL;
