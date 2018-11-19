# monitoring-github-issues
Search issues with Github API and send them by email.

Install :
```
git clone https://github.com/ripso/monitoring-github-issues.git
cd monitoring-github-issues
npm install
sudo npm link
```

Configure :
- copy config/config.example.js into config/config.js and configure it
- copy config/exports/example.js into config/exports/yourExport.js and configure it
- copy templates/email.example.tpl into templates/yourTemplate.tpl and configure it

Help : 
```
monitoring-github-issues --help
```

Launch :
```
monitoring-github-issues --export yourExport
```
