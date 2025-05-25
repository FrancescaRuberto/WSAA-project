document.addEventListener("DOMContentLoaded", () => {
    const actionSelect = document.getElementById("actionSelect");

    actionSelect.addEventListener("change", () => {
        document.querySelectorAll(".section").forEach(s => s.style.display = "none");
        const selected = actionSelect.value;
        if (selected) {
            document.getElementById(selected).style.display = "block";
            if (selected === "view") getAllAnime();
        }
    });

    // VIEW ALL ANIME (GET ALL)
    async function getAllAnime() {
        const container = document.getElementById("animeList");
        try {
            const res = await fetch("/anime");
            const data = await res.json();

            if (!Array.isArray(data)) {
                container.innerHTML = "<p class='text-danger'>Error: Invalid data format</p>";
                return;
            }

            let html = data.length === 0 ? "<p>No anime found</p>" : `
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th><th>Title</th><th>Author</th><th>Year</th>
                            <th>Studio</th><th>Seasons</th><th>Episodes</th><th>Manga</th><th>Rating</th>
                            <th>Genre</th><th>Category</th><th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(anime => `
                            <tr>
                                <td>${anime.id}</td>
                                <td>${anime.title || "-"}</td>
                                <td>${anime.author || "-"}</td>
                                <td>${anime.release_year || "-"}</td>
                                <td>${anime.studio || "-"}</td>
                                <td>${anime.seasons || "-"}</td>
                                <td>${anime.episodes || "-"}</td>
                                <td>${anime.is_manga ? "Yes" : "No"}</td>
                                <td>${anime.rating || "-"}</td>
                                <td>${anime.genre || "-"}</td>
                                <td>${anime.category || "-"}</td>
                                <td>${anime.original_language || "-"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>`;
            container.innerHTML = html;
        } catch (err) {
            console.error("Error:", err);
            container.innerHTML = `<p class='text-danger'>Failed to load anime: ${err.message}</p>`;
        }
    }

    // SEARCH ANIME BY ID (GET ONE)
    document.getElementById("searchForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = e.target.elements["id"].value;
        try {
            const res = await fetch(`/anime/${id}`);
            const data = await res.json();
            const resultDiv = document.getElementById("searchResult");
            
            if (data.message) {
                resultDiv.innerHTML = `<p class="text-danger">${data.message}</p>`;
            } else {
                resultDiv.innerHTML = `
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5>${data.title}</h5>
                            <p><strong>ID:</strong> ${data.id}</p>
                            <p><strong>Author:</strong> ${data.author}</p>
                            <p><strong>Year:</strong> ${data.release_year}</p>
                            <p><strong>Studio:</strong> ${data.studio}</p>
                            <p><strong>Rating:</strong> ${data.rating}</p>
                            <p><strong>Seasons:</strong> ${data.seasons}</p>
                            <p><strong>Episodes:</strong> ${data.episodes}</p>
                            <p><strong>Original Language:</strong> ${data.original_language}</p>
                        </div>
                    </div>`;
            }
        } catch (err) {
            console.error("Error:", err);
            document.getElementById("searchResult").innerHTML = 
                `<p class='text-danger'>Search failed: ${err.message}</p>`;
        }
    });

    // CREATE ANIME (POST)
    document.getElementById("addAnimeForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const animeData = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch("/anime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(animeData)
            });
            const result = await res.json();
            alert(`Anime created with ID: ${result.id}`);
            e.target.reset();
            getAllAnime();
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to create anime");
        }
    });

        // UPDATE ANIME (PUT)
    // <--- Search anime to edit --->
    document.getElementById("searchFormEdit").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("edit_id").value;
        
        try {
            const response = await fetch(`/anime/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Anime not found");
            }
            
            const anime = await response.json();
            populateEditForm(anime);
            document.getElementById("updateAnimeForm").style.display = "block";
            document.getElementById("editResult").innerHTML = "";
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("editResult").innerHTML = `
                <div class="alert alert-danger mt-3">${error.message}</div>`;
        }
    });

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
            
            const result = await response.json();  // Read Json response
            
            if (!response.ok) {
                throw new Error(result.message || result.error || "Update failed");  // Edited to use message in the beckend
            }
            
            alert("Anime updated successfully");
            document.getElementById("updateAnimeForm").style.display = "none";
            document.getElementById("searchFormEdit").reset();
            getAllAnime();
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("editResult").innerHTML = `  
                <div class="alert alert-danger mt-3">${error.message}</div>`;
        }
    });

    // Helper functions 
    function populateEditForm(anime) {
        const form = document.getElementById("updateAnimeForm");
        const fields = {
            'animeId': anime.id,
            'title': anime.title,
            'author': anime.author,
            'release_year': anime.release_year,
            'studio': anime.studio,
            'seasons': anime.seasons,
            'episodes': anime.episodes,
            'is_manga': anime.is_manga === "Yes" || anime.is_manga === true,  // Added fix to control true
            'rating': anime.rating,
            'genre': anime.genre,
            'category': anime.category,
            'original_language': anime.original_language
        };
        
        for (const [fieldId, value] of Object.entries(fields)) {
            const element = form.querySelector(`#${fieldId}`);
            if (!element) continue;
            element.type === "checkbox" ? (element.checked = value) : (element.value = value || "");
        }
    }

    function getAnimeFromForm(formId) {
        const form = document.getElementById(formId);
        const formData = {};
        
        form.querySelectorAll("input, select").forEach(element => {
            if (element.name && element.name !== 'id') {  // Added fix to exclude id
                formData[element.name] = element.type === "checkbox" 
                    ? (element.checked ? "Yes" : "No")
                    : element.value;
            }
        });
        return formData;
    }
});

// DELETE ANIME (DELETE)
    document.getElementById("deleteForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = e.target.elements["id"].value;
        const confirmed = e.target.elements["confirmDelete"].checked;
        
        if (!confirmed) {
            alert("You must confirm deletion");
            return;
        }
        
        try {
            const res = await fetch(`/anime/${id}`, { method: "DELETE" });
            const data = await res.json();
            alert(data.message || "Deleted successfully");
            e.target.reset();
            getAllAnime();
        } catch (err) {
            console.error("Error:", err);
            alert("Delete failed");
        }
    });