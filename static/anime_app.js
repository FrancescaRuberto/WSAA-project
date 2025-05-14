
document.addEventListener("DOMContentLoaded", () => {
    const actionSelect = document.getElementById("actionSelect");

    actionSelect.addEventListener("change", () => {
        document.querySelectorAll(".section").forEach(s => s.style.display = "none");
        const selected = actionSelect.value;
        if (selected) document.getElementById(selected).style.display = "block";
        if (selected === "view") getAllAnime();
    });


// Load all anime (GET all)
async function getAllAnime() {
    const container = document.getElementById("animeList");
    try {
        const res = await fetch("/anime");
        const data = await res.json();
        if (Array.isArray(data)) {
            if (data.length === 0) {
                container.innerHTML = "<p>No anime in the database.</p>";
                return;
            }

            let html = `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th><th>Title</th><th>Author</th><th>Year</th>
                            <th>Studio</th><th>Is Manga</th><th>Rating</th>
                            <th>Genre</th><th>Category</th><th>Language</th>
                        </tr>
                    </thead>
                    <tbody>`;
            data.forEach(a => {
                html += `<tr>
                    <td>${a.id}</td>
                    <td>${a.title}</td>
                    <td>${a.author}</td>
                    <td>${a.release_year ?? "-"}</td>
                    <td>${a.studio ?? "-"}</td>
                    <td>${a.is_manga ?? "-"}</td>
                    <td>${a.rating ?? "-"}</td>
                    <td>${a.genre ?? "-"}</td>
                    <td>${a.category ?? "-"}</td>
                    <td>${a.original_language ?? "-"}</td>
                </tr>`;
            });
            html += "</tbody></table>";
            container.innerHTML = html;
        } else {
            container.innerHTML = "<p>Error fetching data.</p>";
        }
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p class='text-danger'>Failed to fetch anime list</p>";
    }
}


// Populate form with anime data
function populateEditForm(anime) {
    const form = document.getElementById("updateAnimeForm");
    form.style.display = "block";
    form.querySelector("#animeId").value = anime.id || "";
    form.querySelector("#title").value = anime.title || "";
    form.querySelector("#author").value = anime.author || "";
    form.querySelector("#release_year").value = anime.release_year || "";
    form.querySelector("#studio").value = anime.studio || "";
    form.querySelector("#is_manga").checked = (anime.is_manga === "Yes");
    form.querySelector("#rating").value = anime.rating || "";
    form.querySelector("#genre").value = anime.genre || "";
    form.querySelector("#category").value = anime.category || "";
    form.querySelector("#original_language").value = anime.original_language || "";
}


// SEARCH for anime by ID
document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.elements["id"].value; // Obtain ID from the form
    try {
        const res = await fetch(`/anime/${id}`); // Get to obtain anime
        const data = await res.json();

        // Log answer
        console.log("Search Result:", data);

        const result = document.getElementById("searchResult");
        result.innerHTML = "";  // Clean up results

        if (data.message) {  // If anime not found
            result.innerHTML = `<p class="text-danger">Anime non trovato con ID: ${id}</p>`;
        } else {  // If anime found
            result.innerHTML = `
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Author:</strong> ${data.author}</p>
                <p><strong>Release Year:</strong> ${data.release_year}</p>
                <p><strong>Studio:</strong> ${data.studio}</p>
                <p><strong>Is Manga:</strong> ${data.is_manga}</p>
                <p><strong>Rating:</strong> ${data.rating}</p>
                <p><strong>Genre:</strong> ${data.genre}</p>
                <p><strong>Category:</strong> ${data.category}</p>
                <p><strong>Language:</strong> ${data.original_language}</p>
            `;
        }
    } catch (err) {
        console.error("Error fetching anime:", err);
        document.getElementById("searchResult").innerHTML = "<p class='text-danger'>Failed to fetch anime details.</p>";
    }
});

// CREATE
    document.getElementById("addAnimeForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const anime = getAnimeFromForm("addAnimeForm");
        try {
            const res = await fetch("/anime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(anime)
            });
            const data = await res.json();
            alert("Anime created with ID: " + data.id);
            e.target.reset();
            getAllAnime();
        } catch (err) {
            console.error(err);
        }
    });

// DELETE
    document.getElementById("deleteForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = e.target.elements["id"].value;
        const confirmed = e.target.elements["confirmDelete"].checked;
        if (!confirmed) {
            alert("You must confirm deletion.");
            return;
        }
        try {
            const res = await fetch(`/anime/${id}`, { method: "DELETE" });
            const data = await res.json();
            alert(data.message);
            e.target.reset();
            getAllAnime();
        } catch (err) {
            console.error(err);
        }
    });


// Update anime
document.getElementById("searchFormEdit").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("edit_id").value;
    
    try {
        // 1. Search anime by id
        const response = await fetch(`/anime/${id}`);
        if (!response.ok) throw new Error("Anime non trovato");
        
        const anime = await response.json();
        
        // 2. Fill update form
        populateEditForm(anime);
        
        // 3. Show form and hide the rest
        document.getElementById("updateAnimeForm").style.display = "block";
        document.getElementById("editResult").innerHTML = "";
        
    } catch (error) {
        console.error("Errore:", error);
        document.getElementById("editResult").innerHTML = `
            <div class="alert alert-danger mt-3">${error.message}</div>
        `;
    }
});

// Send update form
document.getElementById("updateAnimeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("animeId").value;
    const animeData = getAnimeFromForm("updateAnimeForm");
    
    try {
        const response = await fetch(`/anime/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(animeData)
        });
        
        if (!response.ok) throw new Error("Errore nell'aggiornamento");
        
        const result = await response.json();
        alert("Anime aggiornato con successo!");
        
        // Reset UI
        document.getElementById("updateAnimeForm").style.display = "none";
        document.getElementById("searchFormEdit").reset();
        getAllAnime(); 
        
    } catch (error) {
        console.error("Errore:", error);
        alert(error.message);
    }
});

// Funzione migliorata per il popolamento del form
function populateEditForm(anime) {
    const form = document.getElementById("updateAnimeForm");
    
    // Mappa tutti i campi
    const fields = {
        'animeId': anime.id,
        'title': anime.title,
        'author': anime.author,
        'release_year': anime.release_year,
        'studio': anime.studio,
        'is_manga': anime.is_manga === "Yes",
        'rating': anime.rating,
        'genre': anime.genre,
        'category': anime.category,
        'original_language': anime.original_language
    };
    
    // Popola ogni campo
    for (const [fieldId, value] of Object.entries(fields)) {
        const element = form.querySelector(`#${fieldId}`);
        if (!element) continue;
        
        if (element.type === "checkbox") {
            element.checked = value;
        } else {
            element.value = value || "";
        }
    }
}

// Funzione migliorata per ottenere i dati dal form
function getAnimeFromForm(formId) {
    const form = document.getElementById(formId);
    const formData = {};
    
    form.querySelectorAll("input, select, textarea").forEach(element => {
        if (element.name) {
            formData[element.name] = element.type === "checkbox" 
                ? (element.checked ? "Yes" : "No")
                : element.value;
        }
    });
    
    return formData;
}