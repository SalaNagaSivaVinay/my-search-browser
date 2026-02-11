let searchResultArea = document.getElementById('searchResultArea');
let inputResult = document.getElementById('inputResult');

function output(result) {
    let {
        title,
        link,
        description
    } = result;

    let div = document.createElement('div');
    div.classList.add("resultItem");
    searchResultArea.appendChild(div);

    let displayTitle = document.createElement('a');
    displayTitle.classList.add('displayTitle');
    displayTitle.href = link;
    displayTitle.target = '_blank';
    displayTitle.textContent = title;
    div.appendChild(displayTitle);

    let titleBreack = document.createElement('br');
    div.appendChild(titleBreack);

    let displayLink = document.createElement('a');
    displayLink.classList.add('displayLink');
    displayLink.href = link;
    displayLink.target = '_blank';
    displayLink.textContent = link;
    div.appendChild(displayLink);

    let linkBreack = document.createElement('br');
    div.appendChild(linkBreack);

    let descriptionText = document.createElement('p');
    descriptionText.textContent = description;
    div.appendChild(descriptionText);
}

function displayResult(searchResult) {
    for (let result of searchResult) {
        output(result);
    }
}

function searchingText(event) {
    if (event.key === 'Enter') {
        if (inputResult.value.trim() === '') {
            searchResultArea.textContent = '';
        } else {
            let searchingName = inputResult.value.trim();
            console.log(searchingName);
            searchResultArea.textContent = '';

            let url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchingName);
            console.log(url);
            let options = {
                method: 'GET'
            };

            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displayResult(search_results);
                    console.log(search_results);

                });
        }

    }
}

inputResult.addEventListener('keydown', searchingText);