
PORT = 54321
REPORTER = list

test:
	@NODE_ENV=test \
	PORT=$(PORT) \
	./node_modules/.bin/mocha \
		--recursive \
		--reporter $(REPORTER) \
		--timeout 10000 \
		--bail \
		tests/*.test.js

.PHONY: test
