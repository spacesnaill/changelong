import React, { useState, useEffect } from 'react';
import './App.css';

import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";

import ChangelogList from './components/ChangelogList';

interface AppProps {}

function App({}: AppProps) {
  const [list, setList] = useState<Endpoints["GET /repos/{owner}/{repo}/releases"]["response"] | null>(null);
  const octokit = new Octokit();
  useEffect( () => {
    const owner = "plotly";
    const repo = "plotly.js"
    octokit.repos.listReleases({owner, repo}).then(response => {
      setList(response)
      console.log(response.data)
    })
  }, []);



  return (
    <div>
      {list ? <ChangelogList releaseList={list} /> : null}
    </div>
  );
}

export default App;
