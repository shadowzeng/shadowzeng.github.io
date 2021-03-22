module.exports = {
    'ng-home/src/app/**/*.ts?(x)': () => 'tsc -p ng-home/tsconfig.app.json --noEmit',
}