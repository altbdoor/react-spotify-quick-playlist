#!/bin/bash

# https://github.com/sass/node-sass/pull/2386
# https://github.com/sass/node-sass/issues/1894#issuecomment-390199128

cd node_modules/node-sass/lib/

cp render.js render.js.bak

patch_url="https://github.com/marcosbozzani/node-sass/commit/266861bf5761dcafd5d53d123264b965c861887c.diff"

curl -o patch.diff -L ${patch_url}

patch render.js < patch.diff

rm patch.diff
