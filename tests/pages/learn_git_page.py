from selenium.webdriver.common.by import By

from .base_page import BasePage


class LearnGitPage(BasePage):
    def has_hint_output(self) -> bool:
        output = self.get_terminal_output().lower()
        return "hint" in output or "no hint" in output or "подсказк" in output

    def has_goal_window(self) -> bool:
        try:
            goal = self.driver.find_element(By.CSS_SELECTOR, ".goalVis, [class*=goal]")
            return goal.is_displayed()
        except Exception:
            return False

    def has_error_output(self) -> bool:
        output = self.get_terminal_output().lower()
        keywords = ["error", "fatal", "invalid", "не является", "отклонено", "rejected"]
        return any(kw in output for kw in keywords)

    def has_disabled_command_error(self, command: str) -> bool:
        output = self.get_terminal_output().lower()
        return "disabled" in output or "запрещ" in output or f"{command}" in output