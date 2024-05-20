import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { selectUser } from '../../store/user/user.store';
import { logout } from '../../store/action';
import { selectFavoritesCount } from '../../store/favorites/favorites.store';

export const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const location = useLocation();

  const IS_AUTHENTICATED = !!user;

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={ROUTE_PATHS.MAIN}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {IS_AUTHENTICATED ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={ROUTE_PATHS.FAVORITES}
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${user.avatarUrl})`,
                          borderRadius: '50%',
                        }}
                      />
                      <span className="header__user-name user__name">
                        {user.name}
                      </span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={`${ROUTE_PATHS.LOGIN}?redirect=${location.pathname}`}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__login">Sign in</span>
                </Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
