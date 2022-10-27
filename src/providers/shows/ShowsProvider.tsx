import React from 'react';
import {TvShow} from '../../types';
import ShowsContext, {IShowsContext} from './ShowsContext';

export const ShowsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [shows, setShows] = React.useState<TvShow[]>([]);

  const context: IShowsContext = {
    shows,
    setShows,
  };

  return (
    <ShowsContext.Provider value={context}>{children}</ShowsContext.Provider>
  );
};

export const useShows = () => React.useContext(ShowsContext);
