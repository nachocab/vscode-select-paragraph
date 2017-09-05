const vscode = require('vscode');

function activate(context) {
  const selectParagraph = vscode.commands.registerCommand('select-paragraph.selectParagraph', function () {
    const editor = vscode.window.activeTextEditor;
    let startLine = editor.selection.start.line;
    let endLine = editor.selection.end.line;

    while (startLine > 0 && !editor.document.lineAt(startLine - 1).isEmptyOrWhitespace) {
      startLine -= 1;
    }

    while (endLine < editor.document.lineCount - 1 && 
      !editor.document.lineAt(endLine + 1).isEmptyOrWhitespace) {
      endLine += 1;
    }

    // const startCharacter = editor.document.lineAt(startLine).firstNonWhitespaceCharacterIndex;
    const startCharacter = 0;
    const endCharacter = editor.document.lineAt(endLine).text.length;

    editor.selection = new vscode.Selection(startLine, startCharacter, endLine, endCharacter);
  });

  context.subscriptions.push(selectParagraph);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
