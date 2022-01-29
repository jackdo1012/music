#!/bin/sh
c

ROOT_DIR=/usr/share/nginx/html

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html;
do
    echo "Processing $file ...";

    sed -i "s~serverurl~${VUE_APP_SERVER_URL}~g" $file

    sed -n '$p' $file

done

echo "Starting nginx"
nginx -g "daemon off;"