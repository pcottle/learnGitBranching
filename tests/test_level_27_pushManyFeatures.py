LEVEL_ID = "remoteAdvanced/pushManyFeatures"
SOLUTION = (
    "git fetch; "
    "git rebase o/main side1; "
    "git rebase side1 side2; "
    "git rebase side2 side3; "
    "git rebase side3 main; "
    "git push"
)


class TestLevel27PushManyFeatures:
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

    def test_simple_push_not_solved(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git push")
        assert not git_page.is_level_solved()

    def test_invalid_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git invalidcommand123")
        assert git_page.has_error_output()

    def test_reset_after_progress(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git fetch")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()