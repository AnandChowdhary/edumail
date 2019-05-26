import { join } from "path";
import { readFile } from "fs-extra";
import NodeCache from "node-cache";

const domainsDirectory = join(__filename, "..", "swot", "lib", "domains");

const cache = new NodeCache();
const cachedReadFile = async (file: string) => {
  const key = `file_${file}`;
  const result: string | undefined = cache.get(key);
  if (result) return result;
  return (await readFile(file)).toString();
};

export const isBlackListed = async (email: string) => {
  const blacklist = (await cachedReadFile(
    join(domainsDirectory, "blacklist.txt")
  )).split("\n");
  let isBlackListed = false;
  blacklist.forEach(
    domain =>
      (isBlackListed = isBlackListed || !!(domain && email.endsWith(domain)))
  );
  return isBlackListed;
};

export const isEducationalDomain = async (email: string) => {
  const educationalDomains = (await cachedReadFile(
    join(domainsDirectory, "tlds.txt")
  )).split("\n");
  let isEducationalDomain = false;
  educationalDomains.forEach(
    domain =>
      (isEducationalDomain =
        isEducationalDomain || !!(domain && email.endsWith(domain)))
  );
  return isEducationalDomain;
};
