all: compile;
	cd src
	npm run dev
compile: 
	cd src
	@echo Install node modules.
	npm install
clean:
	rm -rf src/node_modules
	rm -rf src/package-lock.json