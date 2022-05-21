import { Fragment, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);



    const[formValues, handleInputChange] = useForm({
        searchText: q
    });

    const {searchText} = formValues;
    const heroesFileted = useMemo(() => getHeroesByName(q), [q]); 

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);

    }

    return (
        <Fragment>
            <h1>Búsquedas</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Buscar</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Buscar un Héroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={handleInputChange}
                        />
                        <button 
                            className="btn btn-success mt-1"
                            type="submit"
                            onClick={handleSearch}
                        >
                            Buscar...
                        </button> 
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr/>
                    {
                        (q === '')
                            ? <div className="alert alert-info">Busca un héroe</div>
                            : (heroesFileted.length === 0)
                                && <div className="alert alert-danger">No se encontro {q}</div> 
                    }
                    {
                        heroesFileted.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}