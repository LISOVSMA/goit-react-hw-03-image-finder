import PropTypes from 'prop-types';
import { ErrorMessage } from './Error.styled';

export const Error = ({ error }) => {
  return <ErrorMessage>{error}</ErrorMessage>;
};

Error.propTypes = {
  error: PropTypes.string,
};
