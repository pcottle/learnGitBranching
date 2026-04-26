LEVEL_ID = "remote/lockedMain"
SOLUTION = "git reset --hard o/main; git checkout -b feature C2; git push origin feature"


class TestLevel26LockedMain:
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

    def test_push_to_main_rejected(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git push origin main")
        output = git_page.get_terminal_output().lower()
        assert "rejected" in output or "remote rejected" in output or "error" in output

    def test_invalid_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git invalidcommand123")
        assert git_page.has_error_output()

    def test_reset_after_progress(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git reset --hard o/main")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()