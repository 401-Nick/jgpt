"use strict";
class CustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
        this.tests = {};
    }
    onTestResult(test, testResult) {
        testResult.testResults.forEach(({ fullName, status }) => {
            if (!this.tests[fullName]) {
                this.tests[fullName] = { successCount: 0, totalCount: 0 };
            }
            this.tests[fullName].totalCount += 1;
            if (status === 'passed') {
                this.tests[fullName].successCount += 1;
            }
            this.tests[fullName].successRate =
                (this.tests[fullName].successCount / this.tests[fullName].totalCount) * 100;
        });
    }
    onRunComplete() {
        const fs = require('fs');
        fs.writeFileSync('./jestLogFile.txt', JSON.stringify(this.tests, null, 2));
    }
}
module.exports = CustomReporter;
