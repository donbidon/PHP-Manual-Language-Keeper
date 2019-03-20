/**
 * Updates storage according to previous & actual add-on versions.
 */

"use strict";

getOptions().then((options) => {
    let
        actual = (browser.runtime.getManifest()).version,
        stored = options.storage.version;

    if (actual < stored) {
        throw new Error("Code version downgrading detected!");
    } else if (actual === stored) {
        return;
    }

    switch (stored) {
    }

    options.storage.version = actual;
    browser.storage.local.set(options.storage).then(() => {
        console.warn(`Storage updated from ${stored} to ${actual} version`);
        browser.runtime.openOptionsPage();
    });
}).catch((e) => {
    console.error(e);
});
