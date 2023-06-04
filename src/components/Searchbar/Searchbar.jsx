import PropTypes from 'prop-types';
import { Component } from 'react';
import { notification } from '../../notification/notification';
import {
  Header,
  Form,
  FormButton,
  FormLabel,
  FormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

    if (!searchQuery.trim()) {
      this.props.value();
      notification(
        'The search input can not be empty. Please enter a search query'
      );
      return;
    }

    onSubmit(searchQuery);
    this.resetInput();
  };

  resetInput = () => {
    this.setState({ searchQuery: '' });
  };

  handleInput = e => {
    this.setState({ searchQuery: e.currentTarget.value.trim().toLowerCase() });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <FormButton>
            <FormLabel>Search</FormLabel>
          </FormButton>

          <FormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInput}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
