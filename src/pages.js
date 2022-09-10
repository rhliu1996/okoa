const { sync } = require('glob');
const { statSync } = require('fs');
const { getJson } = require('@dcloudio/uni-cli-shared')
module.exports = (pagesJson, loader) => {
    const pagesPath = sync(`${process.env.UNI_INPUT_DIR}/pages/**/*.vue`);
    let pages = [];
    let tabBarList = [];
    for (let i = 0; i < pagesPath.length; i++) {
        const tmp = /(pages\/.*)\.vue/.exec(pagesPath[i]);
        let style = {};
        let config = {};
        if (tmp.length == 2 && statSync(`${process.env.UNI_INPUT_DIR}/${tmp[1]}.json`, { throwIfNoEntry: false })) {
            config = getJson(`${tmp[1]}.json`);
            if (config && config.style) {
                style = config.style;
            }

            if (config && config.tabBar && Object.keys(config.tabBar).length) {
                tabBarList.push(Object.assign({ pagePath: tmp[1] }, config.tabBar));
            }
        }

        if (tmp.length == 2) {
            if (config.isLauncher) {
                pages.unshift({
                    path: tmp[1],
                    style
                });
            } else {
                pages.push({
                    path: tmp[1],
                    style
                });
            }
        }
    }
    return Object.assign(pagesJson, {
        pages,
        subPackages: [],
        globalStyle: {
            navigationStyle: "custom",
            navigationBarTextStyle: "black",
            navigationBarTitleText: process.env.UNI_APP_NAME,
            navigationBarBackgroundColor: "#F8F8F8",
            backgroundColor: "#F8F8F8"
        },
        tabBar: {
            color: "",
            selectedColor: "",
            borderStyle: "",
            backgroundColor: "#3975C6",
            list: tabBarList
        }
    })
}