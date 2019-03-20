/**
 * Main background process.
 */

"use strict";

if ($_CFG.benchmarks) {
    console.time("backend/core");
    console.log("backend/core");
}

browser.runtime.onMessage.addListener((request) => {
    if ("core" !== request.target) {
        return;
    }

    let result;

    $_CFG.benchmarks ? console.time(`onMessage(${request.command})`) : null;

    switch (request.command) {
        // case "getOptions":
        //     return getOptions();

        case "getLocale":
            result = getLocale();
            break;

        case "getLanguage":
            result = getLanguage();
            break;

        case "setLanguage":
            result = setLanguage(request);
            break;

        default:
            console.warn(`Unsupported command "${request.command}"`);
    }

    $_CFG.benchmarks ? console.timeEnd(`onMessage(${request.command})`) : null;

    return result;
});


function getOptions() {
    return browser.storage.local.get(null).then((storage) => {
        if ("{}" === JSON.stringify(storage)) {
            let language = browser.i18n.getUILanguage();

            $_CFG.storage = JSON.parse(JSON.stringify(options.defaults));
            $_CFG.storage.version = (browser.runtime.getManifest()).version;
            if ($_CFG.supportedLanguages.indexOf(language) >= 0) {
                $_CFG.storage.language = language;
            }

            browser.storage.local.set($_CFG.storage);
        } else {
            $_CFG.storage = storage;
        }

        return Promise.resolve($_CFG);
    });
}

function getLocale() {
    let response = {
        "language": browser.i18n.getUILanguage(),
        "direction": browser.i18n.getMessage("@@bidi_dir")
    };

    return Promise.resolve(response);
}

function getLanguage() {
    return Promise.resolve($_CFG.storage.language);
}

function setLanguage(request) {
    $_CFG.storage.language = request.language;

    return browser.storage.local.set($_CFG.storage);
}

if ($_CFG["resetStorage"]) {
    browser.storage.local.clear()
        .then(() => {
            console.warn("Storage reset");
        })
        .catch((e) => {
            console.error(e);
        });
}

getOptions().catch((e) => {
    console.error(e);
});

$_CFG.benchmarks ? console.timeEnd("backend/core") : null;
