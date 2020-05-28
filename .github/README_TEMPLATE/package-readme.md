# `<%= projectName %>`

[![Version](https://img.shields.io/npm/v/<%= projectName %>.svg)](https://www.npmjs.com/package/<%= projectName %>) [![npm](https://img.shields.io/npm/dw/<%= projectName %>)](https://www.npmjs.com/package/<%= projectName %>) [![License: Apache--2.0](https://img.shields.io/badge/license-Apache%202-lightgrey)](https://github.com/frontity/frontity/blob/master/LICENSE)

<% if (projectDescription) { -%>
<%= projectDescription %>
<% } -%>


## Install

```sh
npm i <%= projectName %>
```

<% projectNameTag = projectName.split("/")[1] %>  

## Feature Discussions

[**Feature Discussions**](https://community.frontity.org/c/feature-discussions/33) about Frontity are public. You can join the discussions, vote for those you're interested in or create new ones.

These are the ones related to this package: https://community.frontity.org/tags/c/feature-discussions/33/<%= projectNameTag  %>

## Changelog

Have a look at the latest updates of this package in the [CHANGELOG](https://github.com/frontity/frontity/blob/dev/packages/<%= projectNameTag %>/CHANGELOG.md)

***

<%- include('footer.md'); -%>
