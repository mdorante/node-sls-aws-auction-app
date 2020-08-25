# node-sls-auctions-app-auction-service

Auctions app in Node.js using Serverless Framework on AWS.

This is part of a microservice oriented project, this is the **main** service (the actual auctions app).

This service depends on the rest, so in order to recreate the app:

1. Deploy [Authorization Service](https://github.com/mdorante/serverless-auth0-authorizer) (handles Auth0 authorization)
2. Deploy [Notifications Service](https://github.com/mdorante/node-sls-aws-notification-service) (handles email notifications)
3. Deploy this service (instructions below)

You will need:

- An AWS account
- Node v12.x

## Setup

### 1. Generate a new Serverless project or clone this repo:

```
sls create --name auction-service --template-url https://github.com/mdorante/node-sls-aws-auction-service
```

```
git clone git@github.com:mdorante/node-sls-aws-auction-service.git
```

### 2. Install node dependencies

```
cd auction-service
npm install
```

### 3. Deploy the serverless stack

```
sls deploy -v
```

## Teardown

When you are down checking the app out, you can remove all AWS resources in just one step:

```
sls remove -v
```
