import { join } from "path";
import { readFile, remove } from "fs-extra";
import NodeCache from "node-cache";

const domainsDirectory = join(__dirname, "swot", "lib", "domains");

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

const hasFile = async (fileName: string) => {
  try {
    await readFile(fileName);
    return true;
  } catch (error) {}
  return false;
};

const removeAfter = (array: string[], val: string) => {
  const index = array.indexOf(val);
  array.splice(index + 1, array.length - (index + 1));
  return array;
};

export const isEducational = async (email: string) => {
  if ((await isEducationalDomain(email)) && !(await isBlackListed(email)))
    return true;
  const domain = email
    .split("@")[1]
    .split(".")
    .reverse();
  for await (const domainPart of domain) {
    const newArray = removeAfter([...domain], domainPart);
    newArray[newArray.length - 1] = `${newArray[newArray.length - 1]}.txt`;
    const has = await hasFile(join(domainsDirectory, ...newArray));
    if (has) return true;
  }
  return false;
};
