import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "out";
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".xml"]);
const conflictMarker = /^(<<<<<<<|=======|>>>>>>>)/m;
const staticReference = /\/_next\/static\/[^\s"'()<>\\]+/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }

  return files;
}

function extension(path) {
  const index = path.lastIndexOf(".");
  return index === -1 ? "" : path.slice(index).toLowerCase();
}

await stat(outputDirectory).catch(() => {
  throw new Error(`Diretório ${outputDirectory} não encontrado. Execute npm run build.`);
});

const files = await walk(outputDirectory);
const existingFiles = new Set(files.map((path) => path.replaceAll("\\", "/")));
const conflicts = [];
const missingReferences = new Map();

for (const file of files) {
  if (!textExtensions.has(extension(file))) continue;

  const contents = await readFile(file, "utf8");
  if (conflictMarker.test(contents)) conflicts.push(file);

  for (const reference of contents.match(staticReference) ?? []) {
    const cleanReference = reference.split(/[?#]/, 1)[0];
    const target = `${outputDirectory}${cleanReference}`;
    if (!existingFiles.has(target)) {
      const sources = missingReferences.get(cleanReference) ?? [];
      sources.push(file);
      missingReferences.set(cleanReference, sources);
    }
  }
}

if (conflicts.length > 0 || missingReferences.size > 0) {
  if (conflicts.length > 0) {
    console.error("Conflitos Git encontrados na exportação:");
    for (const file of conflicts) console.error(`- ${file}`);
  }

  if (missingReferences.size > 0) {
    console.error("Referências a arquivos estáticos ausentes:");
    for (const [reference, sources] of missingReferences) {
      console.error(`- ${reference} (referenciado por ${sources[0]})`);
    }
  }

  process.exitCode = 1;
} else {
  console.log(`Exportação estática válida: ${files.length} arquivos verificados.`);
}
