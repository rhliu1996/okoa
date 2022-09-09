const { sync } = require('glob')
module.exports = (pagesJson, loader) => {
    console.log(process.env.UNI_APP_NAME)
    return Object.assign(pagesJson, {
        pages: sync(`${process.env.UNI_INPUT_DIR}/pages/**/*.vue`).map(item => {
            const tmp = /(pages\/.*)\.vue/.exec(item);
            if (tmp.length == 2) {
                return {
                    path: tmp[1]
                }
            } else {
                console.error(`读取动态pages出错：${item}`)
            }
        }),
        subPackages: [],
        globalStyle: {
            navigationStyle: "custom",
            navigationBarTextStyle: "black",
            navigationBarTitleText: process.env.UNI_APP_NAME,
            navigationBarBackgroundColor: "#F8F8F8",
            backgroundColor: "#F8F8F8"
        }
    })
}