## Guide for Installation

Of course for every application you will install all the dependencies by typing

```
    npm install
```

First create your local environments by creating a new file

```
    next.config.js
```

and type the following

```
    module.exports = {
        env: {
            TOKEN_SECRET: <SECRET>,
            DB_CONNECTION: <MONGODB_CONNECTION_LINK>
        },
    };
```

Inside your config replace <SECRET> and <MONGODB_CONNECTION_LINK> with your
secret and connection to mongodb

### Running the application

By typing

```
    npm run dev
```

You will need to go to [http://localhost:3000](http://localhost:3000) to start the application
