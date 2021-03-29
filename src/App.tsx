import React, { useState, useEffect, SyntheticEvent, useRef } from 'react';
import './App.css';

import { Octokit } from '@octokit/rest';
import Fuse from 'fuse.js';
import { DebounceInput } from 'react-debounce-input';

import ChangelogList from './components/ChangelogList';
import BackToTop from './components/BackToTop';
import styles from './styles/changelog.module.css';
import type { releaseResponseData } from '../types/get-release-response';

interface AppProps {}

function App({}: AppProps) {
  const originalList = useRef<releaseResponseData>([]);
  const [list, setList] = useState<releaseResponseData | null>(null);

  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const per_page = 100;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOwner(value);
  };

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRepo(value);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const octokit = new Octokit();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    let releaseList: releaseResponseData = [];
    let page = 1;
    let fullReleaseList: releaseResponseData = [];
    do {
      releaseList = (
        await octokit.repos.listReleases({ owner, repo, per_page, page })
      ).data;
      console.log(releaseList);
      fullReleaseList = fullReleaseList.concat(releaseList);
      console.log(`fullReleaseList`, fullReleaseList);
      page = page + 1;
    } while (releaseList.length > 0);

    setList(fullReleaseList);
    originalList.current = fullReleaseList;
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const fuse = new Fuse(originalList.current, {
        keys: ['body', 'name', 'created_at'],
        includeScore: true,
      });
      const results = fuse.search(searchQuery);
      const mappedResults = results.map((data) => data.item);
      console.log(results);
      setList(mappedResults);
    } else {
      setList(originalList.current);
    }
  }, [searchQuery]);

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
        <input value={repo} onChange={handleRepoChange} id="repo" type="text" />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(owner && repo)}
        >
          Submit
        </button>
      </div>
      <div className={styles.formContainer}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={handleSearchQueryChange}
          id="search"
          type="text"
          placeholder="Search"
          className={styles.search}
          value={searchQuery}
        />
      </div>
      <div className={styles.listContainer}>
        {list ? <ChangelogList releaseList={list} /> : null}
      </div>
      <BackToTop />
    </>
  );
}

export default App;
