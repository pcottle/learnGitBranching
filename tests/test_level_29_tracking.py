LEVEL_ID = "remoteAdvanced/tracking"
SOLUTION = "git checkout -b side o/main; git commit; git pull --rebase; git push"


class TestLevel29Tracking:
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

    def test_alternative_tracking_method(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git checkout -b side o/main")
        git_page.enter_command("git branch -u o/main side")
        git_page.enter_command("git commit")
        git_page.enter_command("git pull --rebase")
        git_page.enter_command("git push")
        assert git_page.wait_for_level_solved(timeout=30)

    def test_invalid_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git invalidcommand123")
        assert git_page.has_error_output()

    def test_reset_after_progress(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git checkout -b side o/main")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()