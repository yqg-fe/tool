# Yqg Tool
Pure JavaScript Tools shared between projects.

# Install
```
npm install yqg-tool --save
```

# Usage
## JsonTool
```
var YqgTool = require('yqg-tool');
var JsonTool = YqgTool.JsonTool;

var objCopied = JsonTool.deepCopy(obj); // 深拷贝
var patch = JsonTool.diff(template, page);
var result = JsonTool.patchPage({page, patch, template});
```
