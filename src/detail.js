function execute(url) {
    let mangaId = url.split('/').pop();
    let apiUrl = `https://mimihentai.com/api/v1/manga/info/${mangaId}`;
    
    let response = fetch(apiUrl);
    if (!response.ok) return Response.error("Lỗi kết nối API");
    
    let json = response.json();

    // Lấy genres
    let genres = [];
    if (json.genres && json.genres.length > 0) {
        genres = json.genres.map(genre => ({
            title: genre.name,
            input: `https://mimihentai.com/api/v1/manga/manga/by-genre/${genre.id}?page=0`,
            script: "homecontent.js"
        }));
    }

    // Lấy tác giả
    let authors = (json.authors && json.authors.length > 0)
        ? json.authors.map(a => a.name).join(', ')
        : 'Không rõ';

    // Trạng thái
    let ongoing = false;
    if (json.status) {
        let status = json.status.toLowerCase();
        ongoing = status.includes('ongoing') || status.includes('đang') || status.includes('updating');
    }

    // Chi tiết
    let detail = [
        `Lượt xem: ${json.views || 'Chưa có'}`,
        `Người đăng: ${(json.uploader && json.uploader.displayName) || 'Không rõ'}`,
        `Trạng thái: ${ongoing ? 'Đang cập nhật' : 'Hoàn thành'}`,
        `Ngày cập nhật: ${json.lastUpdated ? new Date(json.lastUpdated).toLocaleDateString() : 'Không rõ'}`
    ].join('\n');

    return Response.success({
        name: json.title || '',
        cover: json.coverUrl || '',
        host: "https://mimihentai.com",
        author: authors,
        description: json.description || '',
        detail: detail,
        ongoing: ongoing,
        genres: genres,
        suggests: [
            {
                title: "Truyện Ngẫu Nhiên",
                input: "https://mimihentai.com/api/v1/manga/random?limit=20",
                script: "suggest.js"
            }
        ]
    });
}