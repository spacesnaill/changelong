import React, { useState, useEffect, SyntheticEvent, useRef } from 'react';

import { Octokit } from '@octokit/rest';
import Fuse from 'fuse.js';
import { DebounceInput } from 'react-debounce-input';
import {
  Box,
  Button,
  Paper,
  TextField,
  useMediaQuery,
  CssBaseline,
} from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import ChangelogList from './components/ChangelogList';
import BackToTop from './components/BackToTop';
import type { releaseResponseData } from '../types/get-release-response';

interface AppProps {}

const useStyles = makeStyles({
  listContainer: {
    justifyContent: 'center',
    margin: 'auto',
    width: '60%',
    height: '100vh',
    padding: '0.5em',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '2em',
    width: '60%',
  },
  formInput: { marginRight: '2em' },
  search: { textAlign: 'center', width: '68%', marginBottom: '2em' },
});

function App({}: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const styles = useStyles();
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.formContainer}>
        <TextField
          required
          className={styles.formInput}
          label="Owner"
          variant="outlined"
          value={owner}
          onChange={handleOwnerChange}
          id="owner"
          type="text"
        />
        <TextField
          required
          className={styles.formInput}
          label="Repo"
          variant="outlined"
          value={repo}
          onChange={handleRepoChange}
          id="repo"
          type="text"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={!(owner && repo)}
        >
          Submit
        </Button>
      </Box>
      <Box className={styles.formContainer}>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={handleSearchQueryChange}
          id="search"
          type="text"
          placeholder="Search"
          className={styles.search}
          value={searchQuery}
          element={TextField}
        />
      </Box>
      <Paper className={styles.listContainer} variant="outlined">
        {list ? <ChangelogList releaseList={list} /> : null}
      </Paper>
    </ThemeProvider>
  );
}

export default App;
