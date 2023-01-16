# online-shopping-reactJS

## System requirements
* Nodejs 10.x
* NPM 6.x

## Project setup
* clone repository: `git clone https://github.com/AntonioLok/online-shopping-reactJS-Backend.git`
* install dependences: `npm i`

#### Environment variables
In development, create a .env file in the root directory to store environment variables for your development and add the following variables:

| Variable                         | Required | Default  | Description                                                           |
|----------------------------------|----------|----------|-----------------------------------------------------------------------|
| JWT_SECRET                       | YES      |          | Secret used to sign and verify tokens for authentication              |
| NODEMAILER_TRANSPORTER_USERNAME  | YES      |          | Source email address from which system emails are sent                |
| NODEMAILER_TRANSPORTER_PASSWORD  | YES      |          | Password for Source email address from which system emails are sent   |

## Development
To start the server, simply run `npm run start` or `JWT_SECRET=secret npm run start` if you would like to set the required environment variable via command line. Replace `secret` with your own secret.

The server should run at `localhost:8000`

## Git hooks
Git hooks have been created to run code quality before committing changes. If any of the scripts in the hooks report an error, the commit will be aborted. Please fix the code quality issue before proceeding further.

The commit message is checked in order to ensure that it provides enough description for developers to use. For instance, if a bug was introduced by a certain commit, it becomes quicker and easier to find and revert the commit which caused the bug in the first place. 

The pre-commit message follows the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

The commit message should be structured as follows: `<type>[optional scope]: <description>`
Where type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]

### pre-commit
Before each commit, only code quality (eslint) checks will be made. 
The following command will be run:
`npm run eslint`