function execute(url) {
    // Lấy ID chapter từ URL
    var chapterId = url.match(/chapter\/([^?/]+)/);
    if (!chapterId) return Response.error("Không tìm được ID chapter");
    chapterId = chapterId[1];

    // Thử lấy ảnh từ API trước
    try {
        var apiResponse = Http.get('https://mimihentai.com/api/v1/manga/chapter?id=' + chapterId).json();
        if (apiResponse && apiResponse.pages && apiResponse.pages.length > 0) {
            var imgs = apiResponse.pages.map(function(page) {
                return {
                    url: page,
                    headers: {
                        "Referer": "https://mimihentai.com/"
                    }
                };
            });
            return Response.success(imgs);
        }
    } catch (e) {
        // Nếu API lỗi hoặc trả về 404, tiếp tục với cách cũ
    }

    // Fallback: Lấy ảnh từ HTML nếu API không hoạt động
    var doc = Http.get(url).html();
    if (!doc) return Response.error("Không tải được trang");

    var imgs = doc.select("div.chapter-content img").map(function(e) {
        return {
            url: e.attr("src"),
            headers: {
                "Referer": "https://mimihentai.com/"
            }
        };
    });

    if (!imgs || imgs.length === 0) {
        return Response.error("Không tìm thấy ảnh trong chapter");
    }

    return Response.success(imgs);
}
