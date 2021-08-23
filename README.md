# MERN Template

My template for MERN Stack applications

## Technologies Used:

- Client
  - TypeScript
  - Sass
  - React
  - GraphQL / Apollo Client
  - Material UI

- Server
  - TypeScript
  - Express
  - GraphQL / Apollo Server
  - NodeJS
  - Mongoose ODM
  - MongoDB

## Installation
After `Use this as a template` and then cloning and cd-ing into your project folder:
```
cd client && npm i
cd ..
cd server && npm i
cd config && touch .env
cp .env.example .env
```

NOTE: Last command will work only in Bash (not CMD). If CMD, then manually copy-paste `.env.example` and rename the copy as `.env`

## File Structure

```
my-app/
├── client/
|     ├── node_modules/
|     ├── public/
|     |     ├── img/
|     |     ├── index.html
|     |     └── robots.txt
|     ├── src/
|     |     ├── components/
|     |     |     ├── css/
|     |     |     |     └── Navbar.scss
|     |     |     └── Navbar.tsx
|     |     ├── pages/
|     |     |     └── css/
|     |     |     |     ├── Home.scss
|     |     |     |     └── Error404.scss
|     |     |     ├── Home.tsx
|     |     |     └── Error404.tsx
|     |     ├── graphql/
|     |     |     ├── mutations/
|     |     |     └── queries/
|     |     ├── context/
|     |     ├── hooks/
|     |     ├── App.tsx
|     |     ├── App.scss
|     |     ├── index.tsx
|     |     └── react-app-env.d.ts
|     ├── tsconfig.json
|     ├── package.json
|     └── package-lock.json
├── server/
|     ├── config/
|     |     ├── .env
|     |     └── .env.example
|     ├── graphql/
|     |     ├── resolvers.ts
|     |     └── typeDefs.ts
|     ├── models/
|     ├── node_modules/
|     ├── server.js
|     ├── tsconfig.json
|     ├── package-lock.json
|     └── package.json
├── .gitignore
├── README.md
└── LICENSE
```
