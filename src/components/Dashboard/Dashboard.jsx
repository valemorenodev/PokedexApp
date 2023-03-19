import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Dashboard.module.css'
import { Card, Pagination, Col, Row, Modal, Button } from 'react-bootstrap';

function PokemonCard({ pokemon }) {

  const [image, setImage] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [weight, setWeight] = useState(0);
  const [specie, setSpecie] = useState([]);
  const [type, setType] = useState([])

  async function fetchPokemonData() {
    //full pokemon data
    const variantInfo = await axios.get(pokemon.url)

    //image - abilities - weight
    setImage(variantInfo.data.sprites.front_default);
    setAbilities(variantInfo.data.abilities.map(ability => ability.ability.name));
    setWeight(variantInfo.data.weight);

    //specie
    const speciesData = await axios.get(variantInfo.data.species.url)
    setSpecie(speciesData.data.egg_groups)

    //type
    setType(variantInfo.data.types)
    console.log(type)
  }

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  if (!pokemon) {
    return <h1>error al cargar la información</h1>
  }

  return (
    <div>
      <div onClick={handleCardClick}>
        <div style={{ width: '18rem' }} className={style.PokeCards}>
          <Card.Img variant="top" src={image} className={style.CardImg} />
          <Card.Body>
            <div className={style.CardButton}>
              <p className={style.CardWeight}>Peso {weight}</p>
            </div>
            <Card.Text>
              <h1 className={style.CardTitle}>{pokemon.name} </h1><br />
              <p>#{abilities.join(', #')}<br /></p>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{pokemon.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img variant="top" src={image} />
          <Card.Text>
            <strong>Abilities: </strong>{abilities.join(', ')}<br />
            <strong>Weight: </strong>{weight}<br />
            <strong>Specie: </strong>{specie.map(item => item.name).join(", ")}<br />
            <strong>Type: </strong>{type.map(item => item.name).join(", ")}
          </Card.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

function Dashboard() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(6);

  const URL = `https://pokeapi.co/api/v2/pokemon`

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(URL);
      setPokemons([...result.data.results]);
    }
    fetchData();
  }, []);

  const indexOfLastPokemon = Math.min(currentPage * pokemonsPerPage, pokemons.length);
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div id={`${style.Dashboard}`}>
      <Row className={style.Container}>
        {currentPokemons.map(pokemon => (
          <Col key={pokemon.name} sm={12} md={4} lg={3} className={`${style.PokeCol}`}>
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center" >
        {Array.from({ length: Math.ceil(pokemons.length / pokemonsPerPage) }, (_, index) => (
          <Pagination.Item className={style.Pagination} id={style.Pagination} key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div >
  );
}


export default Dashboard;