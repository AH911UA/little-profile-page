import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './style.css'


export default function WeatherViewItem({weather})
{
//{ weather.date }
    return (
        <>
            <Card id="card" variant="danger" className="mt-3 mb-3">
                <div className="w-25 align-self-end mr-3">
                    <Card.Img variant="top" src={weather.ico}/>
                </div>
                <Card.Body>
                    <Card.Text className="d-flex justify-content-between">
                        <div>{weather.date}</div>
                        <div>{weather.description}</div>
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem action variant="primary">
                        t : {weather.temp}<span>{'\u00b0'}</span> <i class="fa fa-thermometer-half"></i>
                    </ListGroupItem>
                    <ListGroupItem action variant="primary">
                        min t : {weather.temp_min}<span>{'\u00b0'}</span> <i class="fa fa-thermometer-empty"></i>
                    </ListGroupItem>
                    <ListGroupItem action variant="primary">
                        max t : {weather.temp_max}<span>{'\u00b0'}</span> <i class="fa fa-thermometer-full"></i>
                    </ListGroupItem>
                    <ListGroupItem action variant="primary">
                        humidity : {weather.humidity}<span>m/s</span> <i class="fa fa-tachometer-alt"></i>
                    </ListGroupItem>
                </ListGroup>
                {/* <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body> */}
            </Card>
              
        </>
    );
}