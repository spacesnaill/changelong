import React from "react";

import { Endpoints } from "@octokit/types";
import ReactMarkdown from 'react-markdown';

interface props {
  releaseList: Endpoints["GET /repos/{owner}/{repo}/releases"]["response"];
}

const ChangelogList: React.FC<props> = ({releaseList}) => {
  const {data} = releaseList;
  return (
    data.map(release => {
      return (
        <div key={release.node_id}>
          <div>
            Release: {release.name}
          </div>
          <div>
            Date: {release.created_at}
          </div>
          <ReactMarkdown children={release.body as string} />
          <hr />
        </div>
      )
    })
  )

}

export default ChangelogList;