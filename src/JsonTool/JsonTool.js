/**
 * @author zhangpeng
 * @date 16/7/25-下午5:55
 * @file json
 */

// node modules
import extend from 'extend';

// our modules
import JsonDiffPatcher from './JsonDiffPatcher';

const deepCopy = (obj) => extend(true, {}, obj);

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
const patchPage = ({template, page, patch}) => {
    const templateA = JsonDiffPatcher.unpatch(deepCopy(page), patch);
    const patchA = JsonDiffPatcher.diff(templateA, template);

    let result = deepCopy(page);
    if (patchA) {
        result = JsonDiffPatcher.patch(result, patchA);
    }

    return result;
};

export default {
    deepCopy,

    diff: JsonDiffPatcher.diff.bind(JsonDiffPatcher),
    patchPage
};
