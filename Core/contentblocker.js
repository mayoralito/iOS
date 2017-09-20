//
//  contentblocker.js
//  DuckDuckGo
//
//  Copyright © 2017 DuckDuckGo. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

duckduckgoTimer.mark("contentblocker.js IN")

var duckduckgoContentBlocking = function() {

	// private
	function handleDetection(event, parent, detectionMethod) {
		var blocked = block(event)

		try {
			webkit.messageHandlers.trackerDetectedMessage.postMessage({
				url: event.url,
				parentDomain: parent,
				blocked: blocked,
				method: detectionMethod
			});
		} catch(error) {
			// webkit might not be defined
		}
	}

	// private
	function toURL(url, protocol) {
		try {
			return new URL(url.startsWith("//") ? protocol + url : url)
		} catch(error) {
			return null
		}
	}

	// private 
	function getTopLevelURL() {
		return new URL(top.location.href)
	}

	// private
	function disconnectMeMatch(event) {
		var topLevelUrl = getTopLevelURL()
		var url = toURL(event.url, topLevelUrl.protocol)
		if (!url) {
			return
		}

		var parent = DisconnectMe.parentTracker(url, topLevelUrl)
		if (parent) {
			handleDetection(event, parent, "disconnectme")
			return true
		}		

		return false
	}

	// private
	function currentDomainIsWhitelisted() {
		return duckduckgoBlockerData.whitelist[getTopLevelURL().host]
	}

	// private
	function block(event) {
		if (!duckduckgoBlockerData.blockingEnabled) {
			return false
		}

		if (currentDomainIsWhitelisted()) {
			return false
		}

		if (isFirstParty(event)) {
			return false
		}

		event.preventDefault()
		event.stopPropagation()
		return true
	}

	// from https://stackoverflow.com/a/7616484/73479
	// private 
	function hashCode(string) {
		var hash = 0, i, chr;
		if (string.length === 0) return hash;
  		for (i = 0; i < string.length; i++) {
    		chr   = string.charCodeAt(i);
    		hash  = ((hash << 5) - hash) + chr;
    		hash |= 0; 
  		}
  		return hash;
	}

	// private
	function getStatus(url) {
		return statuses[hashCode(event.url)]
	}

	// private
	function domainsMatch(url1, url2) {
		return duckduckgoTLDParser.extractDomain(url1) == duckduckgoTLDParser.extractDomain(url2)
	}

	// private
	function isDuckDuckGo(url) {
		return url.hostname.endsWith("duckduckgo.com")
	}

	// private
	function isFirstParty(event) {
		var topLevelUrl = getTopLevelURL()	
		var url = toURL(event.url, topLevelUrl.protocol)
		if (url != null && domainsMatch(url, topLevelUrl)) {
			return true
		} 

		return false
	}

	function checkEasylist(event, easylist, name) {
		var config = {
			domain: document.location.hostname,
			elementTypeMaskMap: ABPFilterParser.elementTypeMaskMap
		}

		if (ABPFilterParser.matches(easylist, event.url, config)) {
			handleDetection(event, null, name)
			return true
		}

		return false
	}

	// private
	function easylistPrivacyMatch(event) {
//		duckduckgoTimer.mark("easylistPrivacyMatch IN, " + event.url)			
		var result = checkEasylist(event, duckduckgoBlockerData.easylistPrivacy, "easylist-privacy")
//		duckduckgoTimer.mark("easylistPrivacyMatch OUT, " + result + ": " + event.url)			
		return result
	}

	// private
	function easylistMatch(event) {
//		duckduckgoTimer.mark("easylistMatch IN, " + event.url)			
		var result = checkEasylist(event, duckduckgoBlockerData.easylist, "easylist")
//		duckduckgoTimer.mark("easylistMatch OUT, " + result + ": " + event.url)			
		return result
	}

	// public
	function install(document) {
		document.addEventListener("beforeload", function(event) {
			duckduckgoTimer.mark("beforeload IN, " + event.url)			

			if (!event.url.startsWith("//") && (event.url.startsWith("/") || isFirstParty(event))) {
				duckduckgoTimer.mark("beforeload OUT, skipped " + event.url)
				return
			}

			var detected = disconnectMeMatch(event) || easylistPrivacyMatch(event) || easylistMatch(event)
			duckduckgoTimer.mark("beforeload OUT, detected? " + detected + ": " + event.url)			
		}, true)
	}

	return { 
		install: install
	}
}()

duckduckgoContentBlocking.install(document)

duckduckgoTimer.mark("contentblocker.js OUT")
