function execute() {
    return Response.success([
        {
            title: "Tất cả truyện",
            input: "https://mimihentai.com/api/v1/manga/tatcatruyen?page=0",
            script: "homecontent.js"
        },
        {
            title: "Truyện Ngẫu Nhiên",
            input: "https://mimihentai.com/api/v1/manga/random?limit=100",
            script: "suggest.js"
        }
    ]);
}