import { join } from "path";
import { readFile } from "fs-extra";

const domainsDirectory = join(__dirname, "..", "swot", "lib", "domains");

export const isBlackListed = async (email: string) => {
  const blacklist = (await readFile(join(domainsDirectory, "blacklist.txt")))
    .toString()
    .split("\n");
  let isBlackListed = false;
  blacklist.forEach(
    domain => (isBlackListed = isBlackListed || email.endsWith(domain))
  );
  return isBlackListed;
};

isBlackListed("anandchowdhary@gmail.com").then(blacklisted => {
  console.log("Is blacklisted?", blacklisted);
});
