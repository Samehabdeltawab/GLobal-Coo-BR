const { test, expect } = require("@playwright/test");
const { createBug, linkBugToTestCase } = require("./utils/azureDevOps");

test("business logic test", async ({ page }) => {
  const testCaseId = 12345; // Azure DevOps Test Case ID

  try {
    await page.goto("https://your-app.com");
    await page.fill("#username", "admin");
    await page.fill("#password", "wrongpassword");
    await page.click("text=Login");

    const errorMessage = await page.textContent(".error");
    expect(errorMessage).toBe("Invalid credentials");

  } catch (error) {
    const isFunctionalError =
      !error.message.includes("Timeout") &&
      !error.message.includes("not found") &&
      !error.message.includes("waiting for selector");

    if (isFunctionalError) {
      const title = `Test Failed: Login with invalid credentials`;
      const description = `The test case ${testCaseId} failed due to functional/system issue.\n\nError:\n${error.message}`;

      const bug = await createBug(title, description);
      await linkBugToTestCase(bug.id, testCaseId);
    }

    throw error; // rethrow to mark test as failed
  }
});