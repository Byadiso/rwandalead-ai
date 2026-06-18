from playwright.sync_api import sync_playwright
import time


def scrape_google_maps(
    city: str,
    niche: str,
    max_results: int = 20
):

    search_query = f"{niche} in {city}"

    leads = []

    with sync_playwright() as p:

        browser = p.chromium.launch(
            headless=True
        )

        page = browser.new_page()

        page.goto(
            f"https://www.google.com/maps/search/{search_query.replace(' ', '+')}"
        )

        time.sleep(5)

        try:

            page.wait_for_selector(
                "a.hfpxzc",
                timeout=10000
            )

        except:

            browser.close()

            return []

        listings = page.locator(
            "a.hfpxzc"
        ).all()

        for listing in listings[:max_results]:

            try:

                listing.click()

                page.wait_for_timeout(3000)

                name = page.locator(
                    "h1.DUwDvf"
                ).first.text_content()

                rating = None

                review_count = 0

                try:

                    rating_element = page.locator(
                        'div.F7nice span[aria-hidden="true"]'
                    ).first

                    rating_text = rating_element.text_content()

                    rating = float(
                        rating_text.replace(",", ".")
                    )

                except:
                    pass

                try:

                    review_element = page.locator(
                        'div.F7nice span[aria-label*="reviews"]'
                    ).first

                    review_text = review_element.text_content()

                    review_count = int(
                        review_text.replace("(", "")
                        .replace(")", "")
                        .replace(",", "")
                    )

                except:
                    pass

                website = None

                try:

                    website = page.locator(
                        'a[data-item-id="authority"]'
                    ).first.get_attribute(
                        "href"
                    )

                except:
                    pass

                phone = None

                try:

                    phone = page.locator(
                        'button[data-tooltip="Copy phone number"]'
                    ).first.inner_text()

                except:
                    pass

                leads.append({

                    "business_name": name,

                    "city": city,

                    "website": website,

                    "phone": phone,

                    "rating": rating,

                    "review_count": review_count

                })

            except:
                continue

        browser.close()

    return leads