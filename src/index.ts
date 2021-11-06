import asciidoctor from 'asciidoctor';
import path from 'path';
import { Plugin } from 'vite';

import { prepareHtml } from './html';

export default function adocPlugin(): Plugin {
    const adoc = asciidoctor();

    return {
        name: 'adoc',
        transform(code, id) {
            const extension = path.extname(id);

            if (extension !== '.adoc') {
                return undefined;
            }

            const html = adoc.convert(code) as string;

            return prepareHtml(html, id);
        },
    };
}
