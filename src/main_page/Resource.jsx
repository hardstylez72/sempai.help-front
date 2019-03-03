import React, { Component, } from 'react';
import { Grid, Jumbotron, Well, } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import './Resource.css';

class Resource extends Component {
    render() {
        return (
            <Grid>
                <Jumbotron>
                    <h1>The best links for WEB developers</h1>
                    <h2>Frontend :</h2>
                    <p>
                        <a href='https://react-bootstrap.github.io/components/alerts/'>
							React bootstrap
                        </a>
                    </p>
                    <p>
                        <a href='https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp'>
							React bootstrap css + examples
                        </a>
                    </p>
                    <p>
                        <a href='http://html5.by/blog/category/articles/'>HTML5</a>{' '}
                    </p>
                    <p>
                        <a href='http://bootstrap-3.ru/css.php'>Для дауничей</a>{' '}
                    </p>

                    <h2>Backend</h2>
                    <p>
                        <a href='https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w/playlists'>
							Четко про ноду и фронт на инглише
                        </a>{' '}
                    </p>
                    <p>
                        <a href='https://www.youtube.com/watch?v=v0t42xBIYIs'>Лучший в мире</a>{' '}
                    </p>
                    <p>
                        <a href='https://github.com/xingbofeng/Node.js-Design-Patterns-Second-Edition/blob/master/Node.js%20Design%20Patterns%20Second%20Edition.pdf'>
							Node.js patterns
                        </a>{' '}
                    </p>
                    <p>
                        <a href='https://eax.me/nginx/'>Немного про NGINX</a>{' '}
                    </p>
                    <p>
                        <a href='https://certbot.eff.org'>Немного про сертификаты</a>{' '}
                    </p>
                    <p>
                        <a href='https://abraxabra.ru/react.js/bystryy-start/react-js-formy/'>
							REACT гайды на русском{' '}
                        </a>{' '}
                    </p>
                    <p>
                        <a href='https://postgrespro.ru/docs/postgresql/9.6/ddl-alter.html'>
                            {' '}
							PostgreSQL{' '}
                        </a>{' '}
                    </p>
                    <p>
                        <a href='https://www.npmjs.com/package/react-media-player'>
                            {' '}
							audio/video player{' '}
                        </a>{' '}
                    </p>
                    <p>
                        <a href='https://www.digitalocean.com/community/tutorials/nginx-ubuntu-16-04-ru'>
                            {' '}
							NGINX{' '}
                        </a>{' '}
                    </p>
                </Jumbotron>
            </Grid>
        );
    }
}

export default Resource;
