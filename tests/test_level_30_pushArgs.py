LEVEL_ID = "remoteAdvanced/pushArgs"
SOLUTION = "git push origin main; git push origin foo"


class TestLevel30PushArgs:
    def test_solution_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_solution(SOLUTION)
        assert git_page.wait_for_level_solved(timeout=30)

    def test_hint_available(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("hint")
        assert git_page.has_hint_output()

    def test_show_goal(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("show goal")
        assert git_page.has_goal_window()

    def test_checkout_disabled(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git checkout main")
        output = git_page.get_terminal_output().lower()
        assert "disabled" in output or "запрещ" in output or "not allowed" in output

    def test_switch_disabled(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git switch main")
        output = git_page.get_terminal_output().lower()
        assert "disabled" in output or "запрещ" in output or "not allowed" in output

    def test_invalid_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git invalidcommand123")
        assert git_page.has_error_output()

    def test_reset_after_progress(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git push origin main")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()