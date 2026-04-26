import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from pages.learn_git_page import LearnGitPage


@pytest.fixture(scope="session")
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shim-usage")
    options.add_argument("--window-size=1280,900")
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options,
    )
    driver.implicitly_wait(3)
    yield driver
    driver.quit()


@pytest.fixture(scope="session")
def base_url():
    return "http://localhost:8002"


@pytest.fixture
def git_page(driver, base_url):
    page = LearnGitPage(driver, base_url)
    page.open()
    return page