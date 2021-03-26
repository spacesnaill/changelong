import React from 'react';

import type { Endpoints } from '@octokit/types';
import ReactMarkdown from 'react-markdown';

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
      <div>Date: {created_at}</div>
      <ReactMarkdown children={body as string} />
      <hr />
    </div>
  );
};

export default ChangelogItem;
