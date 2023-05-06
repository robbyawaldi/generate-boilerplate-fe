import { program } from "commander";
import fs from "fs";
import yaml from "js-yaml";

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
  .description("Read YAML file")
  .action((filename: string) => {
    try {
      if (filename.match(/^[^\.\/]/g)) {
        filename = `./${filename}`;
      }
      const fileContents = fs.readFileSync(filename, "utf8");
      const data = yaml.load(fileContents);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  });

program.parse(process.argv);
