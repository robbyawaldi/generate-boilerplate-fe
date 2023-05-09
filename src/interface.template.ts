export function interfaceTemplate(
  name: string,
  properties: { name: string; type: string }[]
) {
  return `export interface I${name} {
    ${properties.map((p) => `${p.name}?: ${p.type}`).join(";")}
  }`;
}
