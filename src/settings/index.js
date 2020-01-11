const { NODE_ENV, NODEMAILER_TRANSPORTER_USERNAME, NODEMAILER_TRANSPORTER_PASSWORD } = process.env;

const commonSettings = {
  NODEMAILER_TRANSPORTER_USERNAME, NODEMAILER_TRANSPORTER_PASSWORD,
};

const development = {
  WEB_APP_BASE_URL: 'http://localhost:8080',
  ...commonSettings,
};

const production = {
  WEB_APP_BASE_URL: 'https://shopping-site.antoniolok.com',
  ...commonSettings,
};

module.exports = NODE_ENV === 'production' ? production : development;
