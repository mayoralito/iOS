
import Foundation

public class PerfTimer {

    public static var shared = PerfTimer();

    private var timerStarted = Date()

    public func reset() {
        timerStarted = Date()
        Logger.log(text: "TIMER: reset")
    }

    public func mark(_ message: String, from: String) {
        let t = Date().timeIntervalSince(timerStarted)
        let text = String(format: "TIMER-%@\t%0.5f %@", arguments: [from, t, message])
        Logger.log(text: text)
    }

}
