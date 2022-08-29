## Welcome to the Learn Git Branching contributing guide!

We have a pretty relaxed environment in this project so there's no formal template to submit Pull Requests for. Contributions generally fall into two buckets:

### Translations

I welcome all translation improvements or additions! The levels are stored in giant JSON blobs, keyed by locale for each string. This means its somewhat awkward to add new translations, since you have to edit the JSON manually.

### Bug Fixes, New Features, etc

These are great too! If you are adding new functionality to the git engine, I would try to add some tests in the `__tests__` folder. It's pretty simple, you can just input a bunch of git commands and show the expected tree state afterwards.

For bug fixes or CSS/style layout issues, simply attach screenshots of the before and after. For more obscure browsers, targeted CSS rules by browser is a bit more preferred.

Thanks for stopping by!
