# collection-tracker

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Books:

Author:

http://openlibrary.org/search.json?author=tolkien

Title:

http://openlibrary.org/search.json?title=the+lord+of+the+rings

Subject/Genre:

https://openlibrary.org/search.json?subject=horror

Games:

Developer:

get id: https://api.rawg.io/api/developers?search=Electronic%20Arts&page_size=1 - field "id"
get the games from the developer (ordered by rating): https://api.rawg.io/api/games?ordering=-rating&developers=109

Title:

get by title: https://api.rawg.io/api/games?search=nioh - get results[0].id
get similar games: https://api.rawg.io/api/games/results[0].id/suggested - can be a very long list

Genre:

get the genre id: https://api.rawg.io/api/genres?search=action - results[] - search name === 'action -> "id"
get the games (ordered by rating): https://api.rawg.io/api/games?ordering=-rating&genres=4
