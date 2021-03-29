import React from 'react';

import ReactMarkdown from 'react-markdown';

import type { releaseResponseData } from '../../types/get-release-response';

const getHumanReadableDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};

const ChangelogItem = ({
  index,
  data,
}: {
  index: number;
  data: releaseResponseData;
}) => {
  const { node_id, body, name, created_at } = data[index];

  return (
    <div key={node_id}>
      <div>Release: {name}</div>
      <div>Date: {getHumanReadableDate(created_at)}</div>
      <ReactMarkdown children={body as string} />
      <hr />
    </div>
  );
};

export default ChangelogItem;
