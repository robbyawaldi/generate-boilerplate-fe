import { isNonPrimitiveType } from "./non-primitive-types";

export function interfaceTemplate(
  name: string,
  properties: { name: string; type: string }[]
) {
  const importTypes = [...new Set(properties.flatMap((p) => p.type))].filter(
    (t) => t !== "" && t !== name && isNonPrimitiveType(t)
  );
  return `
  ${importTypes.map((t) => `import {${t}} from "./${t}"`).join(";")}

  export interface ${name} {
    ${properties.map((p) => `${p.name}?: ${p.type}`).join(";")}
  }`;
}
