'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tree: {

        base: {
            listStyle: 'none',
            backgroundColor: '#b8fcf2',
            margin: '10px',
            padding: 0,
            color: 'black',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px',
            padding: '10px 0px 10px 5px',
            'border-radius': '10px',
            'box-shadow': '0 0 2px',
            'max-width': '600px',
            
        },
        node: {
            base: {
                'max-width': '600px',
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                "text-shadow": "1px 1px #42b3f4"
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#9DA5AB', //Цвет стрелки
                    strokeWidth: 0
                }
            },
            header: {
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};