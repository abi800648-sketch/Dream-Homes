let properties = JSON.parse(localStorage.getItem("properties")) || [];

const saveToStorage = () => {
    localStorage.setItem("properties", JSON.stringify(properties));
};

const displayProperties = () => {
    const list = document.getElementById("propertyList");
    if (!list) return;

    list.innerHTML = "";

    properties.forEach((p, index) => {
        list.innerHTML += `
            <div class="property-card">
                <h3>${p.title}</h3>
                <p>Price: ${p.price}</p>
                <p>Location: ${p.location}</p>
                <button onclick="editProperty(${index})">Edit</button>
                <button onclick="deleteProperty(${index})">Delete</button>
            </div>
        `;
    });
};

document.getElementById("propertyForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("propertyId").value;
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;

    const newProperty = { title, price, location };

    if (id === "") {
        properties.push(newProperty); // CREATE
    } else {
        properties[id] = newProperty; // UPDATE
    }

    saveToStorage();
    displayProperties();
    e.target.reset();
});

function editProperty(index) {
    const p = properties[index];
    document.getElementById("propertyId").value = index;
    document.getElementById("title").value = p.title;
    document.getElementById("price").value = p.price;
    document.getElementById("location").value = p.location;
}

function deleteProperty(index) {
    properties.splice(index, 1);
    saveToStorage();
    displayProperties();
}

displayProperties(); // initialize
