SHELL=/bin/bash
.SHELLFLAGS="-O extglob -c"

.PHONY: all
all: clean hlsjs index discord-time car

.PHONY: clean
clean:
	rm -rf dist && mkdir -p dist

.PHONY: hlsjs
hlsjs:
	cd hls.js \
	&& npm run build \
	&& cd .. \
	&& mkdir -p dist/hls.js \
	&& cp -R hls.js/dist dist/hls.js/dist \
	&& cp -R hls.js/demo dist/hls.js/demo

.PHONY: index
index:
	cp ./index.html ./dist \
	&& cp ./realcoolstyles.css ./dist \
	&& cp ./avatar.jpeg ./dist

.PHONY: discord-time
discord-time:
	cd discord-time \
	&& yarn install \
	&& yarn run build

.PHONY: car
car:
	rm -rf iameli.car \
	&& go install github.com/ipld/go-car/cmd/car@latest \
	&& car create --version 1 -f iameli.car $(wildcard ./dist/*) \
	&& curl -H "authorization: Bearer $$W3_STORAGE_API_TOKEN" --data-binary @iameli.car https://api.web3.storage/car
