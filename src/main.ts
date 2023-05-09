import { Command } from "commander";
import fs from "fs";
import yaml from "js-yaml";
import prettier from "prettier";
import { serviceTemplate } from "./service.template";
import prettierConfig from "./prettier.config";
import { interfaceTemplate } from "./interface.template";
import path from "path";

const program = new Command();
program
  .command("generate <filename>")
  .description("Generate JavaScript file with console log")
  .action((filename: string) => {
    const code = "console.log('Hello, World!');";
    fs.writeFile(`${filename}.js`, code, (err) => {
      if (err) throw err;
      console.log(`${filename}.js created successfully!`);
    });
  });

program
  .command("read <filename>")
  .option("-r --rootdir <path>", "File YML directory path", "./")
  .option("-o --outdir <path>", "Output directory path", "./")
  .description("Read YAML file")
  .action((filename: string, options) => {
    try {
      const fileContents = fs.readFileSync(
        path.join(options.rootdir, filename),
        "utf8"
      );
      const data: any = yaml.load(fileContents);
      const code = serviceTemplate(
        data.service_name,
        data.base_url,
        data.methods
      );
      data.interfaces.forEach((i: any) => {
        const _interface = interfaceTemplate(i.name, i.properties);
        const formattedCode = prettier.format(_interface, prettierConfig);
        fs.writeFile(
          path.join(options.outdir, `${i.name}.ts`),
          formattedCode,
          (err) => {
            if (err) throw err;
            console.log(`${i.name}.ts created successfully!`);
          }
        );
      });
      const formattedCode = prettier.format(code, prettierConfig);
      fs.writeFile(
        path.join(options.outdir, `${data.service_name}Service.ts`),
        formattedCode,
        (err) => {
          if (err) throw err;
          console.log(`${data.service_name}Service.ts created successfully!`);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
