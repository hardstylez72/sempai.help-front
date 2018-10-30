export default {
    tree: {

        base: {
            listStyle: 'none',
            backgroundColor: '#b8fcf2',
            margin: '10px',
            color: 'black',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px',
            padding: '10px 0px 10px 5px',
            'borderRadius': '10px',
            'boxShadow': '0 0 2px',
            'maxWidth': '800px',
            
        },
        node: {
            base: {
                'maxWidth': '800px',
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                "textShadow": "1px 1px #42b3f4"
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