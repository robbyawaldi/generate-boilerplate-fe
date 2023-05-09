import { isNonPrimitiveType } from "./non-primitive-types";

function methodTemplate(
  name: string,
  endpoint: string,
  method: string,
  response: string,
  request?: string
) {
  method = method[0].toUpperCase() + method.slice(1).toLowerCase();
  return `
    @${method}("${endpoint}")
    ${name}(${request ? `_:${request}` : ""}) {
      return response<${response}>();
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
    response: any;
    request: any;
  }[]
) {
  const importTypes = [
    ...new Set(methods.flatMap((m) => [m.request.type, m.response.type])),
  ].filter((t) => isNonPrimitiveType(t));

  return `
    import {
        Post,
        Service,
        response,
    } from "@pt-neural-technologies-indonesia/service-api-fe";
    ${importTypes.map((t) => `import {${t}} from "./${t}"`).join(";")}

    @Service("${base_url}")
    class ${service_name}Service {
      ${methods
        .map((m) =>
          methodTemplate(
            m.name,
            m.endpoint,
            m.method,
            m.response.type,
            m.request.type
          )
        )
        .join("\n")}
    }
    `;
}
