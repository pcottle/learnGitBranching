import time

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BasePage:
    COMMAND_INPUT = (By.ID, "commandTextField")
    COMMAND_DISPLAY = (By.ID, "commandDisplay")
    PASSED_TASK = (By.ID, "passedtask")
    LEVEL_TOOLBAR = (By.ID, "levelToolbarMount")

    def __init__(self, driver, base_url):
        self.driver = driver
        self.base_url = base_url
        self.wait = WebDriverWait(driver, 10)

    def open(self):
        self.driver.get(self.base_url)
        self.wait.until(
            EC.presence_of_element_located(self.COMMAND_INPUT)
        )

    def enter_command(self, command: str, delay: float = 1.0):
        text_field = self.driver.find_element(*self.COMMAND_INPUT)
        text_field.clear()
        text_field.send_keys(command)
        text_field.send_keys(Keys.RETURN)
        time.sleep(delay)

    def enter_commands(self, commands: list[str], delay: float = 1.0):
        for cmd in commands:
            self.enter_command(cmd, delay=delay)

    def enter_solution(self, solution: str, delay: float = 1.0):
        parts = [c.strip() for c in solution.split(";") if c.strip()]
        self.enter_commands(parts, delay=delay)

    def get_terminal_output(self) -> str:
        return self.driver.find_element(*self.COMMAND_DISPLAY).text

    def is_level_solved(self) -> bool:
        output = self.get_terminal_output().lower()
        if "level solved" in output:
            return True
        passed = self.driver.find_element(*self.PASSED_TASK)
        return passed.is_displayed()

    def wait_for_level_solved(self, timeout: int = 30) -> bool:
        try:
            wait = WebDriverWait(self.driver, timeout)
            wait.until(lambda d: self.is_level_solved())
            return True
        except Exception:
            return False

    def dismiss_dialog(self):
        try:
            next_btn = self.driver.find_element(
                By.CSS_SELECTOR, ".icon-circle-arrow-right"
            )
            next_btn.click()
            time.sleep(0.5)
        except Exception:
            pass
        try:
            ok_btn = self.driver.find_element(By.CSS_SELECTOR, ".icon-ok")
            ok_btn.click()
            time.sleep(0.5)
        except Exception:
            pass

    def dismiss_all_dialogs(self, max_attempts: int = 10):
        for _ in range(max_attempts):
            try:
                btn = self.driver.find_element(
                    By.CSS_SELECTOR, ".icon-circle-arrow-right, .icon-ok, .icon-signout"
                )
                btn.click()
                time.sleep(0.5)
            except Exception:
                break

    def open_level(self, level_id: str):
        self.enter_command(f"level {level_id}", delay=2.0)
        self.dismiss_all_dialogs()

    def reset_level(self):
        self.enter_command("reset", delay=1.5)