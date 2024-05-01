import { FC } from 'react';
import { FavoritesList } from '../../components/FavoritesList/FavoritesList';
import { useAppSelector } from '../../store/helpers';
import { selectFavoritesList, selectFavoritesLoadingStatus } from '../../store/favorites/favorites.store';
import { Spinner } from '../../components/Spinner/Spinner';

export const FavoritesPage: FC = () => {
  const offers = useAppSelector(selectFavoritesList);
  const isLoading = useAppSelector(selectFavoritesLoadingStatus);

  if (isLoading) {
    return <Spinner withPageWrapper />;
  }

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {offers.length === 0 && (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                Save properties to narrow down search or plan yor future trips.
                </p>
              </div>
            )}
            <FavoritesList offers={offers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};
