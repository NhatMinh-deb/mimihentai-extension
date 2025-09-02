function execute() {
    let apiUrl = "https://mimihentai.com/api/v1/manga/genres";
    let response = fetch(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let genres = response.json();
    let data = genres
        .filter(genre => genre.mangaCount > 0)
        .sort((a, b) => b.mangaCount - a.mangaCount)
        .slice(0, 100)
        .map(genre => ({
            title: `${genre.name} (${genre.mangaCount})`,
            input: `https://mimihentai.com/api/v1/manga/manga/by-genre/${genre.id}?page=0`,
            script: "gen.js"
        }));
    
    return Response.success(data);
}