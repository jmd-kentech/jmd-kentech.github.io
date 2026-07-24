const { test, expect } = require("@playwright/test");
const { preparePage, stabilizeVisuals } = require("./helpers");

// This site deleted al-folio's upstream demo content (projects, teaching,
// repositories page, and the blog demo posts for tables/photo-gallery/
// sidebar-table-of-contents) when it was customized for this lab, and has
// search_enabled: false. Tests that depended on that content/config were
// removed or adjusted rather than kept red against a site that will never
// have it — including pagination, which only renders past 1 page and this
// lab's post count won't realistically cross that for a long while. The
// distill demo post is still exercised (by distill.spec.js) via a fixture
// staged in playwright.config.js's webServer command.

test("publications Abs toggle opens and closes", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const absButton = page.getByRole("button", { name: "Abs" }).first();
  test.skip((await absButton.count()) === 0, "no bib entry in this site has an abstract field set");
  await expect(absButton).toBeVisible();

  const panel = page.locator(".abstract.hidden").first();
  await absButton.click();
  await expect(panel).toHaveClass(/open/);

  await absButton.click();
  await expect(panel).not.toHaveClass(/open/);
});

test("publication popover works without bootstrap compat runtime", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const popoverTrigger = page.locator('[data-toggle="popover"]').first();
  test.skip((await popoverTrigger.count()) === 0, "no popover trigger found in fixture data");

  await popoverTrigger.hover();
  await expect(page.locator(".af-popover")).toBeVisible();
});

test("mobile navbar can expand/collapse", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only navigation behavior");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });

  const toggle = page.locator(".navbar-toggler").first();
  await expect(toggle).toBeVisible();

  const nav = page.locator(".navbar-collapse").first();
  await toggle.click();
  await expect(nav).toHaveClass(/show/);

  await toggle.click();
  await expect(nav).not.toHaveClass(/show/);
});

test("navbar menu stays right-aligned on desktop pages", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "desktop-only alignment contract");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const alignment = await page.evaluate(() => {
    const container = document.querySelector("#navbar .container");
    const menu = document.querySelector("#navbarNav .navbar-menu-list");
    if (!container || !menu) {
      return null;
    }
    const containerBox = container.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    return {
      containerRight: containerBox.right,
      menuRight: menuBox.right,
    };
  });

  expect(alignment).not.toBeNull();
  expect(Math.abs(alignment.menuRight - alignment.containerRight)).toBeLessThanOrEqual(24);
});

test("navbar search button opens modal and toggle buttons use pointer cursor", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "navbar search/theme controls are collapsed under mobile menu");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const searchToggle = page.locator("#search-toggle");
  if ((await searchToggle.count()) > 0) {
    await page.evaluate(() => {
      const ninjaKeys = document.querySelector("ninja-keys");
      if (!ninjaKeys || typeof ninjaKeys.open !== "function") {
        return;
      }
      ninjaKeys.__openCalled = false;
      const originalOpen = ninjaKeys.open.bind(ninjaKeys);
      ninjaKeys.open = () => {
        ninjaKeys.__openCalled = true;
        return originalOpen();
      };
    });

    await searchToggle.click();
    const modalOpened = await page.evaluate(() => Boolean(document.querySelector("ninja-keys")?.__openCalled));
    expect(modalOpened).toBeTruthy();

    const searchCursor = await searchToggle.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(searchCursor).toBe("pointer");
  }

  const themeCursor = await page.locator("#light-toggle").evaluate((el) => window.getComputedStyle(el).cursor);
  expect(themeCursor).toBe("pointer");
});

test("core pages no longer emit jQuery-style runtime errors", async ({ page }) => {
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      failures.push(message.text());
    }
  });

  await preparePage(page, "light");
  const pages = ["/al-folio/", "/al-folio/publications/", "/al-folio/posts/", "/al-folio/members/"];

  for (const target of pages) {
    await page.goto(target, { waitUntil: "networkidle" });
    await stabilizeVisuals(page);
  }

  const jqueryFailures = failures.filter((message) => /\$\s*is not defined|lightbox/i.test(message));
  expect(jqueryFailures).toEqual([]);
});
