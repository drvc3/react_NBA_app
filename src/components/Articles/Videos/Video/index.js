import React, { Component } from 'react';
import { getCollection, getItem } from '../../../../firebase';

import styles from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../Widgets/VideosList/VideosRelated/videosRelated';

class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams: [],
        related: [],
        error: ''
    }

    componentWillMount() {
        getItem('videos', this.props.match.params.id)
            .then((article) => Promise.all([
                article,
                getCollection('teams', { orderBy: 'teamId', equalTo: article.team })
            ]))
            .then(([article, team]) => this.setState({ article, team }, this.getRelated))
            .catch(() => this.setState({ error: 'Unable to load this video.' }))
    }

    getRelated = () => {
        Promise.all([
            getCollection('teams'),
            getCollection('videos', { orderBy: 'team', equalTo: this.state.article.team, limit: 3 })
        ])
            .then(([teams, related]) => this.setState({ teams, related }))
            .catch(() => this.setState({ error: 'Unable to load related videos.' }))


        // axios.get(`${URL}/teams`)
        //     .then(response => {
        //         let teams = response.data

        //         axios.get(`${URL}/videos?q=${this.state.team[0].city}`)
        //             .then(response => {
        //                 this.setState({
        //                     teams,
        //                     related: response.data
        //                 })
        //             })
        //     })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                {this.state.error && <p role="alert">{this.state.error}</p>}
                <Header teamData={team[0]} />
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    />
                </div>
                <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
        )
    }
}

export default VideoArticle;
