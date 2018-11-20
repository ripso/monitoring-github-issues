#!/usr/bin/env node

/* global __dirname */

process.chdir(__dirname);

const config = require('./config/config.js');
const funcs = require('./core/funcs.js');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage');
const colors = require('colors');
const fs = require('fs');
const Mustache = require('mustache');
const GitHub = require('github-api');

// Help

const optionDefinitions = [{
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this usage guide.'
    },
    {
        name: 'export',
        alias: 'e',
        type: String,
        description: 'The name of the export to process'
    },
    {
        name: 'verbose',
        alias: 'v',
        type: Boolean,
        description: 'Verbose mode'
    }
];
const options = commandLineArgs(optionDefinitions);

if (!options.export) {
    const usage = commandLineUsage([{
            header: 'Monitoring Github issues',
            content: 'Search issues with Github API and send them by email.'
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        },
        {
            content: 'Project home: {underline https://github.com/ripso/monitoring-github-issues}'
        }
    ])
    console.log(usage);
    process.exit(1);
}

if (!options.verbose) {
    console.log = function() {};
}

// Parameters

var parameters;
try {
    parameters = require('./config/exports/' + options.export+'.js');
} catch (e) {
    console.log(colors.red('The export `' + options.export+'` does not exist'));
    process.exit(1);
}

// Export

const gh = new GitHub(config.github);

var populateObject = () => {

    var exports = [];

    return funcs.promiseForEach(parameters.repos, repo => {

            console.log('==>'.green, repo)

            var returnedRepo = [];
            var Issue = gh.getIssues(parameters.organization, repo);

            return funcs.promiseForEach(parameters.states, state => {

                    var results = Object.assign({
                        issues: []
                    }, state);

                    return Issue.listIssues(state.options)
                        .then(response => {
                            return funcs.promiseForEach(response.data, issue => {
                                var labels = issue.labels.map(label => label.name);
                                var types = labels.filter(label => parameters.types.indexOf(label) >= 0);
                                results['issues'].push({
                                    title: issue.title,
                                    labels: labels,
                                    url: issue.html_url,
                                    type: types.length ? types.join(', ') : null
                                });
                            });
                        })
                        .then(() => {
                            if (results['issues'].length) {
                                returnedRepo.push(results);
                            }
                        });
                })
                .then(() => {
                    if (returnedRepo.length) {
                        exports.push({
                            name: repo,
                            states: returnedRepo
                        });
                    }

                });
        })
        .then(() => {
            return exports;
        });
};

var sendMail = (exports) => {
    var emailTemplate = fs.readFileSync(parameters.template, 'utf8');
    var rendered = Mustache.render(emailTemplate, { vars: exports });

    console.log(rendered);

    var transporter = require('nodemailer')
        .createTransport(config.smtp);
    var message = Object.assign(parameters.email, {
        from: config.smtp.user,
        subject: parameters.title,
        html: rendered
    });
    return transporter.sendMail(message);
};

populateObject()
    .then(sendMail);
