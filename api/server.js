const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

///routers
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const communitiesRouter = require('../communities/communities-router.js');
const individualsRouter = require('../individuals/individuals-router.js');
const zonesRouter = require('../zones/zones-router.js');
const familiesRouter = require('../families/families-router.js');
const surveysRouter = require('../surveys/surveys-router.js');
const questionsRouter = require('../questions/questions-router.js');
const sqRouter = require('../survey_questions/sq-router.js');
const rolesRouter = require('../roles/roles-router.js');
const responsesRouter = require('../responses/response-router.js');

// --- restricted middleware --- //
const restricted = require('../auth/restricted-middleware.js');

const server = express();
server.use(helmet());

// --- which urls to be whitelisted --- //
var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { credentials: true, origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}

server.use(cors(corsOptionsDelegate));

server.use(express.json());
server.use(logger);

// --- logger middleware --- //
function logger(req, res, next) {
	const date = new Date(Date.now());
	console.log(`METHOD: ${req.method}`);
	console.log(`URL: ${req.originalUrl}`);
	console.log(`DATE: ${date.toDateString()}, ${date.toTimeString()}`);
	next();
}

// --- router paths --- //
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/communities', communitiesRouter);
server.use('/api/individuals', individualsRouter);
server.use('/api/zones', zonesRouter);
server.use('/api/families', familiesRouter);
server.use('/api/surveys', surveysRouter);
server.use('/api/questions', questionsRouter);
server.use('/api/sq', sqRouter);
server.use('/api/roles', rolesRouter);
server.use('/api/responses', responsesRouter);

server.get('/', (req, res) => {
	res.status(200).json({ api: 'up!' });
});

module.exports = server;