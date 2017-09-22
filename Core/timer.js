
var duckduckgoTimer = function() {

	function mark(message) {
		console.log(message)
		try {
			webkit.messageHandlers.timerMessage.postMessage(message);
		} catch(error) {
			// webkit might not be defined
		}
	}

	return {

		mark: mark

	}
}()

duckduckgoTimer.mark("timer.js initialised")
