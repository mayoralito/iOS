//
//  blockerdata.js
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

duckduckgoTimer.mark("blockerdata.js IN")

var duckduckgoBlockerData = {

    blockingEnabled: ${blocking_enabled},
	disconnectme: ${disconnectme},
    whitelist: ${whitelist},
    easylist: {},
    easylistPrivacy: {}

}

try {

    ABPFilterParser.parse(function() {
        var encoded = "${easylist_privacy}"
        var easylistData = decodeURIComponent(encoded)
        return easylistData

    }(), duckduckgoBlockerData.easylistPrivacy)
    duckduckgoTimer.mark("blockerdata.js easylist privacy parsed")

    ABPFilterParser.parse(function() {
        var encoded = "${easylist_general}"
        var easylistData = decodeURIComponent(encoded)
        return easylistData
        
    }(), duckduckgoBlockerData.easylist)
    duckduckgoTimer.mark("blockerdata.js easylist general parsed")


} catch (error) {
    // no-op
}

duckduckgoTimer.mark("blockerdata.js OUT")