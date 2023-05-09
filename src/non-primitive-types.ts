export function isNonPrimitiveType(typeName: string): boolean {
  const primitiveTypes = [
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol",
    "undefined",
    "null",
  ];

  return !primitiveTypes.includes(typeName);
}
