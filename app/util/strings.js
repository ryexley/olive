export function toPascalCase(source) {
  return source
    .split(/[-_]/)
    .map(
      word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`,
    )
    .join("")
}
