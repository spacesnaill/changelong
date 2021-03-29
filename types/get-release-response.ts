import type { Endpoints } from '@octokit/types';

export type releaseResponse = Endpoints['GET /repos/{owner}/{repo}/releases']['response'];
export type releaseResponseData = Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'];