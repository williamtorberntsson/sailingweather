const FetchData = (url) => {
    //console.log("Fetch some smhi data!");
    return fetch(url)
        .then(resp => resp.json())
        .then(json => json)
}

export default FetchData;