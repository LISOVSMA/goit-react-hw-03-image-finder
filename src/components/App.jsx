import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { notification } from '../notification/notification';
import { getImages } from '../api/getImages';
import { Container } from './App.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    status: STATUS.IDLE,
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    showModal: false,
    showBtn: false,
    modalImage: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      await this.setState({ status: STATUS.PENDING });
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    await this.setState({ status: STATUS.PENDING });

    try {
      const response = await getImages(searchQuery, page);
      const { hits, totalHits } = response.data;

      if (!hits.length) {
        notification('Sorry, no images found. Please, try again!');
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: STATUS.RESOLVED,
        showBtn: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  };

  handleChangeSearchQuery = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      notification(`Images of ${searchQuery} have already been displayed.`);
      return;
    }
    this.setState({
      status: STATUS.IDLE,
      searchQuery,
      images: [],
      page: 1,
      error: null,
      showModal: false,
      showBtn: false,
      modalImage: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onOpenModal = ({ target }) => {
    this.setState({ showModal: true, modalImage: target.dataset.src });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  errorString = async () => {
    await this.setState({
      status: STATUS.REJECTED,
      images: [],
      error: [],
    });
  };

  render() {
    const { status, images, error, modalImage, showModal, showBtn } =
      this.state;

    return (
      <Container>
        <Searchbar
          onSubmit={this.handleChangeSearchQuery}
          value={this.errorString}
        />

        {status === STATUS.PENDING && <Loader />}

        <ImageGallery images={images} onClick={this.onOpenModal} />

        {showBtn && (
          <Button onClick={this.handleLoadMore}>
            {status === STATUS.PENDING ? 'Loading...' : 'Load More'}
          </Button>
        )}

        {showModal && <Modal imgSrc={modalImage} onClose={this.onCloseModal} />}

        {status === STATUS.REJECTED && <Error>{error}</Error>}

        <ToastContainer />
      </Container>
    );
  }
}
