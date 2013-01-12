PORT = 54321
REPORTER = list
DATA_WEB_SERVICE="http://ec2-23-22-150-105.compute-1.amazonaws.com:8080"

test:
	@NODE_ENV=test \
	PORT=$(PORT) \
	DATA_WEB_SERVICE=$(DATA_WEB_SERVICE) \
	./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER) \
		--timeout 10000 \
		--bail \
		tests/*.test.js

nodemon:
	foreman start -f Procfile.dev

.PHONY: test nodemon
