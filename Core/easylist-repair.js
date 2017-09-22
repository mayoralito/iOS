
duckduckgoTimer.mark("easylist-repair.js IN")

duckduckgoBlockerData.easylist = ${easylist_json}
duckduckgoBlockerData.easylistPrivacy = ${easylist_privacy_json}


function duckduckgoEasylistRepair(parserData) {
	parserData.bloomFilter = new BloomFilterModule.BloomFilter(parserData.bloomFilter)
	parserData.exceptionBloomFilter = new BloomFilterModule.BloomFilter(parserData.exceptionFilter)
}

duckduckgoEasylistRepair(duckduckgoBlockerData.easylist)
duckduckgoTimer.mark("easylist-repair.js easlist repaired")

duckduckgoEasylistRepair(duckduckgoBlockerData.easylistPrivacy)
duckduckgoTimer.mark("easylist-repair.js easlist privacy repaired")


duckduckgoTimer.mark("easylist-repair.js OUT")
