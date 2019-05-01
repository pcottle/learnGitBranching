GIT_STATUS=$(git status --porcelain | wc -l )
if [[ GIT_STATUS -ne 0 ]]; then
  echo "${1:-Source files were modified}"
  git status
  exit $GIT_STATUS
fi;
