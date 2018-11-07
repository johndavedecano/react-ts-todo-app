import * as React from "react";

import * as styles from "./TodoForm.css";

export interface TodoFormProps {
  onSubmit: Function;
}

export interface TodoFormState {
  title: string;
}

export default class TodoForm extends React.Component<
  TodoFormProps,
  TodoFormState
> {
  constructor(props: TodoFormProps) {
    super(props);
    this.state = {
      title: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private onSubmit(event: any): void {
    event.preventDefault();

    if (this.state.title === "") {
      return;
    }

    this.props.onSubmit(this.state.title);

    this.setState({ title: "" });
  }

  private onChange(event: any): void {
    this.setState({
      title: event.target.value
    });
  }

  public render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.onSubmit} className={styles.todoForm}>
        <input
          className={styles.todoFormInput}
          autoFocus
          placeholder="Type todo title"
          value={title}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
