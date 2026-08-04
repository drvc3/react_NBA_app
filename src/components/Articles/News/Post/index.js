import React, { Component } from 'react';
import { getCollection, getItem } from '../../../../firebase';
import { assetUrl } from '../../../../config';

import styles from '../../articles.css';
import Header from './header';

class NewsArticles extends Component {
    state = {
        article: [],
        team: [],
        error: ''
    }

    componentWillMount() {
        getItem('articles', this.props.match.params.id)
            .then((article) => Promise.all([
                article,
                getCollection('teams', { orderBy: 'teamId', equalTo: article.team })
            ]))
            .then(([article, team]) => this.setState({ article, team }))
            .catch(() => this.setState({ error: 'Unable to load this article.' }))
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div className={styles.articleWrapper}>
                {this.state.error && <p role="alert">{this.state.error}</p>}
                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            background: article.image ? `url('${assetUrl(`images/articles/${article.image}`)}')` : 'none'
                        }}
                    ></div>
                    <div className={styles.articleText}>
                        {article.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsArticles;
