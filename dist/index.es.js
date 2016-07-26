import extend from 'extend';
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import jsondiffpatch from 'jsondiffpatch';

var JsonDiffPatcher = jsondiffpatch.create({
  objectHash: function objectHash(obj) {
    return obj.id || _JSON$stringify(obj);
  }
});

var deepCopy = function deepCopy(obj) {
    return extend(true, {}, obj);
};

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

    var templateA = JsonDiffPatcher.unpatch(deepCopy(page), patch);
    var patchA = JsonDiffPatcher.diff(templateA, template);

    var result = deepCopy(page);
    if (patchA) {
        result = JsonDiffPatcher.patch(result, patchA);
    }

    return result;
};

var JsonTool = {
    deepCopy: deepCopy,

    diff: JsonDiffPatcher.diff.bind(JsonDiffPatcher),
    patchPage: patchPage
};

var main = {
  JsonTool: JsonTool
};

export default main;
//# sourceMappingURL=index.es.js.map
