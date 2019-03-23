const vscode = require('vscode');

const REBASE_ACTIONS_REGEX = /^(pick|reword|edit|squash|fixup|exec|drop)\ /i;

const RebaseActions = {
  PICK: 'pick', // use commit
  REWORD: 'reword', // use commit, but edit the commit message
  EDIT: 'edit', // use commit, but stop for amending
  SQUASH: 'squash', // use commit, but meld into previous commit
  FIXUP: 'fixup', // like "squash", but discard this commit's log message
  EXEC: 'exec', // run command (the rest of the line) using shell
  DROP: 'drop' // remove commit
}

function activate(context) {
  for (let action in RebaseActions) {

    let command = vscode.commands.registerTextEditorCommand(
      getCommandName(action),
      (textEditor, editContext) => {
        setActionForSelectedLines(action, textEditor, editContext);
      }
    );

    context.subscriptions.push(command);
  }
}
exports.activate = activate;
exports.deactivate = function() {}; // unused

// Change the rebase action for the currently selected lines
function setActionForSelectedLines(action, textEditor, editContext) {
  if (textEditor._documentData._languageId === 'git-rebase') {
    const startLine = textEditor._selections[0].start.line;
    const endLine = textEditor._selections[0].end.line;
    
    for (let line = startLine; line <= endLine; line++) {
      setAction(line, action, editContext);
    }
  }
}

// Extract the rebase action from the beginning of the provided line ("pick", "fixup", etc...)
function getActionFromLine(lineText) {
  const actions = RegExp(REBASE_ACTIONS_REGEX).exec(lineText)

  if (!actions) {
    return null;
  }

  return actions[0];
}

// Rewrite the rebase action on the specified line
function setAction(line, action, editContext) {
  const selectedLine = editContext._document.lineAt(new vscode.Position(line, 0));
  const prevAction = getActionFromLine(selectedLine.text);

  if (prevAction === null) {
    return;
  }

  const lineSelection = new vscode.Range(
    new vscode.Position(line, 0),
    new vscode.Position(line, prevAction.length - 1)
  );

  editContext.replace(lineSelection, RebaseActions[action]);
}

function getCommandName(action) {
  let commandName = action.substring(0,1) + action.substring(1, action.length).toLowerCase();
  
  return `extension.setRebaseAction${commandName}`;
}