/**
 * @author zhangpeng
 * @date 16/7/25-下午8:13
 * @file JsonDiffPatcher
 */

import jsondiffpatch from 'jsondiffpatch';
export default jsondiffpatch.create({
    objectHash: (obj) => (obj._id || JSON.stringify(obj))   // eslint-disable-line no-underscore-dangle
});
