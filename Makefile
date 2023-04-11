.PHONY: all
all:
	cd hls.js \
	&& npm run build \
	&& cd .. \
	&& rm -rf dist \
	&& mkdir -p dist/hls.js \
	&& cp -R hls.js/dist dist/hls.js/dist \
	&& cp -R hls.js/demo dist/hls.js/demo \
	&& cp ./index.html ./dist \
	&& cp ./realcoolstyles.css ./dist \
	&& rm -rf iameli.car \
	&& go install github.com/ipld/go-car/cmd/car@latest \
	&& cd dist \
	&& car create --version 1 -f ../iameli.car . \
	&& cd .. \
	&& curl -H "authorization: Bearer $$W3_STORAGE_API_TOKEN" --data-binary @iameli.car https://api.web3.storage/car
