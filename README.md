# Game of Life

# Notes
### node-sass incompatibility

https://github.com/sass/node-sass/issues/3103

Error:

`Node Sass version 6.0.0 is incompatible with ^4.0.0 || ^5.0.0.`

Fix

1. delete yarn.lock
2. remove node_modules
3. `yarn add node-sass@latest sass-loader@latest`