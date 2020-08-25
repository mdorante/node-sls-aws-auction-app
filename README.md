# node-sls-auction-service

Auction app in Node.js using Serverless Framework on AWS.

You can try it out by going through the "Setup" section below.

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

### 4. Teardown

When you are down checking the app out, you can remove all AWS resources in just one step:

```
sls remove -v
```
