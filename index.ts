import { join } from "path";
import { readFile } from "fs-extra";
import NodeCache from "node-cache";

const domainsDirectory = join(__dirname, "..", "swot", "lib", "domains");

const cache = new NodeCache();
const cachedReadFile = async (file: string) => {
  const key = `file_${file}`;
  const result: string | undefined = cache.get(key);
  if (result) return result;
  return (await readFile(file)).toString();
}

export const isBlackListed = async (email: string) => {
  const blacklist = (await cachedReadFile(join(domainsDirectory, "blacklist.txt"))).split("\n");
  let isBlackListed = false;
  blacklist.forEach(
    domain => (isBlackListed = isBlackListed || email.endsWith(domain))
  );
  return isBlackListed;
};

isBlackListed("anandchowdhary@gmail.com").then(blacklisted => {
  console.log("Is blacklisted?", blacklisted);
});
