# Synopsis

This is an API for eshop web & mobile app. I built it using NodeJS.

- See source code of front-end web app built with React - https://github.com/ChrisBapin/eshop-web-client

- See source code of front-end mobile app built with React Native - https://github.com/ChrisBapin/eshop-mobile-client

## Functionalities

### User route

- Save user

### Category route

- Save a category

### Product route

- Save differents products attached to a category

## Directory Structure

```bash
eshop-alex-api
├── middlewares
│   ├── isAuthenticated.js
│   └── uploadePictures.js
├── models
│   ├── categoryModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes
│   ├── categoryRoute.js
│   ├── productRoute.js
│   └── userRoute.js
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Running the project

Clone this repository :

```bash
git clone https://github.com/ChrisBapin/eshop-alex-api.git

cd eshop-alex-api
```

Install packages

```bash
npm install
```

Start the server:

```bash
nodemon index.js
```

Open Postman to test it out. Your data will be saved to MongoDB.

## Built With

JavaScript
Node.js
Express.js
MongoDB

## Testing With

Postman

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [body-parser](https://www.npmjs.com/package/body-parser)
- compression
- helmet
- cors
- uid2
- cloudinary
- crypto-js
