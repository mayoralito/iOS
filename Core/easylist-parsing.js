
duckduckgoTimer.mark("easylist-parsing.js IN")

try {

    ABPFilterParser.parse(`${easylist_privacy}`, duckduckgoBlockerData.easylistPrivacy)
    duckduckgoTimer.mark("easylist-parsing.js easylist privacy parsed")
    duckduckgoCache.cache("easylist_privacy", JSON.stringify(duckduckgoBlockerData.easylistPrivacy))

    ABPFilterParser.parse(`${easylist_general}`, duckduckgoBlockerData.easylist)
    duckduckgoTimer.mark("easylist-parsing.js easylist general parsed")
    duckduckgoCache.cache("easylist", JSON.stringify(duckduckgoBlockerData.easylist))

} catch (error) {
    // no-op
}

duckduckgoTimer.mark("easylist-parsing.js OUT")
