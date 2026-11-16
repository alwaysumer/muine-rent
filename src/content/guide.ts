import type { Locale } from "@/i18n/routing";

/**
 * Mui Ne & Sea Links City guide. On-site facilities listed here are the ones visible in the owner's
 * territory photos (public/images/sea-links-city). Distances reuse the homepage table (home.location);
 * values marked ~ are estimates. Keep in sync with public/llms.txt.
 */
export interface GuideSection { id: string; title: string; text: string; points: string[]; image: string; imageAlt: string; image2?: string; image2Alt?: string }
export interface GuideContent {
  metaTitle: string; metaDescription: string;
  eyebrow: string; title: string; intro: string; contents: string; home: string;
  sections: GuideSection[];
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  browse: string;
}

const img = (n: string) => `/images/sea-links-city/${n}.jpg`;

export const guide: Record<Locale, GuideContent> = {
  en: {
    metaTitle: "Mui Ne & Sea Links City Guide: Beach, Seasons, Getting There",
    metaDescription: "Practical guide to Sea Links City and Mui Ne, Vietnam: what is inside the complex, the beach and pools, golf and the wine castle, seasons, how to get there and what to see nearby.",
    eyebrow: "Guide", title: "Mui Ne & Sea Links City guide",
    intro: "Everything useful to know before you stay in an Ocean Vista apartment or a Sea Links villa: what is inside the complex, when to come, how to get here and what to see nearby.",
    contents: "On this page", home: "Home",
    sections: [
      {
        id: "sea-links-city", title: "What Sea Links City is",
        text: "Sea Links City is a gated resort complex at Km 9 Nguyen Thong, on the coast road between Phan Thiet and the Mui Ne beach strip. It combines the Ocean Vista apartment blocks next to the beach, streets of two-storey villas on the hill, an 18-hole golf course and the Sea Links wine castle.",
        points: ["Ocean Vista: apartment blocks A–F set in a coconut-palm park", "Sea Links villas: two-storey houses with gardens on quiet streets", "Gated territory with security and cameras", "Signposted walking paths between blocks, pool, tennis and the beach"],
        image: img("30"), imageAlt: "Ocean Vista sign at the entrance to the complex in Sea Links City", image2: "/images/ocean-vista-pool-wide.jpg", image2Alt: "Ocean Vista pool area with sun loungers surrounded by coconut palms",
      },
      {
        id: "beach-pools", title: "Beach and pools",
        text: "The Sea Links beach is across the coast road from Ocean Vista: a wide sandy beach with coconut palms, thatched umbrellas and sun loungers, with outdoor showers at the entrance. Inside the complex there is the large Ocean Pool with loungers and a poolside café.",
        points: ["Sandy beach with umbrellas, loungers and showers", "Ocean Pool: large outdoor pool with a shallow area", "Lagoon pool running along the ground-floor terraces of Block A", "Cafés and a seafood BBQ restaurant by the beach road"],
        image: img("21"), imageAlt: "Sea Links beach with coconut palms, thatched umbrellas and sun loungers", image2: "/images/ocean-vista-pool-loungers.jpg", image2Alt: "Pool at Ocean Vista with umbrellas and sun loungers under the palms",
      },
      {
        id: "on-site", title: "What is on site",
        text: "Daily life is covered without leaving the complex. Everything below is inside the territory or at its entrance.",
        points: ["Tennis and pickleball courts", "Children's playgrounds and outdoor exercise equipment", "Free covered parking for cars and motorbikes under the blocks", "Vietcombank ATM (24 h) at the entrance", "Electric buggy station for rides inside the complex", "Coffee shop, BBQ restaurant and a small organic garden", "Supermarkets and markets are a short ride away in Phan Thiet and Ham Tien"],
        image: img("17"), imageAlt: "Ocean Vista tennis and pickleball courts surrounded by trees", image2: "/images/ocean-vista-tennis-aerial.jpg", image2Alt: "Aerial view of the tennis courts next to the Ocean Vista blocks",
      },
      {
        id: "golf-castle", title: "Golf and the wine castle",
        text: "The Sea Links golf course is an 18-hole course laid out over the dunes above the sea, a few minutes from the apartments and villas. Next to it stands the Sea Links wine castle, a landmark stone castle with a wine cellar and tastings.",
        points: ["18-hole golf course with sea views", "Wine castle with cellar and tastings", "Both are inside Sea Links City, a short buggy or taxi ride away"],
        image: "/images/sea-links-castle.jpg", imageAlt: "Sea Links wine castle with stone towers above a vineyard", image2: "/images/sea-links-castle-aerial.jpg", image2Alt: "Sea Links wine castle lit up in the evening, aerial view with the golf course behind",
      },
      {
        id: "seasons", title: "Seasons and weather",
        text: "Mui Ne is one of the driest places in Vietnam and is warm all year. The dry season runs from November to April, with steady wind from November to March that makes Mui Ne a well-known kitesurfing spot. From May to October the sea is calmer, there are short afternoon showers and prices are lower.",
        points: ["November – April: dry, sunny, windy; high season", "May – October: calmer sea, short showers, fewer people", "Rental prices follow the season: see the price table on each home's page"],
        image: img("46"), imageAlt: "Surfers and swimmers in the waves on the Mui Ne coast",
      },
      {
        id: "getting-there", title: "Getting there",
        text: "Most guests arrive via Ho Chi Minh City (Tan Son Nhat airport, SGN), about 200 km away. The expressway to Phan Thiet makes the drive about 2.5–3 hours by car or private transfer. There are also sleeper buses and a train from Saigon to Phan Thiet, then a 15–20 minute taxi.",
        points: ["Private transfer or taxi from Ho Chi Minh City: ~2.5–3 h", "Buses from Ho Chi Minh City to Mui Ne pass along the coast road", "Train Saigon – Phan Thiet, then taxi to Sea Links City", "Around the area: taxi and ride-hailing apps, rented motorbike, local bus between Phan Thiet and Mui Ne", "We can arrange a transfer on request: just message us"],
        image: img("42"), imageAlt: "Sea Links City gate over the entrance road",
      },
      {
        id: "nearby", title: "What to see nearby",
        text: "Sea Links City sits between Phan Thiet and Mui Ne, so the main sights of both are a short ride away.",
        points: ["Ham Tien / Mui Ne beach strip: restaurants, kite schools, shops (~12 km)", "Fairy Stream (Suoi Tien): a walk along a shallow stream between red cliffs", "Red Sand Dunes (~15 km) and White Sand Dunes (~40 km)", "Mui Ne fishing harbour with hundreds of boats", "Po Sah Inu Cham towers on the hill above Phan Thiet", "Phan Thiet city: markets, seafood and the fishing port (~9 km)"],
        image: img("49"), imageAlt: "Rocky shore and waves on the coast near Mui Ne",
      },
    ],
    faq: {
      eyebrow: "Good to know", title: "Questions guests ask",
      items: [
        { q: "Where exactly is Sea Links City?", a: "At Km 9 Nguyen Thong, Phan Thiet, on the coast road between Phan Thiet city centre (~9 km) and the Mui Ne beach strip (~12 km), about 200 km from Ho Chi Minh City." },
        { q: "How far is the beach?", a: "The Sea Links beach is across the coast road from Ocean Vista, a few minutes on foot from the apartment blocks. From the villas it is a short buggy or motorbike ride." },
        { q: "What is included in the rent?", a: "Prices are per month and depend on the season. Electricity and water are paid by the guest; all other costs are covered by the owner." },
        { q: "When is the best time to come?", a: "November to April is the dry, sunny and windy high season. May to October has a calmer sea, short afternoon showers and lower prices." },
        { q: "How do I book?", a: "Message us on WhatsApp, Telegram or Zalo with your dates and number of guests. We confirm availability and the final price for your dates." },
      ],
    },
    browse: "See all apartments and villas",
  },

  ru: {
    metaTitle: "Гид по Муйне и Sea Links City: пляж, сезоны, как добраться",
    metaDescription: "Практический гид по Sea Links City и Муйне (Вьетнам): что есть на территории, пляж и бассейны, гольф и винный замок, сезоны, как добраться и что посмотреть рядом.",
    eyebrow: "Гид", title: "Гид по Муйне и Sea Links City",
    intro: "Всё полезное перед поездкой в апартаменты Ocean Vista или на виллу Sea Links: что есть на территории, когда лучше приезжать, как добраться и что посмотреть рядом.",
    contents: "На этой странице", home: "Главная",
    sections: [
      {
        id: "sea-links-city", title: "Что такое Sea Links City",
        text: "Sea Links City — закрытый курортный комплекс на 9-м километре улицы Нгуен Тхонг, на прибрежной дороге между Фантьетом и курортной полосой Муйне. В нём объединены корпуса апартаментов Ocean Vista у пляжа, улицы двухэтажных вилл на холме, гольф-поле на 18 лунок и винный замок Sea Links.",
        points: ["Ocean Vista: корпуса A–F в парке кокосовых пальм", "Виллы Sea Links: двухэтажные дома с садом на тихих улицах", "Закрытая территория с охраной и видеонаблюдением", "Пешеходные дорожки с указателями между корпусами, бассейном, кортами и пляжем"],
        image: img("30"), imageAlt: "Вывеска Ocean Vista у въезда в комплекс Sea Links City", image2: "/images/ocean-vista-pool-wide.jpg", image2Alt: "Зона бассейна Ocean Vista с шезлонгами в окружении кокосовых пальм",
      },
      {
        id: "beach-pools", title: "Пляж и бассейны",
        text: "Пляж Sea Links находится через прибрежную дорогу от Ocean Vista: широкая песчаная полоса с кокосовыми пальмами, соломенными зонтами и шезлонгами, у входа есть уличные души. На территории комплекса — большой бассейн Ocean Pool с шезлонгами и кафе у воды.",
        points: ["Песчаный пляж с зонтами, шезлонгами и душами", "Ocean Pool: большой открытый бассейн с мелкой зоной", "Бассейн-лагуна вдоль террас первого этажа блока A", "Кафе и ресторан морепродуктов на гриле у пляжной дороги"],
        image: img("21"), imageAlt: "Пляж Sea Links: кокосовые пальмы, соломенные зонты и шезлонги", image2: "/images/ocean-vista-pool-loungers.jpg", image2Alt: "Бассейн Ocean Vista: зонты и шезлонги под пальмами",
      },
      {
        id: "on-site", title: "Что есть на территории",
        text: "Для повседневной жизни выезжать из комплекса не обязательно. Всё перечисленное находится на территории или у въезда.",
        points: ["Корты для тенниса и пиклбола", "Детские площадки и уличные тренажёры", "Бесплатная крытая парковка для машин и байков под корпусами", "Банкомат Vietcombank (24 часа) у въезда", "Станция электрокаров для поездок по территории", "Кофейня, ресторан-барбекю и небольшой органический сад", "Супермаркеты и рынки — в нескольких минутах езды, в Фантьете и Хамтиене"],
        image: img("17"), imageAlt: "Корты для тенниса и пиклбола Ocean Vista в окружении деревьев", image2: "/images/ocean-vista-tennis-aerial.jpg", image2Alt: "Теннисные корты рядом с корпусами Ocean Vista, вид с высоты",
      },
      {
        id: "golf-castle", title: "Гольф и винный замок",
        text: "Гольф-поле Sea Links на 18 лунок проложено по дюнам над морем, в нескольких минутах от апартаментов и вилл. Рядом стоит винный замок Sea Links — каменный замок с винным погребом и дегустациями, одна из достопримечательностей побережья.",
        points: ["Гольф-поле на 18 лунок с видом на море", "Винный замок с погребом и дегустациями", "Оба находятся внутри Sea Links City, несколько минут на электрокаре или такси"],
        image: "/images/sea-links-castle.jpg", imageAlt: "Винный замок Sea Links с каменными башнями над виноградником", image2: "/images/sea-links-castle-aerial.jpg", image2Alt: "Винный замок Sea Links с вечерней подсветкой, вид с высоты, за ним гольф-поле",
      },
      {
        id: "seasons", title: "Сезоны и погода",
        text: "Муйне — одно из самых сухих мест Вьетнама, тепло здесь круглый год. Сухой сезон длится с ноября по апрель; с ноября по март дует ровный ветер, благодаря которому Муйне известен как место для кайтсёрфинга. С мая по октябрь море спокойнее, бывают короткие дожди после обеда, а цены ниже.",
        points: ["Ноябрь – апрель: сухо, солнечно, ветрено; высокий сезон", "Май – октябрь: спокойное море, короткие дожди, меньше людей", "Цены аренды зависят от сезона: таблица есть на странице каждого объекта"],
        image: img("46"), imageAlt: "Сёрферы и купающиеся в волнах на побережье Муйне",
      },
      {
        id: "getting-there", title: "Как добраться",
        text: "Большинство гостей прилетают в Хошимин (аэропорт Таншоннят, SGN), это около 200 км. По скоростной трассе до Фантьета дорога на машине или трансфере занимает примерно 2,5–3 часа. Также ходят спальные автобусы и поезд Сайгон – Фантьет, от вокзала 15–20 минут на такси.",
        points: ["Трансфер или такси из Хошимина: ~2,5–3 часа", "Автобусы из Хошимина в Муйне идут по прибрежной дороге", "Поезд Сайгон – Фантьет, далее такси до Sea Links City", "На месте: такси и приложения для вызова машины, аренда байка, местный автобус Фантьет – Муйне", "Трансфер можем организовать по запросу — просто напишите нам"],
        image: img("42"), imageAlt: "Арка Sea Links City над въездной дорогой",
      },
      {
        id: "nearby", title: "Что посмотреть рядом",
        text: "Sea Links City находится между Фантьетом и Муйне, поэтому до главных мест обоих — короткая поездка.",
        points: ["Курортная полоса Хамтиен / Муйне: рестораны, кайт-школы, магазины (~12 км)", "Ручей Фей (Суой Тьен): прогулка по мелкому ручью между красными обрывами", "Красные дюны (~15 км) и Белые дюны (~40 км)", "Рыбацкая гавань Муйне с сотнями лодок", "Чамские башни По Шану на холме над Фантьетом", "Город Фантьет: рынки, морепродукты и рыбный порт (~9 км)"],
        image: img("49"), imageAlt: "Скалистый берег и волны на побережье рядом с Муйне",
      },
    ],
    faq: {
      eyebrow: "Полезно знать", title: "Частые вопросы гостей",
      items: [
        { q: "Где именно находится Sea Links City?", a: "На 9-м километре улицы Нгуен Тхонг в Фантьете, на прибрежной дороге между центром Фантьета (~9 км) и курортной полосой Муйне (~12 км), примерно в 200 км от Хошимина." },
        { q: "Далеко ли до пляжа?", a: "Пляж Sea Links — через прибрежную дорогу от Ocean Vista, несколько минут пешком от корпусов. От вилл — короткая поездка на электрокаре или байке." },
        { q: "Что входит в стоимость аренды?", a: "Цены указаны за месяц и зависят от сезона. Электроэнергию и воду гость оплачивает отдельно; все прочие расходы несёт собственник." },
        { q: "Когда лучше приезжать?", a: "С ноября по апрель — сухой, солнечный и ветреный высокий сезон. С мая по октябрь море спокойнее, бывают короткие дожди после обеда, цены ниже." },
        { q: "Как забронировать?", a: "Напишите нам в WhatsApp, Telegram или Zalo: укажите даты и число гостей. Мы подтвердим наличие и итоговую цену на ваши даты." },
      ],
    },
    browse: "Смотреть все апартаменты и виллы",
  },

  vi: {
    metaTitle: "Cẩm nang Mũi Né & Sea Links City: bãi biển, mùa, cách di chuyển",
    metaDescription: "Cẩm nang thực tế về Sea Links City và Mũi Né: tiện ích trong khu, bãi biển và hồ bơi, sân golf và lâu đài rượu vang, thời tiết theo mùa, cách di chuyển và điểm tham quan gần đó.",
    eyebrow: "Cẩm nang", title: "Cẩm nang Mũi Né & Sea Links City",
    intro: "Những điều nên biết trước khi ở căn hộ Ocean Vista hoặc biệt thự Sea Links: trong khu có gì, nên đến mùa nào, đi lại thế nào và tham quan gì gần đó.",
    contents: "Trong trang này", home: "Trang chủ",
    sections: [
      {
        id: "sea-links-city", title: "Sea Links City là gì",
        text: "Sea Links City là khu nghỉ dưỡng khép kín tại Km 9 Nguyễn Thông, trên tuyến đường ven biển giữa Phan Thiết và dải bãi biển Mũi Né. Khu gồm các block căn hộ Ocean Vista sát biển, những dãy biệt thự hai tầng trên đồi, sân golf 18 lỗ và lâu đài rượu vang Sea Links.",
        points: ["Ocean Vista: các block A–F giữa công viên dừa", "Biệt thự Sea Links: nhà hai tầng có vườn trên những con đường yên tĩnh", "Khu khép kín, có bảo vệ và camera", "Lối đi bộ có biển chỉ dẫn giữa các block, hồ bơi, sân tennis và bãi biển"],
        image: img("30"), imageAlt: "Biển hiệu Ocean Vista ở lối vào khu Sea Links City", image2: "/images/ocean-vista-pool-wide.jpg", image2Alt: "Khu hồ bơi Ocean Vista với ghế nằm giữa hàng dừa",
      },
      {
        id: "beach-pools", title: "Bãi biển và hồ bơi",
        text: "Bãi biển Sea Links nằm bên kia đường ven biển, đối diện Ocean Vista: bãi cát rộng với hàng dừa, dù lá và ghế tắm nắng, có vòi tắm ngoài trời ở lối vào. Trong khu có hồ bơi lớn Ocean Pool với ghế nằm và quán cà phê bên hồ.",
        points: ["Bãi cát có dù, ghế nằm và vòi tắm", "Ocean Pool: hồ bơi ngoài trời lớn, có khu nước nông", "Hồ bơi lagoon chạy dọc sân hiên tầng trệt Block A", "Quán cà phê và nhà hàng hải sản nướng bên đường biển"],
        image: img("21"), imageAlt: "Bãi biển Sea Links với hàng dừa, dù lá và ghế tắm nắng", image2: "/images/ocean-vista-pool-loungers.jpg", image2Alt: "Hồ bơi Ocean Vista với dù và ghế nằm dưới hàng dừa",
      },
      {
        id: "on-site", title: "Tiện ích trong khu",
        text: "Sinh hoạt hằng ngày không cần ra khỏi khu. Những tiện ích dưới đây nằm trong khu hoặc ngay lối vào.",
        points: ["Sân tennis và pickleball", "Sân chơi trẻ em và dụng cụ tập thể dục ngoài trời", "Bãi đỗ xe có mái miễn phí cho ô tô và xe máy dưới các block", "ATM Vietcombank (24 giờ) ở lối vào", "Trạm xe điện đi lại trong khu", "Quán cà phê, nhà hàng BBQ và vườn rau hữu cơ nhỏ", "Siêu thị và chợ cách một quãng xe ngắn, ở Phan Thiết và Hàm Tiến"],
        image: img("17"), imageAlt: "Sân tennis và pickleball Ocean Vista giữa hàng cây", image2: "/images/ocean-vista-tennis-aerial.jpg", image2Alt: "Sân tennis cạnh các block Ocean Vista nhìn từ trên cao",
      },
      {
        id: "golf-castle", title: "Sân golf và lâu đài rượu vang",
        text: "Sân golf Sea Links 18 lỗ trải trên đồi cát nhìn ra biển, cách căn hộ và biệt thự vài phút. Bên cạnh là lâu đài rượu vang Sea Links, tòa lâu đài đá có hầm rượu và thử rượu, một điểm nhấn của vùng biển này.",
        points: ["Sân golf 18 lỗ view biển", "Lâu đài rượu vang có hầm rượu và thử rượu", "Cả hai nằm trong Sea Links City, đi xe điện hoặc taxi vài phút"],
        image: "/images/sea-links-castle.jpg", imageAlt: "Lâu đài rượu vang Sea Links với các tháp đá trên vườn nho", image2: "/images/sea-links-castle-aerial.jpg", image2Alt: "Lâu đài rượu vang Sea Links lên đèn buổi tối nhìn từ trên cao, phía sau là sân golf",
      },
      {
        id: "seasons", title: "Mùa và thời tiết",
        text: "Mũi Né là một trong những nơi khô ráo nhất Việt Nam, ấm quanh năm. Mùa khô kéo dài từ tháng 11 đến tháng 4; từ tháng 11 đến tháng 3 gió đều, nên Mũi Né nổi tiếng về lướt ván diều. Từ tháng 5 đến tháng 10 biển êm hơn, có mưa rào ngắn buổi chiều và giá thấp hơn.",
        points: ["Tháng 11 – tháng 4: khô, nắng, nhiều gió; mùa cao điểm", "Tháng 5 – tháng 10: biển êm, mưa rào ngắn, vắng khách hơn", "Giá thuê thay đổi theo mùa: xem bảng giá ở trang từng căn"],
        image: img("46"), imageAlt: "Người lướt sóng và tắm biển trên bờ biển Mũi Né",
      },
      {
        id: "getting-there", title: "Cách di chuyển",
        text: "Phần lớn khách đến qua TP. Hồ Chí Minh (sân bay Tân Sơn Nhất, SGN), cách khoảng 200 km. Đi cao tốc đến Phan Thiết mất khoảng 2,5–3 giờ bằng ô tô hoặc xe đưa đón. Ngoài ra có xe giường nằm và tàu Sài Gòn – Phan Thiết, từ ga đi taxi 15–20 phút.",
        points: ["Xe đưa đón hoặc taxi từ TP. Hồ Chí Minh: ~2,5–3 giờ", "Xe khách TP. Hồ Chí Minh – Mũi Né chạy dọc đường ven biển", "Tàu Sài Gòn – Phan Thiết, sau đó taxi đến Sea Links City", "Đi lại tại chỗ: taxi và ứng dụng gọi xe, thuê xe máy, xe buýt Phan Thiết – Mũi Né", "Chúng tôi có thể sắp xếp xe đưa đón theo yêu cầu: chỉ cần nhắn tin"],
        image: img("42"), imageAlt: "Cổng Sea Links City trên đường vào khu",
      },
      {
        id: "nearby", title: "Tham quan gần đây",
        text: "Sea Links City nằm giữa Phan Thiết và Mũi Né nên các điểm tham quan chính của cả hai đều gần.",
        points: ["Dải Hàm Tiến / Mũi Né: nhà hàng, trường dạy lướt ván diều, cửa hàng (~12 km)", "Suối Tiên: đi bộ dọc dòng suối cạn giữa vách đất đỏ", "Đồi Cát Đỏ (~15 km) và Đồi Cát Trắng – Bàu Trắng (~40 km)", "Làng chài Mũi Né với hàng trăm ghe thuyền", "Tháp Chăm Po Sah Inư trên đồi nhìn xuống Phan Thiết", "Thành phố Phan Thiết: chợ, hải sản và cảng cá (~9 km)"],
        image: img("49"), imageAlt: "Bờ đá và sóng biển gần Mũi Né",
      },
    ],
    faq: {
      eyebrow: "Nên biết", title: "Câu hỏi thường gặp",
      items: [
        { q: "Sea Links City nằm ở đâu?", a: "Tại Km 9 Nguyễn Thông, Phan Thiết, trên đường ven biển giữa trung tâm Phan Thiết (~9 km) và dải bãi biển Mũi Né (~12 km), cách TP. Hồ Chí Minh khoảng 200 km." },
        { q: "Bãi biển cách bao xa?", a: "Bãi biển Sea Links nằm bên kia đường ven biển, đối diện Ocean Vista, đi bộ vài phút từ các block. Từ biệt thự đi xe điện hoặc xe máy một quãng ngắn." },
        { q: "Giá thuê bao gồm những gì?", a: "Giá tính theo tháng và thay đổi theo mùa. Khách tự trả tiền điện và nước; các chi phí khác do chủ nhà chịu." },
        { q: "Nên đến vào mùa nào?", a: "Tháng 11 đến tháng 4 là mùa cao điểm khô, nắng và nhiều gió. Tháng 5 đến tháng 10 biển êm hơn, có mưa rào ngắn buổi chiều và giá thấp hơn." },
        { q: "Đặt chỗ thế nào?", a: "Nhắn Zalo, WhatsApp hoặc Telegram cho chúng tôi kèm ngày ở và số khách. Chúng tôi xác nhận lịch trống và giá cuối cùng cho ngày của bạn." },
      ],
    },
    browse: "Xem tất cả căn hộ và biệt thự",
  },
};
