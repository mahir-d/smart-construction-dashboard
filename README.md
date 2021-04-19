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

## Introduciton
Provides the following functionalities:
 * Allow the user to create, delete and fetch construction sites
 * Fetch the current list of materials for the current site
 * Allow the user to create, edit, and delete materials for a particular site 
 * Display the total cost of all materials for a particular site

## Database Schema
Since each material was unique for a particular construction site and not shared among other sites,
I decided to create two tables: 

1. site - Holds unique uuid for construction sites in the database 

```
site_id 
-------------
Content Cell 
Content Cell 
```

2. materials - represents material and site mapping

```
site_id       | material_id  | volume | cost   | color | delivery_date 
------------- | -------------|--------|--------|-------|---------------
uuid          | uuid         | number | number | string| datetime      

``` 

## Install
Execute the following command to load all the project dependencies
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
I have two databases set up for testing and production enviroment.
Below are sample values for the required variables. You can provide
name to both the database and Port number based on your needs
```dosini
PGDATABASE=prodDatabase
PGTESTDATABASE=testDatabase
PORT=3001
```

## Seed Command
To seed the Prouction database execute the following
command after executing the [installation][#Install] command and [setting up][#Set up] the project

```sh
npm run seed
```

## Run
Execute the following command to start the sever at the PORT number mentioned
in the .env file
``` sh
npm start
```

## Run tests
Run the following command to seed and run the Test database in testing enviroment
```sh
npm run test
```

## API documentation
To look up the API documentation, please start the local sever by executing the [run command][#Run]
and then redirect to the follwing url by adding the port number mentioned in the .env file
``` url
http://localhost:{port}/api-docs
```

## Author

👤 **Mahir Dhall**

* Github: [@mahir-d](https://github.com/mahir-d)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mahir-d/smart-construction-dashboard/issues). You can also take a look at the [contributing guide](https://github.com/mahir-d/smart-construction-dashboard/blob/master/CONTRIBUTING.md).

## 📝 License

Copyright © 2021 [Mahir Dhall](https://github.com/mahir-d).<br />
This project is [ISC](https://github.com/mahir-d/smart-construction-dashboard/blob/master/LICENSE) licensed.

