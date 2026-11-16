import type { Locale } from "@/i18n/routing";

/**
 * Homepage copy per locale. Facts here (distances, sizes, prices) must match llms.txt and
 * the JSON-LD — AI engines cross-check them. Values marked ~ are estimates to verify.
 */
export interface HomeContent {
  nav: { rentals: string; apartments: string; villas: string; guide: string; contact: string; book: string };
  featured: { eyebrow: string; title: string; intro: string; all: string };
  compare: {
    eyebrow: string; title: string;
    apartment: { name: string; tagline: string; points: string[]; from: string; cta: string };
    villa: { name: string; tagline: string; points: string[]; from: string; cta: string };
  };
  amenities: { eyebrow: string; title: string; intro: string; items: { key: string; title: string; text: string; image: string }[] };
  location: { eyebrow: string; title: string; intro: string; rows: { place: string; distance: string; time: string }[]; mapLabel: string };
  reviews: { eyebrow: string; title: string; sampleNote: string; items: { quote: string; name: string; from: string; stay: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[]; more: string };
  cta: { title: string; text: string; form: string };
  footer: { about: string; explore: string; contact: string; languages: string; rights: string };
}

export const home: Record<Locale, HomeContent> = {
  en: {
    nav: { rentals: "All rentals", apartments: "Ocean Vista", villas: "Villas", guide: "Mui Ne guide", contact: "Contact", book: "Book on WhatsApp" },
    featured: { eyebrow: "Hand-picked stays", title: "Featured apartments & villas", intro: "Every home is inspected by our team, photographed as it is today, and priced direct from the owner.", all: "See all rentals" },
    compare: {
      eyebrow: "Two ways to stay", title: "Ocean Vista apartment or Sea Links villa?",
      apartment: {
        name: "Ocean Vista apartments", tagline: "Beachfront living, steps from the sand",
        points: ["Studio to 2 bedrooms · 40–136 m²", "Sea or garden views", "Shared pools, palm park, tennis courts", "A few minutes' walk to the beach", "Best for couples, small families, long stays"],
        from: "from $500 / month", cta: "Browse apartments",
      },
      villa: {
        name: "Sea Links villas", tagline: "A whole house with a garden, room for everyone",
        points: ["3 bedrooms · from 320 m²", "Two storeys, private garden and balconies", "Sea or golf course views", "Quiet villa streets inside Sea Links City", "Best for families and groups"],
        from: "from $900 / month", cta: "Browse villas",
      },
    },
    amenities: {
      eyebrow: "Life at Sea Links City", title: "A resort around your front door", intro: "Every stay includes access to the Sea Links City complex: one of Mui Ne's best-known golf and beach resorts.",
      items: [
        { key: "golf", title: "18-hole golf course", text: "An 18-hole course laid out over the dunes above the sea, a few minutes from every home.", image: "/images/sea-links-city/56.jpg" },
        { key: "beach", title: "Beach & beach club", text: "Sun loungers, a beach bar and calm morning swims on the Mui Ne coast.", image: "/images/sea-links-city/21.jpg" },
        { key: "pools", title: "Pools for every mood", text: "A large outdoor pool with sun loungers and a lagoon pool among the palms at Ocean Vista.", image: "/images/ocean-vista-pool-loungers.jpg" },
        { key: "castle", title: "Sea Links wine castle", text: "Wine museum, cellar tours and tastings in the landmark castle on the hill.", image: "/images/sea-links-castle.jpg" },
      ],
    },
    location: {
      eyebrow: "Location", title: "Where Sea Links City is", intro: "Sea Links City sits at Km 9 Nguyen Thong, between Phan Thiet centre and the Mui Ne beach strip.",
      rows: [
        { place: "Beach (Ocean Vista)", distance: "250 m", time: "3 min walk" },
        { place: "Phan Thiet city centre", distance: "~9 km", time: "15 min" },
        { place: "Mui Ne beach strip (Ham Tien)", distance: "~12 km", time: "20 min" },
        { place: "Red Sand Dunes", distance: "~15 km", time: "25 min" },
        { place: "White Sand Dunes", distance: "~40 km", time: "50 min" },
        { place: "Ho Chi Minh City (SGN airport)", distance: "~200 km", time: "2.5–3 h by expressway" },
      ],
      mapLabel: "Open in Google Maps",
    },
    reviews: {
      eyebrow: "Guest stories", title: "What guests say", sampleNote: "Sample reviews for layout only. Replace with real, verifiable guest reviews before launch.",
      items: [
        { quote: "Waking up to the sea from the 12th floor was the highlight of our trip. Check-in on WhatsApp took two minutes.", name: "Sample guest", from: "Singapore", stay: "Ocean Vista 2-bedroom" },
        { quote: "The villa pool and the golf views were exactly like the photos. Perfect for our three families.", name: "Sample guest", from: "Moscow", stay: "Sea Links 5-bedroom villa" },
        { quote: "Great value for a month-long stay. Fast replies in Vietnamese and every problem fixed the same day.", name: "Sample guest", from: "Ho Chi Minh City", stay: "Ocean Vista studio" },
      ],
    },
    faq: {
      eyebrow: "Good to know", title: "Frequently asked questions",
      items: [
        { q: "Where are Ocean Vista and Sea Links City?", a: "Both are in Sea Links City, Km 9 Nguyen Thong, Phan Thiet, on the Mui Ne coast of Vietnam, about 200 km (2.5–3 hours by expressway) from Ho Chi Minh City." },
        { q: "What is the difference between an Ocean Vista apartment and a Sea Links villa?", a: "Ocean Vista apartments (studio to 2 bedrooms, 40–136 m²) are in apartment blocks next to the beach, with shared pools and sea or garden views. Sea Links villas are two-storey houses (3 bedrooms, from 320 m²) with a private garden and sea or golf views." },
        { q: "How do I book, and is there a booking fee?", a: "Message us on WhatsApp, Telegram or Zalo with your dates and number of guests. We confirm availability and the final price. You book directly with the owner, with no booking fees." },
        { q: "When is the best time to visit Mui Ne?", a: "November to April is the dry, sunny high season. May to October has short afternoon showers, quieter beaches and lower prices." },
      ],
      more: "Read the full Mui Ne & Sea Links guide",
    },
    cta: { title: "Tell us your dates and we'll reply in minutes", text: "Message us with your dates and number of guests. We'll send you the homes that are available, with real photos and the final price.", form: "Write us an email" },
    footer: { about: "Owner-direct apartment and villa rentals in Sea Links City, Mui Ne, Vietnam.", explore: "Explore", contact: "Contact", languages: "Languages", rights: "All rights reserved." },
  },

  ru: {
    nav: { rentals: "Все объекты", apartments: "Ocean Vista", villas: "Виллы", guide: "Гид по Муйне", contact: "Контакты", book: "Написать в WhatsApp" },
    featured: { eyebrow: "Избранное", title: "Лучшие апартаменты и виллы", intro: "Каждый объект проверен нашей командой, сфотографирован в актуальном виде и сдаётся по цене владельца.", all: "Все объекты" },
    compare: {
      eyebrow: "Два формата отдыха", title: "Апартаменты Ocean Vista или вилла Sea Links?",
      apartment: {
        name: "Апартаменты Ocean Vista", tagline: "Первая линия, пара шагов до пляжа",
        points: ["От студии до 2 спален · 40–136 м²", "Вид на море или сад", "Общие бассейны, пальмовый парк, теннисные корты", "Несколько минут пешком до пляжа", "Для пар, небольших семей и долгого проживания"],
        from: "от $500 / месяц", cta: "Смотреть апартаменты",
      },
      villa: {
        name: "Виллы Sea Links", tagline: "Целый дом с садом, место для всех",
        points: ["3 спальни · от 320 м²", "Два этажа, собственный сад и балконы", "Вид на море или гольф-поле", "Тихие улицы с виллами внутри Sea Links City", "Для семей и компаний"],
        from: "от $900 / месяц", cta: "Смотреть виллы",
      },
    },
    amenities: {
      eyebrow: "Жизнь в Sea Links City", title: "Курорт прямо у вашей двери", intro: "Каждое проживание включает доступ к инфраструктуре Sea Links City, одного из самых известных гольф- и пляжных курортов Муйне.",
      items: [
        { key: "golf", title: "Гольф-поле на 18 лунок", text: "Поле на 18 лунок на дюнах над морем, в нескольких минутах от любого объекта.", image: "/images/sea-links-city/56.jpg" },
        { key: "beach", title: "Пляж и бич-клуб", text: "Шезлонги, пляжный бар и спокойное утреннее море на побережье Муйне.", image: "/images/sea-links-city/21.jpg" },
        { key: "pools", title: "Бассейны на любой вкус", text: "Большой открытый бассейн с шезлонгами и бассейн-лагуна среди пальм в Ocean Vista.", image: "/images/ocean-vista-pool-loungers.jpg" },
        { key: "castle", title: "Винный замок Sea Links", text: "Музей вина, экскурсии по погребам и дегустации в замке на холме.", image: "/images/sea-links-castle.jpg" },
      ],
    },
    location: {
      eyebrow: "Расположение", title: "Где находится Sea Links City", intro: "Sea Links City расположен на 9-м км улицы Нгуен Тхонг, между центром Фантьета и пляжной зоной Муйне.",
      rows: [
        { place: "Пляж (от Ocean Vista)", distance: "250 м", time: "3 мин пешком" },
        { place: "Центр Фантьета", distance: "~9 км", time: "15 мин" },
        { place: "Пляжная зона Муйне (Хамтьен)", distance: "~12 км", time: "20 мин" },
        { place: "Красные дюны", distance: "~15 км", time: "25 мин" },
        { place: "Белые дюны", distance: "~40 км", time: "50 мин" },
        { place: "Хошимин (аэропорт SGN)", distance: "~200 км", time: "2,5–3 ч по трассе" },
      ],
      mapLabel: "Открыть в Google Картах",
    },
    reviews: {
      eyebrow: "Отзывы гостей", title: "Что говорят гости", sampleNote: "Примеры отзывов только для макета. Перед запуском замените на реальные отзывы гостей.",
      items: [
        { quote: "Просыпаться с видом на море с 12 этажа — лучшее в поездке. Заселение через WhatsApp заняло две минуты.", name: "Пример гостя", from: "Сингапур", stay: "Ocean Vista, 2 спальни" },
        { quote: "Бассейн и вид на гольф — точно как на фото. Идеально для трёх наших семей.", name: "Пример гостя", from: "Москва", stay: "Вилла Sea Links, 5 спален" },
        { quote: "Отличная цена за месяц. Быстрые ответы, все вопросы решали в тот же день.", name: "Пример гостя", from: "Хошимин", stay: "Студия Ocean Vista" },
      ],
    },
    faq: {
      eyebrow: "Полезно знать", title: "Частые вопросы",
      items: [
        { q: "Где находятся Ocean Vista и Sea Links City?", a: "Оба находятся в Sea Links City, 9-й км ул. Нгуен Тхонг, Фантьет, на побережье Муйне во Вьетнаме, примерно в 200 км (2,5–3 часа по трассе) от Хошимина." },
        { q: "Чем апартаменты Ocean Vista отличаются от вилл Sea Links?", a: "Апартаменты Ocean Vista (от студии до 2 спален, 40–136 м²) находятся в корпусах у пляжа, с общими бассейнами и видом на море или сад. Виллы Sea Links — двухэтажные дома (3 спальни, от 320 м²) с собственным садом и видом на море или гольф-поле." },
        { q: "Как забронировать и есть ли комиссия?", a: "Напишите нам в WhatsApp, Telegram или Zalo: укажите даты и число гостей. Мы подтвердим наличие и итоговую цену. Вы бронируете напрямую у владельца, без комиссий." },
        { q: "Когда лучше ехать в Муйне?", a: "С ноября по апрель — сухой солнечный высокий сезон. С мая по октябрь бывают короткие дожди после обеда, пляжи спокойнее, цены ниже." },
      ],
      more: "Полный гид по Муйне и Sea Links",
    },
    cta: { title: "Напишите даты, и мы ответим за несколько минут", text: "Сообщите даты и количество гостей. Мы пришлём свободные варианты с реальными фото и итоговой ценой.", form: "Написать на почту" },
    footer: { about: "Аренда апартаментов и вилл от владельцев в Sea Links City, Муйне, Вьетнам.", explore: "Разделы", contact: "Контакты", languages: "Языки", rights: "Все права защищены." },
  },

  vi: {
    nav: { rentals: "Tất cả", apartments: "Ocean Vista", villas: "Biệt thự", guide: "Cẩm nang Mũi Né", contact: "Liên hệ", book: "Đặt qua Zalo" },
    featured: { eyebrow: "Tuyển chọn", title: "Căn hộ & biệt thự nổi bật", intro: "Mỗi căn đều được đội ngũ kiểm tra, chụp ảnh thực tế và cho thuê với giá chủ nhà.", all: "Xem tất cả" },
    compare: {
      eyebrow: "Hai lựa chọn", title: "Căn hộ Ocean Vista hay biệt thự Sea Links?",
      apartment: {
        name: "Căn hộ Ocean Vista", tagline: "Sát biển, vài bước chân ra bãi cát",
        points: ["Studio đến 2 phòng ngủ · 40–136 m²", "View biển hoặc vườn", "Hồ bơi chung, công viên dừa, sân tennis", "Đi bộ vài phút ra biển", "Phù hợp cặp đôi, gia đình nhỏ, ở dài hạn"],
        from: "từ $500 / tháng", cta: "Xem căn hộ",
      },
      villa: {
        name: "Biệt thự Sea Links", tagline: "Nguyên căn có sân vườn, rộng rãi cho cả nhóm",
        points: ["3 phòng ngủ · từ 320 m²", "Hai tầng, sân vườn riêng và ban công", "View biển hoặc sân golf", "Những con đường biệt thự yên tĩnh trong Sea Links City", "Phù hợp gia đình và nhóm bạn"],
        from: "từ $900 / tháng", cta: "Xem biệt thự",
      },
    },
    amenities: {
      eyebrow: "Cuộc sống tại Sea Links City", title: "Khu nghỉ dưỡng ngay trước cửa nhà", intro: "Mọi kỳ nghỉ đều bao gồm quyền sử dụng tiện ích Sea Links City, một trong những khu nghỉ dưỡng golf và biển nổi tiếng nhất Mũi Né.",
      items: [
        { key: "golf", title: "Sân golf 18 lỗ", text: "Sân 18 lỗ trải trên đồi cát nhìn ra biển, cách mỗi căn vài phút.", image: "/images/sea-links-city/56.jpg" },
        { key: "beach", title: "Bãi biển & beach club", text: "Ghế tắm nắng, quầy bar biển và làn nước êm buổi sáng.", image: "/images/sea-links-city/21.jpg" },
        { key: "pools", title: "Hồ bơi đa dạng", text: "Hồ bơi ngoài trời lớn có ghế nằm và hồ bơi lagoon giữa hàng dừa tại Ocean Vista.", image: "/images/ocean-vista-pool-loungers.jpg" },
        { key: "castle", title: "Lâu đài rượu vang Sea Links", text: "Bảo tàng rượu vang, tham quan hầm rượu và thử rượu trong lâu đài trên đồi.", image: "/images/sea-links-castle.jpg" },
      ],
    },
    location: {
      eyebrow: "Vị trí", title: "Sea Links City ở đâu", intro: "Sea Links City nằm tại Km 9 Nguyễn Thông, giữa trung tâm Phan Thiết và dải biển Mũi Né.",
      rows: [
        { place: "Bãi biển (từ Ocean Vista)", distance: "250 m", time: "3 phút đi bộ" },
        { place: "Trung tâm Phan Thiết", distance: "~9 km", time: "15 phút" },
        { place: "Dải biển Mũi Né (Hàm Tiến)", distance: "~12 km", time: "20 phút" },
        { place: "Đồi Cát Đỏ", distance: "~15 km", time: "25 phút" },
        { place: "Đồi Cát Trắng (Bàu Trắng)", distance: "~40 km", time: "50 phút" },
        { place: "TP. Hồ Chí Minh (sân bay SGN)", distance: "~200 km", time: "2,5–3 giờ cao tốc" },
      ],
      mapLabel: "Mở Google Maps",
    },
    reviews: {
      eyebrow: "Khách hàng nói gì", title: "Đánh giá của khách", sampleNote: "Đánh giá mẫu chỉ để dàn trang. Thay bằng đánh giá thật trước khi ra mắt.",
      items: [
        { quote: "Thức dậy nhìn biển từ tầng 12 là khoảnh khắc đẹp nhất chuyến đi. Nhận phòng qua WhatsApp chỉ hai phút.", name: "Khách mẫu", from: "Singapore", stay: "Ocean Vista 2 phòng ngủ" },
        { quote: "Hồ bơi và view golf giống hệt ảnh. Hoàn hảo cho ba gia đình chúng tôi.", name: "Khách mẫu", from: "Moskva", stay: "Biệt thự Sea Links 5 phòng ngủ" },
        { quote: "Giá thuê tháng rất hợp lý. Phản hồi nhanh bằng tiếng Việt, mọi việc xử lý trong ngày.", name: "Khách mẫu", from: "TP. Hồ Chí Minh", stay: "Studio Ocean Vista" },
      ],
    },
    faq: {
      eyebrow: "Thông tin hữu ích", title: "Câu hỏi thường gặp",
      items: [
        { q: "Ocean Vista và Sea Links City ở đâu?", a: "Cả hai nằm trong Sea Links City, Km 9 Nguyễn Thông, Phan Thiết, ven biển Mũi Né, cách TP. Hồ Chí Minh khoảng 200 km (2,5–3 giờ đi cao tốc)." },
        { q: "Căn hộ Ocean Vista khác biệt thự Sea Links thế nào?", a: "Căn hộ Ocean Vista (studio đến 2 phòng ngủ, 40–136 m²) nằm trong các block sát biển, có hồ bơi chung, view biển hoặc vườn. Biệt thự Sea Links là nhà hai tầng (3 phòng ngủ, từ 320 m²) có sân vườn riêng, view biển hoặc sân golf." },
        { q: "Đặt phòng thế nào, có mất phí không?", a: "Nhắn Zalo, WhatsApp hoặc Telegram kèm ngày ở và số khách. Chúng tôi xác nhận lịch trống và giá cuối cùng. Bạn đặt trực tiếp với chủ nhà, không mất phí đặt phòng." },
        { q: "Thời điểm nào đẹp nhất để đi Mũi Né?", a: "Tháng 11 đến tháng 4 là mùa khô nắng đẹp. Tháng 5 đến tháng 10 có mưa ngắn buổi chiều, biển vắng hơn và giá thấp hơn." },
      ],
      more: "Đọc cẩm nang Mũi Né & Sea Links",
    },
    cta: { title: "Gửi ngày đi, chúng tôi phản hồi trong vài phút", text: "Cho chúng tôi biết ngày và số khách. Chúng tôi sẽ gửi các căn còn trống kèm ảnh thực tế và giá cuối cùng.", form: "Gửi email cho chúng tôi" },
    footer: { about: "Cho thuê căn hộ và biệt thự chính chủ tại Sea Links City, Mũi Né, Việt Nam.", explore: "Khám phá", contact: "Liên hệ", languages: "Ngôn ngữ", rights: "Bảo lưu mọi quyền." },
  },
};
