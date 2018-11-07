import * as React from 'react';

import * as styles from './TodoListItem.css';
import * as classname from 'classnames';

export interface TodoListItemProps {
  id: string;
  title: string;
  done: boolean;
  onRemove: Function;
  onUpdate: Function;
}

export interface TodoListItemState {
  isEditing: boolean;
}

export default class TodoListItem extends React.Component<
  TodoListItemProps,
  TodoListItemState
> {
  constructor(props: TodoListItemProps) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  static ENTER: number = 13;

  static ESC: number = 27;

  onClick = (event: any): void => {
    event.preventDefault();
    this.setState({
      isEditing: true,
    });
  };

  onKeyUp = (event: any): void => {
    if (event.keyCode === TodoListItem.ENTER) {
      // todo submit
      this.props.onUpdate({
        id: this.props.id,
        title: event.target.value,
      });
      this.setState({ isEditing: false });
    }

    if (event.keyCode === TodoListItem.ESC) {
      // todo cancel
      this.setState({ isEditing: false });
    }
  };

  onBlur = (event: any): void => {
    this.setState({ isEditing: false });
  };

  onRemove = (event: any): void => {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      this.props.onRemove(this.props.id);
    }
  };

  onClickCheckbox = (event: any): void => {
    this.props.onUpdate({
      id: event.target.id,
      done: event.target.checked,
    });
  };

  public render() {
    const { id, title, done } = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.itemInner}>
          {!this.state.isEditing && (
            <input
              id={id}
              type="checkbox"
              defaultChecked={done}
              onClick={this.onClickCheckbox}
            />
          )}
          {this.state.isEditing ? (
            <input
              autoFocus
              type="text"
              defaultValue={title}
              onKeyUp={this.onKeyUp}
              onBlur={this.onBlur}
              className={styles.itemInput}
            />
          ) : (
            <a
              href="#"
              onClick={this.onClick}
              className={classname(styles.itemTitle, {
                [styles.itemDone]: done,
              })}
            >
              {title}
            </a>
          )}
        </div>

        {!this.state.isEditing && (
          <button className={styles.removeButton} onClick={this.onRemove}>
            Remove
          </button>
        )}
      </div>
    );
  }
}
