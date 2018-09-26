# MAL-Search

A responsive website for searching and displaying results from [MyAnimeList](https://myanimelist.net/).

A demo is available [here](https://kdomasze.github.io/MAL-Search/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

#### Required

-   [Sass](https://sass-lang.com/)
-   [Typescript](https://www.typescriptlang.org/)

#### Optional

-   [Node.js](https://nodejs.org/en/) - Used to make setup of required and optional tooling more streamlined
This project makes use of TSLint for linting and Prettier for formatting.

### Compilation

Run `sass src/sass/main.scss public/stylesheets/main.css` and `tsc` from the root project directory to compile the Sass and Typescript files and output them to the correct destination.

### Deployment

Move the contents of `public` to the desired location on your web server. The project will be served at 'domain.tld/path/to/project/index.html'.

## Built With

-   [JQuery](https://jquery.com/) - The JavaScript support library used
-   [Node.js](https://nodejs.org/en/) - The JavaScript runtime used to run tooling
-   [Sass](https://sass-lang.com/) - the CSS Preprocessor used
-   [Typescript](https://www.typescriptlang.org/) - The compile-to-JavaScript language used
-   [Normalize.css](https://necolas.github.io/normalize.css/) - The CSS reset library used
-   [Jikan](http://jikan.moe/) - The unofficial web API used to access MyAnimeList data

## Authors

-   **Kyle Domaszewicz** - [kdomasze](https://github.com/kdomasze)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

-   Component styling loosely based off Google's Material Design guidelines and Bootstrap.
