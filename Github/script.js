var form = document.querySelector('.myform');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    var search = document.querySelector('#user').value;
    var originalName = search.split(' ').join('');
    alert(originalName);

    fetch("https://api.github.com/users/" + search)
    .then((result) => {
        if (!result.ok) {
            throw new Error('User not found');
        }
        return result.json();
    })
    .then((userData) =>{
        console.log(userData);
        document.querySelector('#section').innerHTML = '';
        document.querySelector('#section').innerHTML =
    
        `<div class="col1 common-col">
            <div class="usr-details">
                <div id="usr-img">
                    <a target ="_blank" href ="https://www.github.com/${originalName}"><img src="${userData.avatar_url}" alt="${userData.name}"></a>
                </div>
                <div id="usr-name">
                    ${userData.name}
                </div>
            </div>

            <div class="add-details">
                <div class="achieve">
                    <div class="ach-name">
                        Email
                    </div>
                    <div id="ach-val">
                        ${userData.email}
                    </div>
                </div>    
                <div class="achieve">
                    <div class="ach-name">
                        Public Repositories
                    </div>
                    <div id="ach-val">
                        ${userData.public_repos}
                    </div>
                </div>
                <div class="achieve">
                    <div class="ach-name">
                        Gists
                    </div>
                    <div id="ach-val">
                        ${userData.public_gists}
                    </div>
                </div>
                <div class="achieve">
                    <div class="ach-name">
                        Followers
                    </div>
                    <div id="ach-val">
                        ${userData.followers}
                    </div>
                </div>
                <div class="achieve">
                    <div class="ach-name">
                        Following
                    </div>
                    <div id="ach-val">
                        ${userData.following}
                    </div>
                </div>
            </div>
        </div>`;

        fetch(`https://api.github.com/users/${search}/repos`)
        .then((reposResult) => reposResult.json())
        .then((reposData) => {
            var repoHTML = '';
            reposData.forEach((repo) => {
                repoHTML += `
                    <div class="repo-box">
                        <div class="repo-name">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="time">
                            ${new Date(repo.updated_at).toLocaleString()}
                        </div>
                    </div>`;
            });
            document.querySelector('#section').innerHTML += `
            <div class="col2 common-col">    
                <div class="col2-head">
                        <input type="text" placeholder="Search Repository Here...">
                        <i class="fas fa-search"></i>
                    </div>
                ${repoHTML}
            </div>
            `;
        });
    })
    .catch(error => {
        document.querySelector('.hero-content').innerHTML += '<div class = "error"> Username does not exist </div>';
    });
});
