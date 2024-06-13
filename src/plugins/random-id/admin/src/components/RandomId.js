// src/plugins/random-id/admin/src/components/RandomId.js
import React, { useState, useEffect } from 'react';
import { TextInput } from '@strapi/design-system/TextInput';

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const RandomId = ({ onChange, name, value }) => {
  const [id, setId] = useState(value || generateRandomId());

  useEffect(() => {
    onChange({ target: { name, value: id } });
  }, [id, name, onChange]);

  return (
    <TextInput
      label="Random ID"
      name={name}
      onChange={(e) => setId(e.target.value)}
      value={id}
    />
  );
};

export default RandomId;
