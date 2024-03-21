import { PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';

const NewChat = () => {
  return (
    <div className="border-gray-700 border button-row">
      <PlusIcon className="h-4 w-4" />
      New Chat
    </div>
  );
};

export default NewChat