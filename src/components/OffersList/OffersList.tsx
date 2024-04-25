import { FC } from 'react';
import { Card } from '../Card/Card';
import { Point, Offer } from '../../types';
import classNames from 'classnames';
import { getCardClassName } from '../../utils/cardClassName';
import { useAppDispatch, useAppSelector } from '../../store/helpers';
import { changeCity, selectCity } from '../../store/offers/offers.store';

interface OffersListProps {
  offers: Offer[];
  setActivePoint: (point?: Point) => void;
  points: Point[];
  prefix?: string;
}

export const OffersList: FC<OffersListProps> = ({ offers, setActivePoint, points, prefix = 'cities' }) => {

  const dispatch = useAppDispatch();

  const activeCity = useAppSelector(selectCity);

  const handleCardMouseEnter = (id: string) => {
    const point = points.find((p) => p.id === id);
    const city = offers.find((offer) => offer.id === id)?.city;
    if (city) {
      dispatch(changeCity(city));
    }
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardMouseLeave = () => {
    setActivePoint(undefined);
  };

  return (
    <section className={classNames(getCardClassName(prefix, 'places'), 'places')}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers?.length ?? 0} places to stay in {activeCity.name}
      </b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
            Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>
              Popular
          </li>
          <li className="places__option" tabIndex={0}>
              Price: low to high
          </li>
          <li className="places__option" tabIndex={0}>
              Price: high to low
          </li>
          <li className="places__option" tabIndex={0}>
              Top rated first
          </li>
        </ul>
      </form>
      <div
        className={classNames(getCardClassName(prefix, 'places-list'), 'places__list tabs__content')}
      >
        {offers.map((card) => (
          <Card
            prefix="cities"
            key={`card-${card.id}`}
            onMouseEnter={() => handleCardMouseEnter(card.id)}
            onMouseLeave={() => handleCardMouseLeave()}
            {...card}
          />
        ))}
      </div>
    </section>
  );
};
