var gulp = require("gulp");
// var concat = require("gulp-concat");
var minifyCSS = require("gulp-minify-css");
var uglify = require("gulp-uglify");
// var rename = require("gulp-rename");
const babel = require("gulp-babel"); // 載入 gulp-babel 套件
// var htmlreplace = require("gulp-html-replace");
var minifyHTML = require("gulp-minify-html");
var imagemin = require("gulp-imagemin");

gulp.task("minify-css", function () {
    var stream = gulp
        .src("./app/**/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("build"));
    return stream;
});

gulp.task("uglify", function () {
    var stream = gulp
        .src("./app/**/*.js") // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(
            babel({
                presets: ["@babel/env"], // 使用預設環境編譯
                minified: true,
            })
        ) // 將 JavaScript 做最小化
        .pipe(uglify())
        .pipe(gulp.dest("build")); // 指定最小化後的 JavaScript 檔案目錄
    return stream;
});

gulp.task("html-replace", function () {
    var opts = { comments: false, spare: false, quotes: true };
    return (
        gulp
            .src("./app/**/*.html")
            // .pipe(
            //     htmlreplace({
            //         css: "css/all.min.css",
            //         js: "js/all.min.js",
            //     })
            // )
            .pipe(minifyHTML(opts))
            .pipe(gulp.dest("build"))
    );
});

gulp.task("imagemin", function () {
    var stream = gulp
        .src("./app/images/**")
        .pipe(imagemin())
        .pipe(gulp.dest("build/images"));
    return stream;
});

// gulp.task("default", ["html-replace", "minify-css", "uglify"]);
gulp.task(
    "default",
    gulp.series(
        "html-replace",
        "minify-css",
        "uglify",
        "imagemin",
        async () => {
            await console.log("Finished!");
        }
    )
);
