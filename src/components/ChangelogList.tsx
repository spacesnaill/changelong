import React from 'react';

import type { Endpoints } from '@octokit/types';
import { Virtuoso as List } from 'react-virtuoso';

import styles from '../styles/changelog.module.css';
import ChangelogItem from './ChangelogItem';

interface IProps {
  releaseList: Endpoints['GET /repos/{owner}/{repo}/releases']['response'];
}

const ChangelogList: React.FC<IProps> = ({ releaseList }) => {
  const { data } = releaseList;
  return (
    <List
      totalCount={data.length}
      data={data}
      itemContent={(index: number) => (
        <ChangelogItem index={index} data={data} />
      )}
    />
  );
};

export default ChangelogList;
