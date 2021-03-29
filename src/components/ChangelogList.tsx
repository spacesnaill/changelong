import React from 'react';

import type { Endpoints } from '@octokit/types';
import { Virtuoso as List } from 'react-virtuoso';

import styles from '../styles/changelog.module.css';
import ChangelogItem from './ChangelogItem';
import type { releaseResponseData } from '../../types/get-release-response';

interface IProps {
  releaseList: releaseResponseData;
}

const ChangelogList: React.FC<IProps> = ({ releaseList }) => {
  return (
    <>
      {releaseList && releaseList.length > 0 ? (
        <List
          totalCount={releaseList.length}
          data={releaseList}
          itemContent={(index: number) => (
            <ChangelogItem index={index} data={releaseList} />
          )}
        />
      ) : null}
    </>
  );
};

export default ChangelogList;
