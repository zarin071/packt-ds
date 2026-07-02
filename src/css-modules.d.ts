/**
 * Ambient module declarations so TypeScript can resolve stylesheet imports.
 * `*.module.css` files return a class-name map; plain `*.css` are side-effect imports.
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';
