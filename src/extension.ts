import * as vscode from "vscode";

const toCamel = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor!");
    return;
  }

  const camel = (text: string) => {
    return text.replace(/\b[A-Z_\d]+\b/g, function (whole: string) {
      return whole
        .toLowerCase()
        .replace(/_(.)/g, function (w: string, i: string) {
          return i.toUpperCase();
        });
    });
  };

  editor.edit((editBuilder) => {
    editor.selections.forEach((selection) => {
      const selectedText = editor.document.getText(selection);
      // Replace 'selectedText' with your desired string, e.g., 'hello'
      const newText = camel(selectedText);
      editBuilder.replace(selection, newText);
    });
  });
};

const toSnake = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active editor!");
    return;
  }

  editor.edit((editBuilder) => {
    editor.selections.forEach((selection) => {
      const selectedText = editor.document.getText(selection);
      const newText = selectedText.replace(/\b\w+\b/g, (whole: string) =>
        whole.replace(/\B(?=[A-Z])/g, "_").toUpperCase()
      );
      editBuilder.replace(selection, newText);
    });
  });
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("ramoi.tocamel", toCamel));
  context.subscriptions.push(vscode.commands.registerCommand("ramoi.tosnake", toSnake));
}
