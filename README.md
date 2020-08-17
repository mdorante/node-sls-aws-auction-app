# node_sls_aws_auction_app

Auction app in Node.js using Serverless Framework on AWS.
You can try it out by going through the "Setup" section below.

You will need:

- An AWS account
- Node v12.x
- Serverless SDK

## Setup

- Clone this repo

  - `git clone git@github.com:mdorante/node_sls_aws_auction_app.git`

- Navigate to the new repo directory and install npm packages
  - `cd node_sls_aws_auction_app`
  - `npm install`
- Deploy the serverless stack
  - `sls deploy -v`

# Teardown

When you are down checking the app out, you can remove all AWS resources in just one step:

- `sls remove -v`
