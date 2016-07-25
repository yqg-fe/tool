'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _JSON$stringify = _interopDefault(require('babel-runtime/core-js/json/stringify'));
var jsondiffpatch = _interopDefault(require('jsondiffpatch'));

var JsonDiffPatcher = jsondiffpatch.create({
  objectHash: function objectHash(obj) {
    return obj.id || _JSON$stringify(obj);
  }
});

/**
 * Web Generator工具
 * templateA ------ patch1 ----------> page
 *     |            |                |
 *  patchA ----- transform -----> super patchA
 *    |            |                |
 * template -- super patch1----> expected page
 *
 * 根据page和patch求出保存page时的template版本[templateA]
 * 根据templateA和template求出patchA
 * 因为page和templateA同构，故对page直接进行patchA得到预期的页面
 *
 * @param template 当前最新版本的template
 * @param page 上一次保存的page
 * @param patch 上一次保存page时，page跟当时版本template的diff
 */
var patchPage = function patchPage(_ref) {
    var template = _ref.template;
    var page = _ref.page;
    var patch = _ref.patch;

    var templateA = JsonDiffPatcher.unpatch(page, patch);
    var patchA = JsonDiffPatcher.diff(templateA, template);
    if (patchA) {
        page = JsonDiffPatcher.patch(page, patchA);
    }

    return page;
};

var JsonTool = {
    patchPage: patchPage
};

var main = {
  JsonTool: JsonTool
};

module.exports = main;
//# sourceMappingURL=index.js.map
