import React, { Component } from 'react';
import { getCollection } from '../../../firebase';

import SliderTemplates from './slider_templates';


class NewsSlider extends Component {

    state = {
        news: [],
        error: ''
    }

    componentWillMount() {
        getCollection('articles', { limit: 3 })
            .then((news) => this.setState({ news }))
            .catch(() => this.setState({ error: 'Unable to load featured news.' }))
    }

    render() {
        return (
            <div>
                {this.state.error && <p role="alert">{this.state.error}</p>}
                <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings} />
            </div>
        )
    }
}

export default NewsSlider;
