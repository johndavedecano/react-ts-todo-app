import * as React from 'react';
import { v4 } from 'uuid';

import * as styles from './TodoApp.css';

import TodoForm from './TodoForm';
import TodoListItem from './TodoListItem';

export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
}

export interface TodoProps {
  name: string;
}

export interface TodoState {
  items: TodoItem[];
}

export default class Todo extends React.Component<TodoProps, TodoState> {
  static defaultProps = {
    name: 'Dave',
  };

  constructor(props: TodoProps) {
    super(props);
    this.state = { items: this.getItems() };

    this.onSubmit = this.onSubmit.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  private getItems(): TodoItem[] {
    try {
      const data: any = localStorage.getItem('todos'); // string
      return JSON.parse(data) || [];
    } catch (err) {
      return [];
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.items !== this.state.items) {
      localStorage.setItem('todos', JSON.stringify(this.state.items));
    }
  }

  private onSubmit(value: string): void {
    const item: TodoItem = {
      id: v4(),
      title: value,
      done: false,
    };

    this.setState(
      {
        items: this.state.items.concat([item]),
      },
      () => {
        console.log(this.state.items);
      }
    );
  }

  private onUpdate(item: TodoItem): void {
    this.setState({
      items: this.state.items.map(prev => {
        if (prev.id === item.id) {
          return { ...prev, ...item };
        } else {
          return prev;
        }
      }),
    });
  }

  private onRemove(id: string): void {
    this.setState({
      items: this.state.items.filter(i => i.id !== id),
    });
  }

  private renderItem(item: TodoItem): React.ReactNode {
    return (
      <TodoListItem
        key={item.id}
        id={item.id}
        title={item.title}
        done={item.done}
        onRemove={this.onRemove}
        onUpdate={this.onUpdate}
      />
    );
  }

  public render(): React.ReactNode {
    return (
      <div className={styles.todoApp}>
        <div className={styles.todoAppHeader}>
          <h2>Todo App</h2>
          <TodoForm onSubmit={this.onSubmit} />
        </div>
        {this.state.items.map(this.renderItem)}
      </div>
    );
  }
}
