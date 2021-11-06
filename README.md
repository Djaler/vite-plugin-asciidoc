[![npm](https://img.shields.io/npm/v/vite-plugin-asciidoc?style=for-the-badge)](https://www.npmjs.com/package/vite-plugin-asciidoc)

# Vite Plugin for Asciidoc

> Vite plugin to import .adoc files as html

## Install

```sh
npm install -D vite-plugin-asciidoc
```

## Usage

In your vite configuration:

```javascript
import { createAsciidocPlugin } from 'vite-plugin-asciidoc';

export default {
    // ...
    plugins: [
        createAsciidocPlugin()
    ]
}
```

In your code:

```javascript
import help, { attributes } from './help.adoc';

console.log(help); // adoc file converted to html
console.log(attributes); // attributes of source adoc file
```

## Configuration

You can specify most of the options that comes
to [asciidoctor](https://docs.asciidoctor.org/asciidoctor.js/latest/processor/convert-options/). Few of them:

- `attributes` - Any number of built-in or user-defined attributes;
- `safe` - Safe mode (unsafe, safe, server or secure).

## Typescript

In TypeScript project you will need to declare typedefs for `.adoc` files:

```typescript
declare module '*.adoc' {
    const content: string;
    export default content;

    const attributes: Record<string, unknown>;
    export { attributes };
}
```

Save it as `shims-adoc.d.ts` for instance.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/djaler/vite-plugin-asciidoc.

## Thanks

Thanks to [html-loader](https://github.com/webpack-contrib/html-loader) for the html assets processing code.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
