#!/bin/bash

# https://github.com/sass/node-sass/pull/2386
# https://github.com/sass/node-sass/issues/1894#issuecomment-390199128

cd node_modules/node-sass/lib/

[[ ! -f render.js.bak ]] && cp render.js render.js.bak

patch_url="https://gist.githubusercontent.com/altbdoor/39277a5e43c6813f0c58be0a6d20fea8/raw/120ed077125169069cc39ab839f3bf34b88058f7/node_sass_patch.diff"

curl -o patch.diff -L ${patch_url}

patch -N render.js < patch.diff

[[ -f render.js.rej ]] && rm render.js.rej

rm patch.diff
