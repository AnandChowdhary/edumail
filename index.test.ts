import { isBlackListed, isEducationalDomain, isEducational } from "./";

test("check if email is blacklisted", async () => {
  expect(await isBlackListed("example@america.edu")).toBeTruthy();
});

test("check if email is blacklisted", async () => {
  expect(await isBlackListed("example@scu.edu")).toBeFalsy();
});

test("check if domain is educational", async () => {
  expect(await isEducationalDomain("example@example.edu")).toBeTruthy();
});

test("check if domain is educational", async () => {
  expect(await isEducationalDomain("example@student.utwente.nl")).toBeFalsy();
});

test("check if email is educational", async () => {
  expect(await isEducational("example@student.utwente.nl")).toBeTruthy();
});

test("check if email is educational", async () => {
  expect(await isEducational("example@scu.edu")).toBeTruthy();
});

test("check if email is educational", async () => {
  expect(await isEducational("example@gmail.com")).toBeFalsy();
});

test("check if email is educational", async () => {
  try {
    await isEducational("invalid email");
  } catch (error) {
    expect(error).toBeDefined();
  }
});
