import asciidoctor, { Asciidoctor } from 'asciidoctor';
import path from 'path';
import { Plugin } from 'vite';

import { prepareHtml } from './html';

export type AsciidocPluginOptions = Omit<Asciidoctor.ProcessorOptions, 'base_dir' | 'parse' | 'to_dir' | 'to_file'>;

export function createAsciidocPlugin(options?: AsciidocPluginOptions): Plugin {
    const adoc = asciidoctor();

    return {
        name: 'adoc',
        transform(code, id) {
            const extension = path.extname(id);

            if (extension !== '.adoc') {
                return undefined;
            }

            const html = adoc.convert(code, {
                base_dir: path.dirname(id),
                ...options,
            }) as string;
            const htmlAsJs = prepareHtml(html, id);

            const document = adoc.loadFile(id);
            const additional = `export const attributes = ${JSON.stringify(document.getAttributes())}`;

            return `${htmlAsJs}\n${additional}`;
        },
    };
}
