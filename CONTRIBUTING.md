# Contributing to Frontity

We really appreciate your interest to contribute to Frontity! :tada:

The following is a set of guidelines for contributing to Frontity and its packages, which are hosted in the [Frontity Repository](https://github.com/frontity/frontity) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.



## Table Of Contents


-----

## Code of Conduct

This project and everyone participating in it is governed by the [Frontity Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. 

## How Can I Contribute?

### Reporting Bugs
### Suggesting Enhancements
### Your First Code Contribution
### Pull Requests

## What should I know before I get started?

### Frontity and its Packages

Frontity projects are built around the idea of [packages](https://api.frontity.org/frontity-packages) that encapsulates logic that can be reused across projects. Frontity packages may be considered as the equivalent of WordPress plugins. They're the ingredients of the final Frontity project.

A Frontity project is basically the sum of the [Core package](https://api.frontity.org/frontity-packages/core-package) plus a selection of [Features packages](https://api.frontity.org/frontity-packages/features-packages). We can also use [Collections packages](https://api.frontity.org/frontity-packages/collections-packages) to help us speed up the development of our Frontity project




...

There are many more, but this list should be a good starting point. For more information on how to work with Atom's official packages, see [Contributing to Atom Packages][contributing-to-official-atom-packages].

Also, because Atom is so extensible, it's possible that a feature you've become accustomed to in Atom or an issue you're encountering isn't coming from a bundled package at all, but rather a [community package](https://atom.io/packages) you've installed. Each community package has its own repository too, the [Atom FAQ](https://discuss.atom.io/c/faq) has instructions on how to [contact the maintainers of any Atom community package or theme.](https://discuss.atom.io/t/i-have-a-question-about-a-specific-atom-community-package-where-is-the-best-place-to-ask-it/25581)

#### Package Conventions

There are a few conventions that have developed over time around packages:

* Packages that add one or more syntax highlighting grammars are named `language-[language-name]`
    * Language packages can add other things besides just a grammar. Many offer commonly-used snippets. Try not to add too much though.
* Theme packages are split into two categories: UI and Syntax themes
    * UI themes are named `[theme-name]-ui`
    * Syntax themes are named `[theme-name]-syntax`
    * Often themes that are designed to work together are given the same root name, for example: `one-dark-ui` and `one-dark-syntax`
    * UI themes style everything outside of the editor pane &mdash; all of the green areas in the [packages image above](#atom-packages-image)
    * Syntax themes style just the items inside the editor pane, mostly syntax highlighting
* Packages that add [autocomplete providers](https://github.com/atom/autocomplete-plus/wiki/Autocomplete-Providers) are named `autocomplete-[what-they-autocomplete]` &mdash; ex: [autocomplete-css](https://github.com/atom/autocomplete-css)

### Design Decisions

When we make a significant decision in how we maintain the project and what we can or cannot support, we will document it in the [atom/design-decisions repository](https://github.com/atom/design-decisions). If you have a question around how we do things, check to see if it is documented there. If it is *not* documented there, please open a new topic on [Discuss, the official Atom message board](https://discuss.atom.io) and ask your question.



## Opening Issues

https://github.com/frontity/frontity/issues/new/choose



If you just want to ask a question about Frontity or want to contribute to the Open Source project and don't know how, the Community Forum is the main place for the community to help each other. 

But before posting a question or asking for help on a particular topic, check the [Frontity documentation and learning resources](https://community.frontity.org/t/frontity-community-forum-users-guide/4399#before-asking-in-the-community-forum). There’s a good chance that you will find answers to your questions there.





[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Atom and Packages](#atom-and-packages)
  * [Atom Design Decisions](#design-decisions)


[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [CoffeeScript Styleguide](#coffeescript-styleguide)
  * [Specs Styleguide](#specs-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)

[Additional Notes](#additional-notes)
  * [Issue and Pull Request Labels](#issue-and-pull-request-labels)

----

# Contribute to Frontity

We really appreciate your interest to contribute to Frontity! Any kind of contribution is highly appreciated, not only coding ☺️.

## Coding Contributions

There is a detailed guide about how to contribute coding at our docs: [Code Contributions](https://docs.frontity.org/contributing/code-contribution-guide), but if you are looking for a quick guide, these are the main steps:

**Prerequisites:** Node 10 (or newer) installed in your computer.

1. Fork this [repository](https://github.com/frontity/frontity) and clone your fork.
2. Run ```npm install``` in the root folder.
3. Run ```cd examples/mars-theme-example/``` to go to the example directory.
4. Run ```npx frontity dev``` to start Frontity with mars-theme on [localhost:3000](http://localhost:3000/).
5. Make any changes you consider to the packages.
>***WARNING: After adding/removing dependencies to a package, go back to the root and do ```npm install``` again.***
6. Run ```npm test``` in the root to check if the commit is acceptable.
7. Commit and push to your fork.
8. Open a Pull Request detailing the changes.

>***WARNING: `npm test` will be run automatically each time your commit or push, so it may take a while. If it fails, it won't let you commit/push. Fix the tests and try again.***

If you get stuck on any of these steps, you should check the [Code Contributions guide](https://docs.frontity.org/contributing/code-contribution-guide).

## Other types of contributions

There are several ways to support the project and get involved. Don't know how to code? Don't worry! You can contribute in many other ways, just check our [How to contribute page](https://docs.frontity.org/contributing/how-to-contribute).
