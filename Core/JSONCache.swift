//
//  JSONCache.swift
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

import Foundation

// in-memory cache for now
public class JSONCache {

    public static let shared = JSONCache()

    private var cache = [String: String]()

    private init() {
    }

    public func put(name: String, json: String) {
        cache[name] = json
    }

    public func get(name: String) -> String? {
        return cache[name]
    }

}
