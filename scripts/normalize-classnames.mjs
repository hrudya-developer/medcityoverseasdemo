import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");
const EXTENSIONS = new Set([".js", ".jsx"]);

const collapseWhitespace = (value) =>
  value.replace(/\s+/g, " ").trim();

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
};

const ensureCnImport = (source) => {
  if (source.includes('from "@/lib/cn"') || source.includes("from '@/lib/cn'")) {
    return source;
  }

  const importMatch = source.match(
    /^import .+?;\s*$/m
  );

  const importLine = 'import cn from "@/lib/cn";\n';

  if (importMatch) {
    return source.replace(importMatch[0], `${importMatch[0]}\n${importLine}`);
  }

  return `${importLine}\n${source}`;
};

const normalizeStaticString = (rawValue) => {
  const collapsed = collapseWhitespace(rawValue);

  if (!collapsed.includes('"') && !collapsed.includes("`")) {
    return `"${collapsed}"`;
  }

  if (!collapsed.includes("'")) {
    return `'${collapsed}'`;
  }

  return `"${collapsed.replace(/"/g, '\\"')}"`;
};

const normalizeFile = (filePath) => {
  let source = fs.readFileSync(filePath, "utf8");
  let changed = false;
  let needsCnImport = false;

  source = source.replace(
    /className=\{(`(?:\\.|[^`\\])*`)\}/gs,
    (match, templateLiteral) => {
      if (!/[\r\n]/.test(templateLiteral)) {
        return match;
      }

      if (templateLiteral.includes("${")) {
        changed = true;
        needsCnImport = true;
        return `className={cn(${templateLiteral})}`;
      }

      const innerValue = templateLiteral.slice(1, -1);
      changed = true;
      return `className=${normalizeStaticString(innerValue)}`;
    }
  );

  source = source.replace(
    /className=(["'])([\s\S]*?)\1/gs,
    (match, quote, rawValue) => {
      if (!/[\r\n]/.test(rawValue)) {
        return match;
      }

      changed = true;
      return `className=${normalizeStaticString(rawValue)}`;
    }
  );

  if (needsCnImport) {
    source = ensureCnImport(source);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, source, "utf8");
  }

  return changed;
};

const changedFiles = walk(ROOT)
  .map((filePath) => {
    const changed = normalizeFile(filePath);
    return changed ? filePath : null;
  })
  .filter(Boolean);

console.log(`Normalized className values in ${changedFiles.length} files.`);

for (const filePath of changedFiles) {
  console.log(`- ${path.relative(process.cwd(), filePath)}`);
}
