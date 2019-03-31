# Introduction

This api takes as inputs a summoner name (e.g. "jehuni") and a region (e.g. "euw1"),  returns the champion mastery for all participants in this summoner's most recent game.

# Tech Stack
- Node.js
- Mocha


# Usage

To install packages:

```console
npm install 
```

---
You can run with predefined script :

```console
npm start 
```

or

You can run default: 

```console
node dist/server.js 
```

> Important: 

If the api key has expired,  you must provide api key as below:

```console
API_KEY=xxxx node dist/server.js 
```


Sample Api Endpoint: 

**http://127.0.0.1:3000/gamedata?summoner=jehuni&region=euw1**


# Container Usage

Build :
```console
docker build -t lol-api .
```

Runnig :
```console
docker run -it -p 3000:3000 lol-api
```

Sample Api Endpoint: 

**http://127.0.0.1:3000/gamedata?summoner=jehuni&region=euw1**

# Test

To run tests :

```console
npm test 
```

> NOTE: All champions come from **champions.json**
