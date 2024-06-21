import React, { useState } from 'react';
import Modal from './Modal';
import ImageLibrary from './components/ImageLibrary';

const FeatureImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div onClick={handleIconClick}>
        <img src="placeholder.png" alt="placeholder" />
        <span>Click the icon to select an image</span>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <ImageLibrary onSelectImage={handleModalClose} />
        </Modal>
      )}
    </div>
  );
};

export default FeatureImage;