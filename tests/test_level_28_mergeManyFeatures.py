LEVEL_ID = "remoteAdvanced/mergeManyFeatures"
SOLUTION = (
    "git checkout main; "
    "git pull; "
    "git merge side1; "
    "git merge side2; "
    "git merge side3; "
    "git push"
)


class TestLevel28MergeManyFeatures:
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
        git_page.enter_command("git checkout main")
        git_page.enter_command("git pull")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()