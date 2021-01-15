import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    loadScript(scriptUrl) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        document.head.appendChild(script);

        return new Promise((res, rej) => {
            script.onload = function() {
                res();
            }
            script.onerror = function() {
                rej();
            }
        });
    }

    componentDidMount() {
        this.loadScript('https://wemap.asia/assets/js/wemap-gl.js')
            .then(() => {
                console.log('Script loaded!');
                const map = new window.wemapgl.WeMap({
                    container: this.mapContainer,
                    key: 'zZjAMHCwZAHTQqXIvigmZOXNiI',
                    style: 'bright',
                    center: [105.1, 21.0],
                    zoom: 13
                });

                map.on('click', function(e) {
                    console.log(e.lngLat)
                })
            })
            .catch(() => {
                console.error('Script loading failed! Handle this error');
            });
    }

    render() {
        return ( <
            div >
            <
            div ref = { el => this.mapContainer = el }
            className = "mapContainer" / >
            <
            /div>
        )
    }
}

ReactDOM.render( < Application / > , document.getElementById('app'));