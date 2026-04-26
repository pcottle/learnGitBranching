LEVEL_ID = "remoteAdvanced/fetchArgs"
SOLUTION = "git fetch origin main~1:foo; git fetch origin foo:main; git checkout foo; git merge main"


class TestLevel32FetchArgs:
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

    def test_simple_fetch_not_solved(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git fetch")
        assert not git_page.is_level_solved()

    def test_invalid_command(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git invalidcommand123")
        assert git_page.has_error_output()

    def test_reset_after_progress(self, git_page):
        git_page.open_level(LEVEL_ID)
        git_page.enter_command("git fetch origin main~1:foo")
        git_page.enter_command("reset")
        assert not git_page.is_level_solved()