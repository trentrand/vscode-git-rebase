# Git Rebase (Visual Studio Code Extension)

Use keyboard shortcuts to quickly edit the actions of an interactive Git rebase.

\!\[Extension Preview\]\(Preview.gif\)

## How to Use

Press the key that correspondence to your desired git rebase action.
This command will be applied to all selected lines.

Keyboard shortcuts:

* `p` sets command to 'Pick'
* `r` sets command to 'Reword'
* `e` sets command to 'Edit'
* `s` sets command to 'Squash'
* `f` sets command to 'Fixup'
* `x` sets command to 'Execute'
* `d` sets command to 'Drop'

## Known Issues

No currently known issues. Please open a ticket on GitHub for any bugs. 

## Release Notes

### 1.0.1

Constrain all keybindings to `git-rebase` files only.

### 1.0.0

Initial release with support for quickly setting the rebase action in a 
`git-rebase` language file using keys 'p', 'r', 'e', 's', 'f', 'x', 'd'.