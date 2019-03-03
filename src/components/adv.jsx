import React, { Component, } from 'react';
import Dropzone from 'react-dropzone';
import crypto from 'crypto';
import './adv.css';
import {
    Grid,
    Jumbotron,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Form,
    FieldGroup,
} from 'react-bootstrap';

class Adv extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            blockDropZone  : false,
            files          : [],
            info           : 'Вставьте вашу картинку сюда',
            imagePreviewUrl: '',
            maxWidth       : 500,
            maxHeight      : 500,
            answer         : '',
            imgType        : '',
            serverRes      : {
                data  : '',
                status: '',
            },

        };

        this.onDropRejected=this.onDropRejected.bind(this);
        this.onDropAccepted=this.onDropAccepted.bind(this);
    }

    onDropAccepted(files) {
        const file = files[0];

        if (files[1] !== undefined) {
            this.setState({ info: 'Можно загрузить только 1 файл', });

            return;
        }

        const reader  = new FileReader();

        this.state.info = 'Началась загрузка';
        const self = this;

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                files          : file,
                imagePreviewUrl: reader.result,
            });
            const img = new Image();

            img.src = this.state.imagePreviewUrl;
            const { maxWidth, } = this.state;
            const { maxHeight, } = this.state;

            img.onload = function () {
                if ((this.width > maxWidth) || (this.height > maxHeight))  {
                    self.setState({ info: 'Размер изображения слишком большой', });

                    return;
                }

                const data = {
                    imgType: file.type.replace(/image\//, ''),
                    imgSrc : self.state.imagePreviewUrl.replace(/^data:image\/\w*;base64,/, ''),
                    hash   : '',
                };

                data.hash = crypto.createHash('md5').update(data.imgSrc)
                    .digest('hex');
                fetch('/imgUpload/', {
                    method : 'post',
                    headers: {
                        Accept        : 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(data => {
                        const dataFromServer = JSON.parse(data);

                        self.setState({ info: dataFromServer.status, });
                    })
                    .catch(error => self.setState({ info: 'Ошибка при обмене с сервером', }));
            };
            img.onerror = function () {
                self.setState({ info: 'Неизвестная ошибка', });
            };
        };
    }

    onDropRejected(files) {
        this.setState({ info: 'Неправильный формат файла или файл поврежден', });
    }

    render() {
        let imagePreview = null;
        const { imagePreviewUrl, } = this.state;

        if (imagePreviewUrl) {
            imagePreview = <img src={imagePreviewUrl} />;
        }

        return (
            <Grid>
                <Jumbotron>
                    <div  onFocus={this.onFocus}>
                        <h1>Выбор рекламного банера</h1>
                    </div>
                </Jumbotron>

                <Jumbotron>
                    <div>
                        <h2>Вставьте картинку для рекламы (jpeg/png)</h2>
                    </div>

                    <Dropzone
                        disabled={this.state.blockDropZone}
                        accept='image/jpeg, image/png, image/gif'
                        maxSize = '1000000'
                        className='dropZone'
                        acceptClassName='dropZone-accept'
                        activeClassName='dropZone-active'
                        rejectClassName='dropZone-reject'
                        onDropAccepted={this.onDropAccepted}
                        onDropRejected={this.onDropRejected}
                    >
                        {this.state.info}
                    </Dropzone>
                    {imagePreview}
                </Jumbotron>
            </Grid>
        );
    }
}

export default Adv;
