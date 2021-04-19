<h1 align="center">Welcome to smart-construction-dashboard 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="localhost:{port}/api-docs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mahir-d/smart-construction-dashboard/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Smart dashboard to add, edit, delete a catlog of materials

### 🏠 [Homepage](https://github.com/mahir-d/smart-construction-dashboard#readme)

## Install

```sh
npm install
```

### Set up
Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
Requried varibales and sample values based on Postgresql configurations
```dosini
PGHOST=localhost
PGUSER=mahirdhall
PGPASSWORD=null
PGPORT=5432
```
I have two database set up for testing and production enviroment.
Below are sample values for the required variables
```dosini
PGDATABASE=prodDatabase
PGTESTDATABASE=testDatabase
PORT=3001```



## Seed Command

```sh
npm run seed
```

## Run
``` sh
npm start
```

## Run tests

```sh
npm run test
```

## API documentation

``` 
localhost:port/api-docs
```

## Author

👤 **Mahir Dhall**

* Github: [@mahir-d](https://github.com/mahir-d)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mahir-d/smart-construction-dashboard/issues). You can also take a look at the [contributing guide](https://github.com/mahir-d/smart-construction-dashboard/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Mahir Dhall](https://github.com/mahir-d).<br />
This project is [ISC](https://github.com/mahir-d/smart-construction-dashboard/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
