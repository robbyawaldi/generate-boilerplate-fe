import { isNonPrimitiveType } from "./non-primitive-types";

type Response = {
  type: string;
  properties: Object;
};

type Request = {
  type: string;
  properties: { name: string; type: string }[];
};

function capitalizeFirstLetter(method: string) {
  return method[0].toUpperCase() + method.slice(1).toLowerCase();
}

function methodTemplate(
  name: string,
  endpoint: string,
  method: string,
  response?: Response,
  request?: Request
) {
  const responseType = response?.type || "unknown";
  const requestType =
    request?.type || request?.properties
      ? `{${request.properties.map((p) => `${p.name}: ${p.type}`).join(",")}}`
      : null;
  return `
    @${capitalizeFirstLetter(method)}("${endpoint}")
    ${name}(${requestType ? `_:${requestType}` : ""}) {
      return response<${responseType}>();
    }
  `;
}

export function serviceTemplate(
  service_name: string,
  base_url: string,
  methods: {
    name: string;
    endpoint: string;
    method: string;
    response?: Response;
    request?: Request;
  }[]
) {
  const importTypes = [
    ...new Set(
      methods.flatMap((m) => [m.request?.type ?? "", m.response?.type ?? ""])
    ),
  ].filter((t) => t !== "" && isNonPrimitiveType(t));

  return `
    import {
        Service,
        response,
        ${methods.map((m) => capitalizeFirstLetter(m.method)).join(",")}
    } from "@pt-neural-technologies-indonesia/service-api-fe";
    ${importTypes.map((t) => `import {${t}} from "./${t}"`).join(";")}

    @Service("${base_url}")
    export class ${service_name}Service {
      ${methods
        .map((m) =>
          methodTemplate(m.name, m.endpoint, m.method, m?.response, m?.request)
        )
        .join("\n")}
    }
    `;
}
