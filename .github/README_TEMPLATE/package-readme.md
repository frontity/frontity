# `<%= projectName %>`

[![Version](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>) [![npm](https://img.shields.io/npm/dw/<%= projectName %>)](https://www.npmjs.com/package/<%= projectName %>) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-orange)](https://github.com/frontity/frontity/blob/master/LICENSE)

<% if (projectDescription) { -%>
  <%= projectDescription %>
<% } -%>


## Install

```sh
npm i <%= projectName %>
```

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

<% projectNameTag = projectName.split("/")[1] %>  
These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/<%= projectNameTag  %>


<% if (licenseName && licenseUrl) { -%>
## 📝 License
<% if (authorName && authorGithubUsername) { -%>
  Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).
<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>
