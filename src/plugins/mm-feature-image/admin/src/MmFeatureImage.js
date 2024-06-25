import React, { useState } from "react";
import { useIntl } from "react-intl";
// import { MediaLib } from '@strapi/helper-plugin';
import ImageSelectionModal from "./components/ImageSelectionModal";
import { Button } from "@strapi/design-system/Button";

const MmFeatureImage = ({ name, onChange, value }) => {
  const { formatMessage } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);
 
//   useEffect(() => {
//     console.log("111-10-useEffect", { name, content });
//     onChange({ target: { name, value: JSON.stringify(content) } });
//   }, [content, name, onChange]);


  const handleSelectFiles = (files) => {
    
    if (files && files.length > 0) {
      const file = files[0];
      console.log("111-file",  { id: file.id, url: file.url, name: file.name });
      onChange({
        target: {
          name,
          value: JSON.stringify({ id: file.id, url: file.url, name: file.name }),
        },
      });
    }
    // handleToggleModal/();
  };

  return (
    <div>
      <Button onClick={handleToggleModal}>
        {formatMessage({
          id: "my-custom-image-field.button-label",
          defaultMessage: "Select Image",
        })}
      </Button>

      {isModalOpen && (
        <ImageSelectionModal
          isOpen={isModalOpen}
          onClose={handleToggleModal}
          onSelectFiles={handleSelectFiles}
        />
      )}
      {/* {value && value.url && <img src={value.url} alt="Selected" />} */}
    </div>
  );
};
export default MmFeatureImage;
