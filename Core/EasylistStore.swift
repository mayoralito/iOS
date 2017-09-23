//
//  EasylistStore.swift
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

class EasylistStore {

    enum Easylist: String {

        case easylist
        case easylistPrivacy

    }

    var hasData: Bool {
        return easylist != "" && easylistPrivacy != ""
    }

    private(set) var easylist: String = ""
    private(set) var easylistPrivacy: String = ""

    public init() {
        easylist = load(.easylist) ?? ""
        easylistPrivacy = load(.easylistPrivacy) ?? ""
    }

    func load(_ type: Easylist) -> String? {
        guard let data = try? Data(contentsOf: persistenceLocation(type: type)) else {
            return nil
        }
        return String(data: data, encoding: .utf8)?.replacingOccurrences(of: "\\", with: "\\\\").replacingOccurrences(of: "`", with: "\\`")
    }

    func persistEasylist(data: Data) {
        try? data.write(to: persistenceLocation(type: .easylist), options: .atomic)
        easylist = load(.easylist) ?? ""
    }

    func persistEasylistPrivacy(data: Data) {
        try? data.write(to: persistenceLocation(type: .easylistPrivacy), options: .atomic)
        easylistPrivacy = load(.easylistPrivacy) ?? ""
    }

    private func persistenceLocation(type: Easylist) -> URL {
        let path = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: ContentBlockerStoreConstants.groupName)
        return path!.appendingPathComponent("\(type.rawValue).txt")
    }

}
