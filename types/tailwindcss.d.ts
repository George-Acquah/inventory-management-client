declare module "tailwindcss/lib/util/flattenColorPalette" {
  interface Color {
    [key: string]:any; // Support nested colors
  }

  const flattenColorPalette: (colors: Color) => Record<string, string>;

  export default flattenColorPalette;
}
