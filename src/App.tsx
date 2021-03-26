import React, { useState, useEffect, SyntheticEvent } from 'react';
import './App.css';

import { Octokit } from '@octokit/rest';
import type { Endpoints } from '@octokit/types';

import ChangelogList from './components/ChangelogList';
import BackToTop from './components/BackToTop';
import styles from './styles/changelog.module.css';

interface AppProps {}

function App({}: AppProps) {
  const [list, setList] = useState<
    Endpoints['GET /repos/{owner}/{repo}/releases']['response'] | null
  >(null);
  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const per_page = 100;

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOwner(value);
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepo(value);
  };

  const octokit = new Octokit();
  useEffect(() => {}, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    octokit.repos.listReleases({ owner, repo, per_page }).then((response) => {
      setList(response);
      console.log(response);
    });
  };

  return (
    <>
      <div className={styles.formContainer}>
        <label htmlFor="owner">Owner: </label>
        <input
          value={owner}
          onChange={handleOwnerChange}
          id="owner"
          type="text"
        />
        <label htmlFor="repo">Repo: </label>
        <input
          value={repo}
          onChange={handleRepoChange}
          id="repo"
          type="text "
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(owner && repo)}
        >
          Submit
        </button>
      </div>
      <div className={styles.listContainer}>
        {list ? <ChangelogList releaseList={list} /> : null}
      </div>
      <BackToTop />
    </>
  );
}

export default App;
