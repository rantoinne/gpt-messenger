'use client';

import React from 'react';
import useSWR from 'swr';
import Select from 'react-select';

const fetchOpenAIModels = () => fetch('/api/getChatEngines').then(res => res.json());

const OpenAiModelSelection = () => {
  const { data: models, isLoading } = useSWR('openAIModels', fetchOpenAIModels);

  const { data: model, mutate: setModel } = useSWR('models', {
    fallbackData: 'gpt-3.5-turbo-instruct'
  });
  
  return (
    <div>
      <Select
        isSearchable
        className="my-2"
        options={models?.modelsMap}
        placeholder={model}
        defaultValue={model}
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: () => "bg-[#434654] border-[#434654]"
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}

export default OpenAiModelSelection