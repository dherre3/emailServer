var gulp = require("gulp");
var ts = require("gulp-typescript");
var addsrc = require('gulp-add-src');

var tsProject = ts.createProject("tsconfig.json");
var paths = {
    src:"./src/**/*"
}
gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(addsrc(["src/configGetter.js"]))
        .pipe(gulp.dest("./dist"));
});
gulp.task("watch",function()
{
    gulp.watch(paths.src,["default"]);
});