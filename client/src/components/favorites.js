import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Button, Form } from "react-bootstrap";
import { FaHeart } from 'react-icons/fa'; 
import './home.css';

const Favorites = () => {
  const [memories, setMemories] = useState([]);
  const [status, setStatus] = useState("");

  const fetchMemories = async () => {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await axios.get('http://localhost:5100/memories/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMemories(response.data);
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error fetching memories:', error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);


  return (
    <div className="justify-content-start">
      <h5>{status}</h5>
      <h2>Favorites</h2>

      <div className="App">
        <Container className="p-4">
        <Row xs={1} sm={2} md={3} lg={4} className="justify-content-start">
            {memories.map((memory, idx) => (
              <div key={idx} className="col mb-4">
                <Card border="Primary" text="dark" 
                      style={{ width: "100%", minWidth: "250px" }} className="m-2">
                  <Card.Header>
                  <Button
                          variant={memory.favorite ? "danger" : "warning"}
                          size="sm"
                          className="rounded-circle mr-2"
                        >
                          
                          <FaHeart style={{color: "red", backgroundColor: "white"}}/>
                  </Button>

                    <span className={`ml-4 mr-2`}>
                      { ' Memory Card'}</span>
                  </Card.Header>
                  <Card.Body>
                        <Card.Title>{memory.title}</Card.Title>
                        <Card.Text>{memory.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Favorites;
