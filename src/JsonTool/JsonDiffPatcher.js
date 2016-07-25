/**
 * @author zhangpeng
 * @date 16/7/25-下午8:13
 * @file JsonDiffPatcher
 */

import jsondiffpatch from 'jsondiffpatch';
export default jsondiffpatch.create({
    objectHash: (obj) => (obj.id || JSON.stringify(obj))
});
