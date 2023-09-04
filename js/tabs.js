let tabs = [
    {
        id: 1,
        name: "Hello CodePen",
        body: ` <header class="container">
        <h1 class="display-4 text-center">Welcome to My Article</h1>
        <p class="lead">Published on September 4, 2023</p>
    </header>

    <article class="container mt-4">
        <h2>Main Heading</h2>
        <p class="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla ipsum eget quam gravida, non dignissim orci mattis.
            Nullam ac odio eu justo volutpat interdum vel non libero. Fusce vel euismod nulla. Cras non consequat est.
        </p>

        <h3>Subheading 1</h3>
        <p>
            Proin dictum lacinia risus, id sagittis dolor tincidunt id. Integer eget orci at dolor blandit sollicitudin. In hac habitasse platea dictumst.
        </p>

        <h3>Subheading 2</h3>
        <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc eleifend metus id quam venenatis, id mattis odio laoreet.
        </p>

        <blockquote class="blockquote">
            <p class="mb-0">"A famous quote relevant to your article."</p>
        </blockquote>

        <h2>Conclusion</h2>
        <p>
            In summary, this article discussed various topics related to the subject matter. It's important to note that you can include images, links, and other multimedia elements to enhance your article.
        </p>
    </article>

    <footer class="container mt-4">
        <p>© 2023 YourWebsite.com</p>
    </footer>`
    },
    {
        id: 2,
        name: "Hi CodePen",
        body: `<header>
        <h1>Welcome to My Article</h1>
        <p>Published on September 4, 2023</p>
    </header>

    <article>
        <h2>Main Heading</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla ipsum eget quam gravida, non dignissim orci mattis.
            Nullam ac odio eu justo volutpat interdum vel non libero. Fusce vel euismod nulla. Cras non consequat est.
        </p>

        <h3>Subheading 1</h3>
        <p>
            Proin dictum lacinia risus, id sagittis dolor tincidunt id. Integer eget orci at dolor blandit sollicitudin. In hac habitasse platea dictumst.
        </p>

        <h3>Subheading 2</h3>
        <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc eleifend metus id quam venenatis, id mattis odio laoreet.
        </p>

        <blockquote>
            <p>"A famous quote relevant to your article."</p>
        </blockquote>

        <h2>Conclusion</h2>
        <p>
            In summary, this article discussed various topics related to the subject matter. It's important to note that you can include images, links, and other multimedia elements to enhance your article.
        </p>
    </article>

    <footer>
        <p>© 2023 YourWebsite.com</p>
    </footer>
`
    },
    {
        id: 3,
        name: "Hey CodePen",
        body: ``
    }
];

const tabsHeader = document.getElementById("tabs-header");
const tabContent = document.getElementById("tab-content");
const addTabButton = document.getElementById("add-tab");

function ActiveTab()
{
    let currentTabId = localStorage.getItem("currentTabId");
    if(currentTabId)
    {
        return parseInt(currentTabId);
    }
    if(tabs.length > 0)
    {
        currentTabId = tabs[0].id;
        changeTab(currentTabId);
        return currentTabId;
    }
    throw new Error("Tab not found !!!");
}

function changeTab(id){
    localStorage.setItem("currentTabId", id);
    render();
}

function renderTabsHeader()
{
    tabsHeader.innerHTML = '';
    let html = '';
    tabs.forEach(tab => {
        let active = tab.id == ActiveTab() ? '-active' : '';
        html += (`
            <div class="tab ${active}" data-tabId="${tab.id}">
                <p class="text">${tab.name}</p> 
                <div class="close-button"></div>
            </div>
        `);
    });

    tabsHeader.innerHTML = html;

    let headers = document.querySelectorAll("#tabs-header > .tab");
    
    headers.forEach(header => {
        const text = header.querySelector("p.text");
        const close = header.querySelector("div.close-button");
        
        header.addEventListener('click', function(e) {
            changeTab(header.getAttribute("data-tabId"));
        })

        close.addEventListener('click', function(e){
            const tabId = header.getAttribute("data-tabId");
            const callback = onDeleteCallback(tabId);
            tabs = tabs.filter(item => item.id != tabId);
            e.preventDefault();
            e.stopPropagation();
            changeTab(callback);
        })
    })
}

function renderTabsContent()
{
    tabContent.innerHTML = '';
    let html = '';
    tabs.forEach(tab => {
        let active = tab.id == ActiveTab() ? '-active' : '';
        html += `<div class="tab-content ${active} enable-bootstrap">
            ${tab.body}
        </div>`;
    }); 
    tabContent.innerHTML = html;
}

function addTab()
{
    const tab = {
        id : tabs.length + 1,
        name : 'new tab',
        body : ''
    }

    tabs.push(tab);
    changeTab(tab.id);
}


function render(){
    renderTabsHeader();
    renderTabsContent();
}

function onDeleteCallback(tabId){
    let index = tabs.findIndex(tab => tab.id === parseInt(tabId));
    switch (parseInt(index)) {
        case 0:
            return tabs.length > 1 ? tabs[1].id : null;
        default:
            return tabs[index - 1].id;
    }
}

render();

addTabButton.addEventListener('click', function(){
    addTab();
});