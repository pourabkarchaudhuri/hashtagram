const Axios = require('axios');
const _ = require('lodash');
const defaults = require('./../../config/defaults');
// const topParser = require('./post-parser');

module.exports = async function(_hashtag) {

    try {
        let response = await Axios({
            baseURL: defaults.URL_INSTAGRAM_EXPLORE_TAGS,
            url: '/' + _hashtag,
            method: 'get',
            params: {
                __a: 1
            },
            headers: {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"}
        });
        if (typeof _response === 'string') {
            if (_response.includes("Page Not Found")) {
                return { err: 'Page Not Found' };
            } else {
                return { err: _response };
            }
        } else {
            // console.log(JSON.stringify(response.data.graphql.hashtag.edge_hashtag_to_related_tags))
            let data = response.data.graphql.hashtag.edge_hashtag_to_related_tags.edges
            

            
            return data;
        }

    } catch (error) {
        console.log("Error");
        return { err: error.message };
    }
}