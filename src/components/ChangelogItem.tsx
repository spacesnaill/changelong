import React from 'react';

import type { Endpoints } from '@octokit/types';
import ReactMarkdown from 'react-markdown';

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
  data: Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'];
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
