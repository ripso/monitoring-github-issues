var days = 1;
var d = Date.now() - (days * 24 * 60 * 60 * 1000);

var exports = {
    title: 'your title',
    organization: 'yourOrganization',
    types: ['label1', 'label2', 'label3'],
    repos: ['repo1', 'repo2', 'repo3'],
    states: [{
            name: 'Export 1',
            options: { // Github API search options
                since: new Date(d),
                labels: 'Todo'
            }
        },
        {
            name: 'Export 2',
            options: {
                since: new Date(d),
                labels: 'Doing'
            }
        },
        {
            name: 'Export 3',
            options: {
                since: new Date(d),
                labels: 'Done'
            }
        },
        {
            name: 'Hotfixes in progress',
            options: {
                since: new Date(d),
                labels: 'Hotfix,Done' // multiple labels : comma separated
            }
        }
    ],
    template: 'templates/email.example.tpl',
    email: {
        to: ['email@example.com'],
        // cc: ['email@example.com', 'email@example.com'],
        // bcc: ['email@example.com', 'email@example.com']
    }
};

module.exports = exports;
