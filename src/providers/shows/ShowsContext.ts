import React from 'react';
import {TvShow} from '../../types';

export interface IShowsContext {
  shows: TvShow[];
  setShows: React.Dispatch<React.SetStateAction<TvShow[]>>;
}

const ShowsContext = React.createContext<IShowsContext>({} as IShowsContext);

export default ShowsContext;
