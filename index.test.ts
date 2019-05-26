import { isBlackListed, isEducationalDomain } from "./";

test("check if email is blacklisted", async () => {
  expect(await isBlackListed("example@america.edu")).toBeTruthy();
});

test("check if domain is educational", async () => {
  expect(await isEducationalDomain("example@example.edu")).toBeTruthy();
});
