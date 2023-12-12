import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Button, Form } from "react-bootstrap";
import { FaPen, FaTrashAlt, FaHeart } from 'react-icons/fa';
import './home.css';

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [editMemoryId, setEditMemoryId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [status, setStatus] = useState("");

  const fetchMemories = async () => {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await axios.get('http://localhost:5100/memories', {
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

  const addDraftMemoryCard = () => {
    const newMemory = {
      _id: 'draft card',
      title: 'Title',
      description: 'Description',
      isDraft: true
    };

    if (!memories[0] || !memories[0].isDraft)
    {
      setMemories([newMemory, ...memories]);
    }
  };

  const deleteMemoryCard = async (id) => {
    try {
      if (id == 'draft card')
      {
        setMemories([...memories.slice(1)]);
        return;
      }
      const token = localStorage.getItem('jwt_token');
      await axios.delete(`http://localhost:5100/memories?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMemories(); // Refresh memories after deletion
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error deleting memory:', error);
    }
  };

  const addDraftMemoryCardToServer = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      await axios.post(`http://localhost:5100/memories`, 
        {
          title: editedTitle,
          description: editedDescription,
          favorite: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      fetchMemories(); // Refresh memories after card added to server
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error deleting memory:', error);
    }
  };

  const toggleEditMode = (id, title, description) => {
    setEditMemoryId(id);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSaveChanges = async (id) => {
    try {

      if (id==="draft card")
      {
        addDraftMemoryCardToServer();
        return;
      }

      const token = localStorage.getItem('jwt_token');
      await axios.put(`http://localhost:5100/memories?id=${id}`, {
        title: editedTitle,
        description: editedDescription,
        favorite: memories.find(memory => memory._id==id).favorite
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMemories(); // Refresh memories after saving changes
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error saving changes:', error);
    }

    setEditMemoryId(null); // Exit edit mode
  };

  const handleFavorite = async (id) => {
    try {

      if (id==="draft card")
      {
        return;
      }
      console.log("in handleFavorite: id=", id);
      console.log("memories=", memories);
      const memory = memories.find(memory => memory._id == id);
      const newFavorite = !memory.favorite;
      console.log("in handleFavorite: memory=", memory);
      const token = localStorage.getItem('jwt_token');
      await axios.put(`http://localhost:5100/memories?id=${id}`, {
        title: memory.title,
        description: memory.description,
        favorite: newFavorite
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMemories(); // Refresh memories after saving changes
    } catch (error) {
      setStatus(`Error: ${error.message}`)
      console.error('Error saving changes:', error);
    }

    setEditMemoryId(null); // Exit edit mode
  };

  return (
    <div className="justify-content-start">
      <h5>{status}</h5>
      <h2>Home</h2>

      <div className="text-center mt-4">
            {memories[0] && memories[0].isDraft ? 
            (<h4>Please edit the new draft card</h4>) :          
            (<Button variant="primary" className="rounded-circle mr-2 btn-lg" onClick={addDraftMemoryCard}>
              +
            </Button>)
            }
      </div>

      <div className="App">
        <Container className="p-4">
        <Row xs={1} sm={2} md={3} lg={4} className="justify-content-start">
            {memories.map((memory, idx) => (
              <div key={idx} className="col mb-4">
                <Card border="Primary" text="dark" 
                      style={{ width: "100%", minWidth: "250px" }} className="m-2">
                  <Card.Header>
                    
                    <Button
                      variant="danger"
                      size="sm"
                      className="rounded-circle ml-2 mr-2"
                      onClick={() => deleteMemoryCard(memory._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                    -
                    {editMemoryId === memory._id ? (
                      <Button
                        variant="info"
                        size="sm"
                        className="rounded-circle mr-2"
                        onClick={() => handleSaveChanges(memory._id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        size="sm"
                        className="rounded-circle mr-2"
                        onClick={() => toggleEditMode(memory._id, memory.title, memory.description)}
                      >
                        <FaPen />
                      </Button>
                    )}
                    {(!memory.isDraft) && (<span>-</span>)}
                    {(!memory.isDraft) && (
                    <Button
                          variant={memory.favorite ? "danger" : "warning"}
                          size="sm"
                          className="rounded-circle mr-2"
                          onClick={() => handleFavorite(memory._id)}
                        >
                          
                          <FaHeart style={{color: memory.favorite ? "red" : "black", backgroundColor: "white"}}/>
                        </Button>
                    )}
                    <span className={`ml-4 mr-2 ${memory.isDraft ? 'text-danger' : ''}`}>
                      {editMemoryId === memory._id ? ' Editing Memory' : 
                        (memory.isDraft ? ' Draft Card' : ' Memory Card')}</span>
                  </Card.Header>
                  <Card.Body>
                    {editMemoryId === memory._id ? (
                      <Form>
                        <Form.Group controlId={`editTitle${idx}`}>
                          <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId={`editDescription${idx}`}>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                    ) : (
                      <>
                        <Card.Title className={`${memory.isDraft ? 'text-danger' : ''}`}>{memory.title}</Card.Title>
                        <Card.Text className={`${memory.isDraft ? 'text-danger' : ''}`}>{memory.description}</Card.Text>
                      </>
                    )}
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

export default Memories;
