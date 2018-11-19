var days = 1;
var d = Date.now() - (days * 24 * 60 * 60 * 1000);

var exports = {
    title: 'your title',
    since: new Date(d),
    organization: 'yourOrganization',
    types: ['label1', 'label2', 'label3'],
    repos: ['repo1', 'repo2', 'repo3'],
    states: [{
            name: 'Export 1',
            options: {
                labels: 'Todo'
            }
        },
        {
            name: 'Export 2',
            options: {
                labels: 'Doing'
            }
        },
        {
            name: 'Export 3',
            options: {
                labels: 'Done'
            }
        }
    ],
    template: 'templates/email.example.tpl',
    email: {
        to: ['email@example.com'],
        //cc: ['email@example.com', 'email@example.com']
    }
};

module.exports = exports;
