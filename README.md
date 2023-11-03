```
#!
==========================================================================
     _________                     __    ___________.__                   
    /   _____/_____   ____   _____/  |_  \__    ___/|__| _____   ____     
    \_____  \\____ \_/ __ \ /    \   __\   |    |   |  |/     \_/ __ \    
    /        \  |_> >  ___/|   |  \  |     |    |   |  |  Y Y  \  ___/    
   /_______  /   __/ \___  >___|  /__|     |____|   |__|__|_|  /\___  >   
           \/|__|        \/     \/                           \/     \/    
                                                                          
 Created by : Cloud Coders                                                
  Copyright : (c) 2016 - Cloud Coders intl B.V.                           
    Package : server                                                        
    Product : spent-time.com                                                                                              
==========================================================================
```

# Spent time Server - spent-time.com

node / express / passport / socket.io  /  mongodb

## Requirements

* [NodeJs](http://nodejs.org) >= 6.x 
* [mongodb](http://mongodb.org)

## Install

```sh
$ git clone https://bitbucket.org/spent-time/server.git
$ npm install
$ npm start
```

**NOTE:** Do not forget to set the facebook, twitter, google, linkedin and github `CLIENT_ID`s and `SECRET`s. In `development` env, you can set the env variables by doing

```sh
cp .env.example .env
```

and replace the values there. In `production` env, it is not safe to keep the ids and secrets in a file, so you need to set it up via commandline. If you are using heroku checkout how environment variables are set [here](https://devcenter.heroku.com/articles/config-vars).

If you want to use image uploads, don't forget to set these env variables for
imager config.

```sh
IMAGER_S3_KEY=AWS_S3_KEY
IMAGER_S3_SECRET=AWS_S3_SECRET
IMAGER_S3_BUCKET=AWS_S3_BUCKET
```

then

```sh
$ npm start
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Tests

```sh
$ npm test
```

## License

MIT
