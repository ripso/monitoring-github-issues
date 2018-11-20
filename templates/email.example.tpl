<h1>Your title</h1>

{{#vars}}
    <h2>{{name}}</h2>
    {{#states}}
        <h3>{{name}}</h3>
        <ul>
            {{#issues}}
                <li>[{{type}}] <a href="{{&url}}">{{title}}</a></li>
            {{/issues}}
        </ul>
    {{/states}}
{{/vars}}
