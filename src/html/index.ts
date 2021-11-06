import path from 'path';

import {
    getExportCode, getImportCode, getModuleCode, processHtml, srcsetType, srcType,
} from './html-loader-adapter';

const sources: SourcesHandlersMap = new Map([
    [
        'audio',
        new Map([
            [
                'src',
                {
                    type: srcType,
                },
            ],
        ]),
    ],
    [
        'img',
        new Map([
            [
                'src',
                {
                    type: srcType,
                },
            ],
            [
                'srcset',
                {
                    type: srcsetType,
                },
            ],
        ]),
    ],
    [
        'video',
        new Map([
            [
                'poster',
                {
                    type: srcType,
                },
            ],
            [
                'src',
                {
                    type: srcType,
                },
            ],
        ]),
    ],
    // SVG
    [
        'image',
        new Map([
            [
                'xlink:href',
                {
                    type: srcType,
                },
            ],
            [
                'href',
                {
                    type: srcType,
                },
            ],
        ]),
    ],
]);

export function prepareHtml(html: string, id: string) {
    const context = path.dirname(id);

    const imports: Import[] = [];
    const replacements: Replacement[] = [];
    const errors: unknown[] = [];

    const processedHtml = processHtml(html, sources, context, imports, errors, replacements);

    const importCode = getImportCode(processedHtml, context, imports);
    const moduleCode = getModuleCode(processedHtml, replacements);
    const exportCode = getExportCode(processedHtml, { esModule: true });

    return `${importCode}${moduleCode}${exportCode}`;
}
