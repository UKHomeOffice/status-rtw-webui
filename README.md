# Right To Work Management Application UI

https://bitbucket.ipttools.info/projects/SC/repos/status-rtw-webui

## Getting started
### Prerequisites
- Node JS
- NPM
- Mocha (for running tests)
- Redis

## Installing

The instructions below show hot to stand up the service locally on a Mac. It is not possible to run locally this way on a Windows machine because of a problem with one of the NPM dependencies.

Note: You need to have Redis running. The easiest way to do this on a Mac is to install Redis via Homebrew. Follow the instructions at [https://brew.sh/](https://brew.sh/) and 
[https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298) to install Homebrew and Redis respectively. If you also run the command in the 'Launch Redis on computer starts' section you won't have to remember to start up Redis each time you start your machine.

Then run the command

`npm install`

to install dependencies, and

`npm run start`

or `npm run start:dev` to start in dev mode (which watches some folders for changes and restarts)

The app will then be available at `http://localhost:8080/view` for the 'jobseeker' route and `http://localhost:8080/check` for the 'employer' route.

You may also want to install and run the repo from `https://bitbucket.ipttools.info/projects/SC/repos/status-rtw-webui-mocks/browse` to provide mock API responses locally. 

