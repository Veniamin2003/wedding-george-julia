import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        files: `${buildFolder}/files/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/styles/`,
        js: `${buildFolder}/scripts/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`
    },
    src: {
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/html/pages/**/*.pug`,
        scss: `${srcFolder}/styles/*.scss`,
        js: `${srcFolder}/scripts/*.js`,
        jsLibs: `${srcFolder}/scripts/libs.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        svg: `${srcFolder}/svg/**/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`
    },
    watch: {
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/**/*.pug`,
        scss: `${srcFolder}/**/*.scss`,
        js: `${srcFolder}/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: `test`
}
