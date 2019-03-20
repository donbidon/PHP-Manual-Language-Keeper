"use strict";

if ($_CFG.benchmarks) {
    console.time("frontend/add-ons/end");
    console.log("frontend/add-ons/end");
}

if (document.getElementById("changelang-langs")) {
    document.getElementById("changelang-langs").onchange = function () {
        let language = this.value.match(/^[^\/]+/);

        $_CFG.benchmarks ? console.time(`frontend/add-ons/end/setLanguage(language)`) : null;

        browser.runtime.sendMessage({
            "target": "core",
            "command": "setLanguage",
            "language": language[0]
        })
            .then(() => {
                $_CFG.benchmarks ? console.timeEnd(`frontend/add-ons/end/setLanguage(language)`) : null;
            })
            .catch((e) => {
                console.error(e);
            });

        return document.changelang.submit();
    };
}

if (document.getElementsByClassName("edit-bug").length > 0) {
    let _elem = document.createElement('a');
    _elem.target = "_blank";
    _elem.href = "https://addons.mozilla.org/addon/php-manual-language-keeper/";
    _elem.style = "background: #ddd; padding: 2px 5px; border: 1px dotted #000;";
    _elem.title = browser.i18n.getMessage("link_title");
    _elem.innerText = browser.i18n.getMessage("link");

    document.getElementsByClassName("edit-bug")[0].appendChild(_elem);
}

$_CFG.benchmarks ? console.timeEnd("frontend/add-ons/end") : null;
