# `<%= projectName %>`
<% if (isProjectOnNpm) { -%>
[![Version](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>)
<% } -%>
<% if (projectVersion && !isProjectOnNpm) { -%>
![Version](https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000)
<% } -%>
<% if (projectPrerequisites) { -%>
<% projectPrerequisites.map(({ name, value }) => { -%>
![Prerequisite](https://img.shields.io/badge/<%= name %>-<%= encodeURIComponent(value) %>-blue.svg)
<% }) -%>
<% } -%>

[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://docs.frontity.org/)

[![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-orange)](https://github.com/frontity/frontity/blob/master/LICENSE)

[![Twitter: frontity](https://img.shields.io/twitter/follow/frontity.svg?style=social)](https://twitter.com/frontity)

<% if (projectDescription) { -%>
<%= projectDescription %>
<% } -%>


## Install

```sh
npm i <%= projectName %>
```


## Contributing

Frontity is a community project. We invite your participation through issues and pull requests! Check [here how to contribute](https://docs.frontity.org/contributing/how-to-contribute)

This project has quite a backlog of suggestions! If you're new to the project, maybe you'd like to open a pull request to address one of them:

[![GitHub issues by-label](https://img.shields.io/github/issues/frontity/frontity/good%20first%20issue)](https://github.com/frontity/frontity/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

<% if (licenseName && licenseUrl) { -%>

## 📝 License

<% if (authorName && authorGithubUsername) { -%>
Copyright © <%= currentYear %> [<%= authorName %>](https://github.com/<%= authorGithubUsername %>).

<% } -%>
This project is [<%= licenseName %>](<%= licenseUrl %>) licensed.
<% } -%>

***
<%- include('footer.md'); -%>
