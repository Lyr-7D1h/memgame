# The MemGame

Welcome to the memory game.

## Architecture

```
localhost:5000
    /*      =>  React
    /api/*  =>  Fastify
```

### React

I use **React Router** for client-side routes. I don't want it all to be on one url. I want people to be able to link to for example the scoreboard.

I use **Ant Design** as UI Library. It is a very mature and stable library with in my opinion the best looking components. It has a lot of extensions (eg animations, enterprise, icons), which make it very usefull if you ever want one of those things implemented.

### Fastify

An easily scalable, minimal and fast **Node.js Api Framework**.

I chose this framework because I only need a few endpoints and this would be the ideal node.js solution for it.

I use it combined with **Typescript** for a more stable approach. And if I were to extend this api it would be more reliable as it grows. tsconfig.json is also configured with the most strict approach.

I don't use webpack because I don't want to deal with the overhead a simple **ts-node-dev** server is good enough to be used in development.

I use **pino** as logger for good and clear development logs and fast/minimal production logs.

## Build

### Development

Process/terminal #1

```bash
cd client
yarn
yarn start
```

Process/terminal #2

```bash
cd server
yarn
yarn start
```

### Production

```bash
cd client
yarn --production
yarn build

cd ../server
yarn --production
yarn build
yarn start:prod
```

### Notes

I'm fairly new to Typescript and have only recently used it by migrating one of my projects back-end to use Typescript. That's mostly why I didn't use it for the client + I didn't want to deal with the overhead due to it being a pretty small project.
