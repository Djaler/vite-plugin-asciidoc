interface Import {
    format: string;
    importName: string;
    request: string;
}

interface Replacement {
    runtime?: boolean;
    importName: string;
    replacementName: string;
    isValueQuoted: boolean;
    hash: boolean;
}

interface HandlerTypeOptions {
    value: string;
    attribute: string;
    tag: string;
    attributeStartOffset: number;
    attributeEndOffset: number;
    html: string;
    valueStartOffset: number;
}

interface HandlerTypeResult {
    value: string;
    startOffset: number;
    endOffset: number;
}

type HandlerType = (options: HandlerTypeOptions) => HandlerTypeResult[];

type SourcesHandlersMap = Map<string, Map<string, { type: HandlerType }>>;

declare module 'html-loader/dist/plugins/sources-plugin' {
    export default function sourcesPlugin(options: {
        sources: {
            list: SourcesHandlersMap,
        },
        context: string,
        imports: Import[];
        errors: unknown[];
        replacements: Replacement[];
    }): (html: string) => string;
}

declare module 'html-loader/dist/utils' {
    interface ExportOptions {
        esModule: boolean;
    }

    export function getExportCode(html: string, options: ExportOptions): string;

    export function getModuleCode(html: string, replacements: Replacement[]): string;

    export const srcsetType: HandlerType;
    export const srcType: HandlerType;
}
