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
  InputAdornment,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import ChangelogList from './components/ChangelogList';
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
  spinner: { display: 'flex', margin: 'auto' },
  snackbarContent: {
    color: '#fff',
    fontWeight: 500,
    backgroundColor: '#f44336',
  },
  snackbarMessageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarMessageIcon: {
    marginRight: '0.3em',
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  const [showSpinner, setShowSpinner] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

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

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const octokit = new Octokit();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setShowSpinner(true);
    let releaseList: releaseResponseData = [];
    let page = 1;
    let fullReleaseList: releaseResponseData = [];
    do {
      try {
        releaseList = (
          await octokit.repos.listReleases({ owner, repo, per_page, page })
        ).data;
      } catch (e) {
        setShowSnackbar(true);
        break;
      }
      fullReleaseList = fullReleaseList.concat(releaseList);
      page = page + 1;
    } while (releaseList.length > 0);
    setShowSpinner(false);
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search Releases"
          className={styles.search}
          value={searchQuery}
          element={TextField}
        />
      </Box>
      <Paper className={styles.listContainer} variant="outlined">
        {showSpinner ? <CircularProgress className={styles.spinner} /> : null}
        {list ? <ChangelogList releaseList={list} /> : null}
      </Paper>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          className={styles.snackbarContent}
          message={
            <Box className={styles.snackbarMessageContainer}>
              <ErrorOutlineIcon className={styles.snackbarMessageIcon} />
              <Typography>Error 404: Owner or Repo not found</Typography>
            </Box>
          }
        />
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
