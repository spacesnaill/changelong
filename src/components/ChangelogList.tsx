import React from 'react';

import { Virtuoso as List } from 'react-virtuoso';

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
