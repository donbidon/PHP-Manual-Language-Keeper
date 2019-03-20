"use strict";

if ($_CFG.benchmarks) {
    console.time("frontend/add-ons/start");
    console.time("frontend/add-ons/start/getLanguage");
    console.log("frontend/add-ons/start");
}

browser.runtime.sendMessage({
    "target": "core",
    "command": "getLanguage"
}).then((storedLanguage) => {

    $_CFG.benchmarks ? console.timeEnd("frontend/add-ons/start/getLanguage") : null;

    let
        parsedURLPath = document.location.pathname.match(/^\/manual\/(([^\/]+)\/?)/),
        urlLanguage = null === parsedURLPath ? "en" : parsedURLPath[2];

    if (urlLanguage !== storedLanguage) {

        $_CFG.benchmarks ? console.log(`redirecting: [${urlLanguage}] -> [${storedLanguage}]`) : null;

        window.stop();
        document.location.href =
            document.location.href.replace(parsedURLPath[0], `/manual/${storedLanguage}/`);
    }
});

$_CFG.benchmarks ? console.timeEnd("frontend/add-ons/start") : null;
