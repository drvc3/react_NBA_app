import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCibtXgxI_ZWqKvAze0zz3owXVJsnLU-to",
    authDomain: "nba-app-57e62.firebaseapp.com",
    databaseURL: "https://nba-app-57e62.firebaseio.com",
    projectId: "nba-app-57e62",
    storageBucket: "nba-app-57e62.appspot.com",
    messagingSenderId: "516747975733"
};

firebase.initializeApp(config);

const databaseUrl = config.databaseURL.replace(/\/$/, '');

const requestJson = async (path) => {
    const response = await fetch(`${databaseUrl}/${path}.json`);

    if (!response.ok) {
        throw new Error(`NBA data request failed (${response.status})`);
    }

    return response.json();
}

const normalizeCollection = (data) => Object.keys(data || {}).map((key) => ({
    ...data[key],
    sourceId: data[key].id,
    id: key
}));

const fieldValue = (item, field) => field === 'id' ? item.sourceId : item[field];

const getCollection = async (collection, options = {}) => {
    let items = normalizeCollection(await requestJson(collection));

    if (options.orderBy) {
        items.sort((a, b) => fieldValue(a, options.orderBy) - fieldValue(b, options.orderBy));
    }

    if (options.startAt !== undefined) {
        items = items.filter((item) => fieldValue(item, options.orderBy) >= options.startAt);
    }

    if (options.endAt !== undefined) {
        items = items.filter((item) => fieldValue(item, options.orderBy) <= options.endAt);
    }

    if (options.equalTo !== undefined) {
        items = items.filter((item) => fieldValue(item, options.orderBy) === options.equalTo);
    }

    if (options.limit) {
        items = items.slice(0, options.limit);
    }

    return items;
}

const getItem = (collection, id) => requestJson(`${collection}/${id}`);


export {
    firebase,
    getCollection,
    getItem
}
