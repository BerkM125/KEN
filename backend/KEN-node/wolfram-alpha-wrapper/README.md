## A nodejs wrapper for [http://api.wolframalpha.com/v1/query.jsp](http://api.wolframalpha.com/v1/query.jsp)

wolfram-alpha-wrapper
=====================

A nodejs wrapper for [http://api.wolframalpha.com/v1/query.jsp](http://api.wolframalpha.com/v1/query.jsp)

## What is wolfram-alpha-wrapper?

This software is a [NodeJS](http://nodejs.org) application.

## How to test

Install node and its package manager (npm) from here: [http://nodejs.org](http://nodejs.org)

## Install wolfram-alpha-wrapper dependencies

* install dependencies

```
    npm install
  ```

## Obtaining an AppID

Visit the Wolfram|Alpha Webservice API website [http://products.wolframalpha.com/api](http://products.wolframalpha.com/api) to register for a Wolfram|Alpha API account. An `AppID` is provided on completion of API account registration. An `AppID` is a string that identifies your application, and it must be supplied in all calls to the Wolfram|Alpha API. If you have multiple applications using the Wolfram|Alpha API, each must have its own `AppID`.

## Environment variable WOLFRAM_USERAPPID

After you have an `AppID`, you need to edit the value of `APP_ID` in demo.js. Only do this during development. You don't want other to use your key and can deplete your call quotas.

For security reason the safe place to store value for `APP_ID` is an enviroment variable named `WOLFRAM_USERAPPID`. You might use a `.bashrc` or equivalent to store this id.

## Testing using .logs/test-query.xml

To test immediately how wolfram-alpha-wrapper process a Wolfram|Alpha XML files, I have provided the XML file I have recieved while querying for the input word 'random' using my `AppID` and save it into `.logs/test-query.xml`

* setup include/WAConfig.js to use local file

```
	// javascript
	var config = require('./include/WAConfig');

	config.set('USELOCALFILE', true);
  ```

* setup ./index.js to use local file

```
	// javascript
	var engine = require('./index.js');

	var input = 'INPUTPARAMETER';

	engine.getRequest(input, 'file://./.logs/test-query.xml', function (err, xml){
		... PROCESS err and xml here
	});
  ```

## Run demo.js

The provided demo.js is use to test `wolfram-alpha-wrapper` by just reading file `.logs/test-query.xml` instead of reading it from  [http://api.wolframalpha.com/v1/query.jsp](http://api.wolframalpha.com/v1/query.jsp).


* To capture the result of running demo.js

````
	node demo > demo.json
  ```

* doc/demo.json is the sample output of reading 'random' information on the api.wolframalpha.com web site.

## Testing using mocha via npm

````
	npm test
  ```

* Mocha test will display the following

````
> wolfram-alpha-wrapper@0.1.0 test /projects/wolfram-alpha-wrapper
> mocha -b test -u tdd  -R spec

  WolframAlphaWrapperTest
    ✓ Contructor test 
    ✓ config.set("appID") 
    ✓ engine.constructURL(input, other) 
    ✓ engine.parseXML(xml, cb) 
    ✓ engine.readXML(url, cb) 

  5 passing (27ms)
  ```

## Testing using grunt

````
grunt
Running "jshint:gruntfile" (jshint) task

✔ No problems

Running "jshint:lib" (jshint) task

✔ No problems

Running "jshint:test" (jshint) task

✔ No problems

Running "mochaTest:test" (mochaTest) task
  ․․․․․

  5 passing (35ms)

Done, without errors.
  ```

## The benifit of using locally cache file

Currently, when you signup a free account in [](), your free application will have a limit of 2000 call per month.
For development purposes, we can cache the resulting XML into a file per input value. This way, the developer account can avoid exceeding it monthly API call quotas.

The `getResults(input, otherParams, callback)` method is design to programmatically switch from reading information on Wolframa|Alpha endpoint [http://api.wolframalpha.com/v1/query.jsp](http://api.wolframalpha.com/v1/query.jsp) or on the local file.

## Copyright Notice

* The included node js files (as listed below) were distributed with [MIT](http://opensource.org/licenses/MIT) license.

````
	./demo.js
	./include/WAAssumption.js
	./include/WAConfig.js
	./include/WAImage.js
	./include/WAInfo.js
	./include/WAPod.js
	./include/WAResponse.js
	./include/WASubpod.js
	./include/WASubstitution.js
	./index.js
	./LICENSE
  ```

## Reference

Node js code were based from the PHP wrapper publish here [http://products.wolframalpha.com/docs/PHP_Binding_0_1.zip](http://products.wolframalpha.com/docs/PHP_Binding_0_1.zip)

API Information were taken from [http://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf](http://products.wolframalpha.com/docs/WolframAlpha-API-Reference.pdf)

Other Wolframa Alpha API information taken from [http://products.wolframalpha.com/api/documentation.html](http://products.wolframalpha.com/api/documentation.html)

## LICENSE
[MIT](http://opensource.org/licenses/MIT) license.
