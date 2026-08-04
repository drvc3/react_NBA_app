import React, { Component } from 'react';
import styles from './videosList.css';
import { getCollection } from '../../../firebase';

import Button from '../Buttons/buttons';
import VideosTemplate from './videosListTemplate';

class VideosList extends Component {
    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        error: ''
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end)
    }

    request = (start, end) => {
        if (this.state.teams.length < 1) {
            getCollection('teams')
                .then((teams) => this.setState({ teams }))
                .catch(() => this.setState({ error: 'Unable to load team data.' }))
        }
        getCollection('videos', { orderBy: 'id', startAt: start, endAt: end })
            .then((videos) => {
                this.setState({
                    videos: [...this.state.videos, ...videos],
                    start,
                    end
                })
            })
            .catch(() => this.setState({ error: 'Unable to load videos.' }))
    }

    renderVideos = () => {
        let template = null;
        switch (this.props.type) {
            case ('card'):
                template = <VideosTemplate
                    data={this.state.videos}
                    teams={this.state.teams} />
                break;
            default:
                template = null;
        }
        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)
    }

    renderButton = () => {
        return this.props.loadmore ?
            <Button type="loadmore" loadMore={() => this.loadMore()} cta="Load More Videos" />
            :
            <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    }

    renderTitle = () => {
        return this.props.title ?
            <h3><strong>NBA</strong> videos</h3>
            : null
    }

    render() {
        return (
            <div className={styles.videoList_wrapper}>
                {this.state.error && <p role="alert">{this.state.error}</p>}
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList;
