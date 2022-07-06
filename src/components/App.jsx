import { useState, useEffect } from 'react';

import { Container } from './Container';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';

function App() {
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [imageCardData, setImageCardData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return; // пропускаем первый рендер
    }

    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=25755883-425392836cbaa44f717c19250&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(json => {
        setImage(prevState => [...prevState, ...json.hits]);
        setTotal(json.total);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImage([]);
  };

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);
  };

  const openModalHandler = event => {
    const { id } = event.target;
    setModal(true);
    setId(+id);
    setImageCardData(image.find(image => image.id === +id));
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const getlargeImageUrl = () => {
    console.log(imageCardData);
    return imageCardData.largeImageURL;
  };

  const imageLength = image.length;

  return (
    <>
      {error && alert(error.message)}
      <Searchbar onSubmit={handleFormSubmit} />
      <Container>
        <ImageGallery
          imageName={imageName}
          image={image}
          isOpenModal={openModalHandler}
        />
        {((!image && !imageLength < total) || loading) && <Loader />}
        {imageLength < total && !loading && (
          <Button onClick={loadMoreHandler} text="load more"></Button>
        )}
        {modal && (
          <Modal
            onClose={closeModalHandler}
            id={id}
            url={getlargeImageUrl()}
            alt={imageName}
          />
        )}
      </Container>
    </>
  );
}

export { App };
