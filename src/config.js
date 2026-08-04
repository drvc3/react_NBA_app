const CURRENT_YEAR = (new Date()).getFullYear()

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const assetUrl = (path) => `${PUBLIC_URL}/${path.replace(/^\/+/, '')}`;

export {
    CURRENT_YEAR,
    assetUrl
}
