const { CheerioCrawler, Dataset, LogLevel, log } = require('crawlee');

const crawler = async (urls) => {
    // For more information, see https://crawlee.dev/

    // const startUrls = [
    //     'https://www.villagehouse.jp/vi/thue/hokkaido/hokkaido/sapporo-shi-011002/sakuradai-1063/',
    //     'https://www.villagehouse.jp/vi/thue/hokkaido/hokkaido/sapporo-shi-011002/higashi-tsukisamu-1034/',
    // ];

    // Crawlers come with various utilities, e.g. for logging.
    // Here we use debug level of logging to improve the debugging experience.
    // This functionality is optional!
    log.setLevel(LogLevel.DEBUG);

    const results = [];

    const internalCrawler = new CheerioCrawler({
        // The crawler downloads and processes the web pages in parallel, with a concurrency
        // automatically managed based on the available system memory and CPU (see AutoscaledPool class).
        // Here we define some hard limits for the concurrency.
        minConcurrency: 10,
        maxConcurrency: 50,

        // This function will be called for each URL to crawl.
        // It accepts a single parameter, which is an object with options as:
        // https://crawlee.dev/api/cheerio-crawler/interface/CheerioCrawlerOptions#requestHandler
        // We use for demonstration only 2 of them:
        // - request: an instance of the Request class with information such as the URL that is being crawled and HTTP method
        // - $: the cheerio object containing parsed HTML
        async requestHandler({ request, $ }) {
            log.debug(`Processing ${request.url}...`);

            // Extract data from the page using cheerio.
            const house_id = $('.container-instance.container-showcase').attr(
                'data-property-id',
            );

            const title = $('title').text().trim();

            const name = $('h1.container-showcase-heading').text().trim();
            const address = $('.container-showcase-subheading .element-address')
                .text()
                .trim();
            const images = JSON.stringify(
                $('.container-gallery-data')
                    .map((_, elem1) => {
                        return $(elem1)
                            .find('img')
                            .map((__, elem2) => $(elem2).attr('src'))
                            .get();
                    })
                    .get(),
            );

            // traffic
            const traffic_info = JSON.stringify(
                $('.container-information-traffic-left li')
                    .map((_, elem) => {
                        return {
                            label: $(elem)
                                .find('.container-information-list-heading')
                                .text()
                                .trim(),
                            value: $(elem)
                                .find('.container-information-list-annotation')
                                .text()
                                .trim(),
                        };
                    })
                    .get(),
            );
            const traffic_map = $(
                '.container-information-traffic-right img',
            ).attr('src');
            const traffic_coordinates_map = JSON.stringify(
                new URL(traffic_map).searchParams.get('center')?.split(','),
            );

            // house information
            const houseInfoElem = $('.container-information-summary-item');
            const information = JSON.stringify(
                $(houseInfoElem[0])
                    .find('.container-information-list li')
                    .map((index, elem) => $(elem).text().trim())
                    .get(),
            );

            const public_services = JSON.stringify(
                $(houseInfoElem[1])
                    .find('.container-information-list li')
                    .map((index, elem) => {
                        return {
                            label: $(elem)
                                .find('.container-information-list-heading')
                                .text()
                                .trim(),
                            value: $(elem)
                                .find('.container-information-list-annotation')
                                .map((index, elem) => $(elem).text().trim())
                                .get()
                                .join(', '),
                        };
                    })
                    .get(),
            );

            const schools = JSON.stringify(
                $(houseInfoElem[2])
                    .find('.container-information-list li')
                    .map((index, elem) => {
                        return {
                            label: $(elem)
                                .find('.container-information-list-heading')
                                .text()
                                .trim(),
                            value: $(elem)
                                .find('.container-information-list-annotation')
                                .map((index, elem) => $(elem).text().trim())
                                .get()
                                .join(', '),
                        };
                    })
                    .get(),
            );

            // rooms
            const rooms = JSON.stringify(
                $('.container-rooms-group-card')
                    .map((index, elem) => {
                        // .match(/\d+/g)
                        // const slot = $($(elem).find(".container-rooms-group-card-header-brief span")[0]).text().match(/\d+/g);

                        return {
                            // tên phòng
                            name: $(elem).attr('data-name'),
                            // diện tích
                            size: `${$(elem).attr('data-size')}m²`,
                            // giá
                            price: `¥${$(elem).attr('data-rent')}`,
                            // phòng còn trống
                            slots: $(elem)
                                .find(
                                    '.container-rooms-group-card-list-item .container-rooms-group-card-list-item-info',
                                )
                                .map((index, elem) => {
                                    const slotInfo = $(elem).find(
                                        '.container-rooms-group-card-list-item-info-property',
                                    );

                                    return {
                                        // cho thuê
                                        price: $($(slotInfo).find('dl dd')[0])
                                            .text()
                                            .trim(),

                                        // diện tích
                                        size: $($(slotInfo).find('dl dd')[1])
                                            .text()
                                            .trim(),

                                        // phòng
                                        room: $($(slotInfo).find('dl dd')[2])
                                            .text()
                                            .trim(),

                                        // ngày xem phòng
                                        date: $($(slotInfo).find('dl dd')[3])
                                            .text()
                                            .trim(),

                                        features: $(elem)
                                            .find(
                                                '.container-rooms-group-card-list-item-info-feature dl',
                                            )
                                            .map((index, elem) =>
                                                $(elem).text().trim(),
                                            )
                                            .get(),
                                    };
                                })
                                .get(),
                            // detail:
                        };
                    })
                    .get(),
            );

            const phone_number = $(
                '.container-contact-bottom-telephone .container-contact-bottom-telephone-number',
            ).text();

            const result = {
                house_id,
                // url: request.url,
                name,
                address,
                images,

                traffic_info,
                traffic_map,
                traffic_coordinates_map,

                information,
                public_services,
                schools,
                rooms,
                phone_number,
                // crawled_at: new Date().toISOString(),
            };

            results.push(result);

            // console.log(results);
            // Store the results to the dataset. In local configuration,
            // the data will be stored as JSON files in ./storage/datasets/default
            // await Dataset.pushData(result);
        },

        // Comment this option to scrape the full website.
        maxRequestsPerCrawl: 1500,

        // On error, retry each page at most once.
        maxRequestRetries: 1,

        // Increase the timeout for processing of each page.
        requestHandlerTimeoutSecs: 30,

        // This function is called if the page processing failed more than maxRequestRetries + 1 times.
        failedRequestHandler({ request }) {
            log.debug(`Request ${request.url} failed twice.`);
        },
    });

    await internalCrawler.run(urls);
    log.debug('Crawler finished.');

    // do something with the results

    return results;
};

module.exports = crawler;
