PORT = 54321
REPORTER = list
DATA_WEB_SERVICE="http://ec2-23-22-150-105.compute-1.amazonaws.com:8080"
START_RUN="http://ec2-23-22-150-105.compute-1.amazonaws.com:8080/BlitzDataWebService/evaluationRun/start?runId=Peewee"
STOP_RUN="http://ec2-23-22-150-105.compute-1.amazonaws.com:8080/BlitzDataWebService/evaluationRun/stop?runId=Peewee"
	RUN_ID=Peewee

test:
	@NODE_ENV=test \
	PORT=$(PORT) \
	DATA_WEB_SERVICE=$(DATA_WEB_SERVICE) \
	START_RUN=$(START_RUN) \
	STOP_RUN=$(STOP_RUN) \
	RUN_ID=$(RUN_ID) \
	./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER) \
		--timeout 10000 \
		--bail \
		tests/*.test.js

nodemon:
	foreman start -f Procfile.dev

.PHONY: test nodemon
