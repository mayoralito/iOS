
duckduckgoTimer.mark("cache.js IN")

var duckduckgoCache = function() {

	function cache(name, data) {
		try {
			webkit.messageHandlers.cacheMessage.postMessage({
				name: name, 
				data: data
			});
		} catch(error) {
			// webkit might not be defined
		}
	}

	return {

		cache: cache

	}
}()

duckduckgoTimer.mark("cache.js OUT")
