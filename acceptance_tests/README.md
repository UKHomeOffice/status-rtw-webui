#Example HOF Form Acceptance Tests

The tests follow the standard principles of feature files and step definitions.

##Installation:

###Install Bundler

```
gem install bundler
```

###Bundle install the Gem file

cd to the acceptance_tests folder

```
bundle install
```

##Run:

Run with
```
cucumber
```
or to run specific features:
```
cucumber features/example.feature
```

You can also run/install the tests from the root of the project using npm
```
npm run test:acceptance
```


##rtw-ui-acceptance image:

When running in Docker (e.g. when invoked from Drone) the acceptance tests are built into its own image.

That image itself is based on image **rtw-ui-acceptance**.

The rtw-ui-acceptance image is built from build file ./Dockerfile-acceptance-build. This image is expected to be static since it contains Ruby, the gems required to run the tests and PhantomJS.

If any new gems are required when running the test, e.g. you have to change the Gemfile that requires a new run of **bundle install** then a new build of the rtw-ui-acceptance is required.
 
The steps are as follows:

* _docker build -f Dockerfile-acceptance-build -t quay.io/ukhomeofficedigital/rtw-ui-acceptance:<version> ._
* _docker push quay.io/ukhomeofficedigital/rtw-ui-acceptance:<version>_
* **amend Dockerfile-acceptance to reference the new version**