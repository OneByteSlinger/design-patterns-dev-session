/**
 * UICommand Design Pattern
 *
 * Intent: Turns a request into a stand-alone object that contains all
 * information about the request. This transformation lets you parameterize
 * methods with different requests, delay or queue a request's execution, and
 * support undoable operations.
 */

/**
 * Interfaces
 */
abstract class UICommand {
  protected backup: string = '';

  constructor(protected app: Application, protected editor: Editor) {}

  saveBackup() {
    this.backup = this.editor.getText();
  }

  undo() {
    this.editor.setText(this.backup);
  }
  abstract execute(): boolean;
}

/**
 * Concrete Implementations
 */

class CopyCommand extends UICommand {
  execute() {
    this.app.clipboard = this.editor.getText();
    return false;
  }
}

// The cut command does change the editor's state, therefore // it must be saved to the history. And it'll be saved as // long as the method returns true.
class CutCommand extends UICommand {
  execute() {
    this.saveBackup();
    this.app.clipboard = this.editor.getText();
    this.editor.removeText();
    return true;
  }
}
class PasteCommand extends UICommand {
  execute() {
    this.saveBackup();
    this.editor.setText(this.app.clipboard);
    return true;
  }
}

class UndoCommand extends UICommand {
  execute() {
    this.undo();
    return true;
  }
}

// The global command history is just a stack.
class CommandHistory {
  private history: UICommand[] = [];
  push(c: UICommand): void {
    this.history.push(c);
  }
  pop(): UICommand | undefined {
    return this.history.pop();
  }
}
// The editor class has actual text editing operations. It plays // the role of a receiver: all commands end up delegating execution to the editor's methods.
class Editor {
  private text: string = '';

  getText(): string {
    return this.text;
  }
  removeText(): void {
    this.text = '';
  }
  setText(text: string): void {
    this.text = text;
  }
}

// The application class sets up object relations. It acts as a sender: when something needs to be done, it creates a command object and executes it.
class Application {
  public clipboard: string = '';
  public editors: Editor[] = [];
  public activeEditor: Editor = new Editor();
  public history: CommandHistory = new CommandHistory();

  excuteCommand(uiCommand: UICommand) {
    if (uiCommand.execute()) this.history.push(uiCommand);
  }

  copy() {
    this.excuteCommand(new CopyCommand(this, this.activeEditor));
  }
  cut() {
    this.excuteCommand(new CutCommand(this, this.activeEditor));
  }
  paste() {
    this.excuteCommand(new PasteCommand(this, this.activeEditor));
  }
  undo() {
    this.excuteCommand(new UndoCommand(this, this.activeEditor));
  }
}

/**
 * Client/Consumer Code
 */
const application = new Application();
const editor1 = new Editor();
const editor2 = new Editor();

application.editors = [editor1, editor2];
application.activeEditor = editor1;

editor1.setText('Smart Building Ltd.');
editor2.setText('Smartest Building Ltd.');

// application.excuteCommand(new CopyCommand(application, editor1));
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);
// application.excuteCommand(new PasteCommand(application, editor2));
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);

// application.excuteCommand(new CutCommand(application, editor1));
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);
// application.excuteCommand(new PasteCommand(application, editor2));
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);

// // PlayGround
// application.copy();
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);

// application.activeEditor = editor2;
// application.paste();
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);

// editor2.setText('Hello World!');

// // application.undo();
// console.log('Editor 1 Text: ', editor1.getText());
// console.log('Editor 2 Text: ', editor2.getText());
// console.log('Application Command History: ', application.history);
