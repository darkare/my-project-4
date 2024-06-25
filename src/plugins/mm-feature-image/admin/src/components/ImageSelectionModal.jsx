import React, { useEffect, useState } from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@strapi/design-system/ModalLayout";
import { Box, Button, Flex, IconButton } from "@strapi/design-system";
import { Plus, Crop } from "@strapi/icons";

const ImageSelectionModal = ({ isOpen, onClose, onSelectFiles }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [showCropSubMenu, setShowCropSubMenu] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [cropDimensions, setCropDimensions] = useState({ width: 0, height: 0 });
  const handlePlusClick = () => {};
 
  const handleCropClick = () => setShowCropSubMenu(!showCropSubMenu); // Toggle submenu visibility
  const handleCropOptionClick = (ratio) => {
    const dimensions = ratio === "6x4" ? { width: 6, height: 4 } : { width: 5, height: 7 };
    setCropDimensions(dimensions);
    setCropMode(true);
    // Close any submenus
    setShowCropSubMenu(false);
    setShowCropSubMenu(false); // Hide submenu after selection
  };
 const handleClose = () => {
  if (selectedImage) {
    const xi = images.find((image) => image.id === selectedImage);
    console.log('111-22-xi', xi);
    const selectedImages = [xi];
    onSelectFiles(selectedImages);
  }
  onClose();
 }

 useEffect(() => {
    console.log('111-22-selectedImage', selectedImage);
    
    
 }, [selectedImage]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/upload/files", {
          method: "GET",
          headers: {
            Authorization:
              "Bearer 7e3c801d1f3ef696ca8f7f79b1cf4c11283c3c27744cbed389cd72af988e21baa473071c591827947b899d248bbede39f8e282879927b08c8d93b3c28f62c93650ca47d8277c8e213ecd912a919b8bb36a68fba1612067037a38b23634573abbb30f7424b49ba70474c4d1223c87497e8c5421252205f33605d2507821d08b41", // Replace YOUR_API_TOKEN with your actual token
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("111-images", data);
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]); // Dependency array includes isOpen to refetch when the modal opens

  return (
    <>
      {isOpen && (
        <ModalLayout onClose={handleClose}>
          <ModalHeader>
            <Flex style={{ position: "relative" }}>
              <IconButton
                onClick={handlePlusClick}
                label="Add"
                icon={<Plus />}
              />
              <IconButton
                onClick={handleCropClick}
                label="Crop"
                icon={<Crop />}
              />
              {showCropSubMenu && (
                <Box style={{ position: "absolute", top: "100%", left:"50px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", zIndex: 100 }}>
                  <Button onClick={() => handleCropOptionClick("6x4")} variant="tertiary">6x4</Button>
                  <Button onClick={() => handleCropOptionClick("5x7")} variant="tertiary">5x7</Button>
                </Box>
              )}
            </Flex>
          </ModalHeader>
          <ModalBody>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "10px",
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.id)} // Set the selected image ID
                style={{
                  border: selectedImage === image.id ? "2px solid blue" : "none", // Conditional styling for border
                  cursor: "pointer",
                }}
              >
                <img
                  src={`http://localhost:1337${image.formats.thumbnail.url}`}
                  alt={image.alternativeText || "Image"}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </ModalBody>
          <ModalFooter
            startActions={
              <Button variant="tertiary" onClick={handleClose}>
                Cancel
              </Button>
            }
            endActions={<Button onClick={handleClose}>Select</Button>}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ImageSelectionModal;
