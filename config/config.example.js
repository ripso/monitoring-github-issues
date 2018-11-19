var config = {
    github: {
        token: 'githubToken'
    },
    smtp: {
        service: 'gmail',
        auth: {
            user: 'yourEmail',
            pass: 'yourPassword'
        }
    },
    email: {
        to: ['email@example.com'],
        //cc: ['email@example.com', 'email@example.com']
    }
};

module.exports = config;
