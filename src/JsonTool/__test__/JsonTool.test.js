/**
 * @author zhangpeng
 * @date 16/7/25-下午5:51
 * @file main.test
 */

import {expect} from 'chai';

import JsonTool from '../JsonTool';

describe('Web Generator工具测试', () => {
    const block1 = {
        id: 1,
        type: 'list-with-image',
        data: {
            items: [
                {
                    title: 'this is title of block 1'
                }
            ]
        }
    };

    const block2 = {
        id: 2,
        type: 'list-with-image',
        data: {
            items: [
                {
                    title: 'this is title of block 2'
                }
            ]
        }
    };

    const templateA = {
        theme: 'templateA',
        blocks: [block1, block2]
    };

    const template = {
        theme: 'template',
        blocks: [block2, block1]
    };

    const page = {
        theme: 'page',
        blocks: [block1, {
            ...block2,
            data: {
                items: [
                    {
                        title: 'this is title of page!'
                    }
                ]
            }
        }]
    };

    const expectedPage = {
        theme: template.theme,
        blocks: [page.blocks[1], page.blocks[0]]
    };

    const patch = JsonTool.diff(templateA, page);

    it('当template没有变化时，应该返回原始页面', () => {
        expect(JsonTool.patchPage({template: templateA, page, patch})).to.deep.equal(page);
    });

    it('当template发生变化时，正确的对页面进行patch', () => {
        expect(JsonTool.patchPage({template, page, patch})).to.deep.equal(expectedPage);
    });
});
