import type { Locale } from "@/i18n/routing";
import type { Localized, MonthlyRate, Property, SeasonRate } from "@/types/property";
import photos from "./photos.generated.json";

/**
 * REAL LISTINGS built from the owner's photos (see scripts/import-photos.mjs → photos.generated.json).
 *
 * Source of truth for prices, area, guests and view: the owner's price list "Price List New Sealinks.docx"
 *   (2026-11-15). Prices are USD per month by season + a per-month price on a 12-month lease.
 *   Electricity and water are paid by the guest; all other costs by the owner.
 * Ethereal villa is in the list WITHOUT a price or area (and with 20 bedrooms / 40 guests) —
 *   it keeps the $1500/month, 3 bedrooms, 400 m² the owner gave in chat. TODO owner: confirm.
 * Confirmed from the photos: unit code, the cover (first image), what each image shows.
 * NOT confirmed — placeholders (search for "TODO owner"): bathrooms, exact coordinates, pets policy.
 * TODO owner: confirm Ethereal villa is inside Sea Links City (it is labelled as a Sea Links villa).
 */

/** Image n (1-based, as numbered by the import script) of a photo set; the first image of a listing is its cover. */
const photo = (set: string, n: number, alt: Localized): Property["images"][number] => {
  const im = photos.find((g) => g.slug === set)?.images[n - 1];
  if (!im) throw new Error(`Photo ${set}/${n} not found — re-run scripts/import-photos.mjs`);
  return { src: im.src, width: im.width, height: im.height, alt };
};

/** Seasons of the owner's price list (calendar months). */
const SEASONS: Pick<MonthlyRate, "months" | "label">[] = [
  { months: [12, 1, 2], label: { en: "December – February", ru: "Декабрь – февраль", vi: "Tháng 12 – tháng 2" } },
  { months: [3, 4], label: { en: "March – April", ru: "Март – апрель", vi: "Tháng 3 – tháng 4" } },
  { months: [5, 6, 7, 8, 9], label: { en: "May – September", ru: "Май – сентябрь", vi: "Tháng 5 – tháng 9" } },
  { months: [10, 11], label: { en: "October – November", ru: "Октябрь – ноябрь", vi: "Tháng 10 – tháng 11" } },
];
/** Price list row: USD per month for the four seasons above, then per month on a 12-month lease. */
const seasonal = (usd: [number, number, number, number], yearlyUsd: number) => ({
  rates: [] as SeasonRate[],
  monthlyRates: SEASONS.map((s, i) => ({ ...s, usd: usd[i]! })),
  yearlyUsd,
});
/** Flat monthly price (no seasonal list yet). */
const monthly = (usd: number): { rates: SeasonRate[]; monthlyUsd: number } => ({ rates: [], monthlyUsd: usd });

const house = { checkInTime: "14:00", checkOutTime: "12:00", petsAllowed: false, smokingAllowed: false } as const;
const updatedAt = "2026-11-15";

export const properties: Property[] = [
  // ───────────────────────── Ocean Vista · B4-15 · 2 bedrooms · SEA VIEW ─────────────────────────
  {
    id: "OV-B4-15",
    slug: "ocean-vista-2br-sea-view-b4-15",
    type: "apartment",
    complex: "ocean-vista",
    title: {
      en: "Ocean Vista 2-Bedroom Sea View Apartment B4-15",
      ru: "Апартаменты Ocean Vista B4-15, 2 спальни, вид на море",
      vi: "Căn hộ Ocean Vista B4-15, 2 phòng ngủ, view biển",
    },
    summary: {
      en: "Two-bedroom apartment on the 4th floor of Ocean Vista Block B, Sea Links City, Mui Ne: floor-to-ceiling windows and a long balcony facing the sea, open kitchen, bathtub and shower.",
      ru: "Апартаменты с двумя спальнями на 4 этаже блока B в Ocean Vista (Sea Links City, Муйне): панорамные окна и длинный балкон с видом на море, открытая кухня, ванна и душ.",
      vi: "Căn hộ 2 phòng ngủ tầng 4 Block B Ocean Vista, Sea Links City, Mũi Né: cửa kính lớn và ban công dài hướng biển, bếp mở, có bồn tắm và vòi sen.",
    },
    bedrooms: 2, bathrooms: 2, maxGuests: 4, areaSqm: 136, floor: 4, // TODO owner: bathrooms
    beds: [{ type: "DoubleBed", count: 2 }],
    view: ["sea"],
    amenities: ["wifi", "airConditioning", "kitchen", "washer", "balcony", "sharedPool", "parking", "beachAccess", "smartTv"],
    images: [
      photo("ocean-vista-2br-b4-15", 11, { en: "Living room with sofa and floor-to-ceiling windows facing the sea, Ocean Vista apartment B4-15", ru: "Гостиная с диваном и панорамными окнами на море, апартаменты Ocean Vista B4-15", vi: "Phòng khách có sofa và cửa kính lớn nhìn ra biển, căn hộ Ocean Vista B4-15" }),
      photo("ocean-vista-2br-b4-15", 14, { en: "Open kitchen with island and the sea-view living room behind it", ru: "Открытая кухня с островом, за ней гостиная с видом на море", vi: "Bếp mở có đảo bếp, phía sau là phòng khách view biển" }),
      photo("ocean-vista-2br-b4-15", 3, { en: "Bedroom with a wall-to-wall window looking over Ocean Vista to the sea", ru: "Спальня с окном во всю стену и видом на Ocean Vista и море", vi: "Phòng ngủ cửa kính toàn tường nhìn qua Ocean Vista ra biển" }),
      photo("ocean-vista-2br-b4-15", 4, { en: "First bedroom with double bed, desk and TV", ru: "Первая спальня: двуспальная кровать, рабочий стол и телевизор", vi: "Phòng ngủ thứ nhất có giường đôi, bàn làm việc và TV" }),
      photo("ocean-vista-2br-b4-15", 5, { en: "Second bedroom with double bed and balcony door", ru: "Вторая спальня с двуспальной кроватью и выходом на балкон", vi: "Phòng ngủ thứ hai có giường đôi và cửa ra ban công" }),
      photo("ocean-vista-2br-b4-15", 10, { en: "Kitchen, dining table for four and TV area", ru: "Кухня, обеденный стол на четверых и зона с телевизором", vi: "Bếp, bàn ăn bốn người và khu vực xem TV" }),
      photo("ocean-vista-2br-b4-15", 1, { en: "Bedroom with en-suite bathroom behind a glass wall", ru: "Спальня с собственной ванной комнатой за стеклянной перегородкой", vi: "Phòng ngủ có phòng tắm riêng sau vách kính" }),
      photo("ocean-vista-2br-b4-15", 9, { en: "Bathroom with bathtub, glass shower and washing machine", ru: "Ванная комната: ванна, стеклянная душевая и стиральная машина", vi: "Phòng tắm có bồn tắm, buồng tắm kính và máy giặt" }),
      photo("ocean-vista-2br-b4-15", 8, { en: "Long balcony on the 4th floor above the palm garden", ru: "Длинный балкон на 4 этаже над пальмовым садом", vi: "Ban công dài tầng 4 nhìn xuống vườn dừa" }),
    ],
    geo: { lat: 10.9452, lng: 108.2203 }, // TODO owner: exact pin
    ...seasonal([1000, 1000, 800, 700], 750),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Ocean Vista · A1-05 · 1 bedroom · POOL VIEW ─────────────────────────
  {
    id: "OV-A1-05",
    slug: "ocean-vista-1br-garden-view-a1-05",
    type: "apartment",
    complex: "ocean-vista",
    title: {
      en: "Ocean Vista 1-Bedroom Garden View Apartment A1-05",
      ru: "Апартаменты Ocean Vista A1-05, 1 спальня, вид на сад",
      vi: "Căn hộ Ocean Vista A1-05, 1 phòng ngủ, view vườn",
    },
    summary: {
      en: "One-bedroom apartment on the 1st floor of Ocean Vista Block A, Sea Links City, Mui Ne: the terrace sits right above the lagoon pool and bougainvillea garden; king bed, full kitchen, large living room.",
      ru: "Апартаменты с одной спальней на 1 этаже блока A в Ocean Vista (Sea Links City, Муйне): терраса прямо над бассейном-лагуной и садом с бугенвиллеями; кровать king-size, полноценная кухня, большая гостиная.",
      vi: "Căn hộ 1 phòng ngủ tầng 1 Block A Ocean Vista, Sea Links City, Mũi Né: sân hiên ngay trên hồ bơi lagoon và vườn hoa giấy; giường king, bếp đầy đủ, phòng khách rộng.",
    },
    bedrooms: 1, bathrooms: 1, maxGuests: 2, areaSqm: 86, floor: 1,
    beds: [{ type: "KingBed", count: 1 }],
    view: ["garden", "pool"],
    amenities: ["wifi", "airConditioning", "kitchen", "balcony", "sharedPool", "parking", "beachAccess", "smartTv"],
    images: [
      photo("ocean-vista-1br-a1-05", 8, { en: "Bright living room with corner sofa and bougainvillea outside the window, Ocean Vista A1-05", ru: "Светлая гостиная с угловым диваном, за окном цветущие бугенвиллеи, Ocean Vista A1-05", vi: "Phòng khách sáng với sofa góc, ngoài cửa sổ là giàn hoa giấy, Ocean Vista A1-05" }),
      photo("ocean-vista-1br-a1-05", 12, { en: "Terrace above the lagoon pool with palms and bougainvillea", ru: "Терраса над бассейном-лагуной, пальмы и бугенвиллеи", vi: "Sân hiên trên hồ bơi lagoon, có dừa và hoa giấy" }),
      photo("ocean-vista-1br-a1-05", 9, { en: "Living room with wall-mounted TV and floor-to-ceiling windows", ru: "Гостиная с телевизором на стене и окнами в пол", vi: "Phòng khách có TV treo tường và cửa kính sát sàn" }),
      photo("ocean-vista-1br-a1-05", 1, { en: "Open-plan living and dining area seen from the kitchen", ru: "Гостиная и обеденная зона, вид со стороны кухни", vi: "Phòng khách và khu ăn uống nhìn từ bếp" }),
      photo("ocean-vista-1br-a1-05", 11, { en: "Kitchen with fridge, hood and dining table for four", ru: "Кухня с холодильником и вытяжкой, обеденный стол на четверых", vi: "Bếp có tủ lạnh, máy hút mùi và bàn ăn bốn người" }),
      photo("ocean-vista-1br-a1-05", 5, { en: "Bedroom with king bed and garden-side window", ru: "Спальня с кроватью king-size и окном в сад", vi: "Phòng ngủ giường king, cửa sổ nhìn ra vườn" }),
      photo("ocean-vista-1br-a1-05", 7, { en: "Bedroom window opening towards the pool and flowers", ru: "Окно спальни с видом на бассейн и цветы", vi: "Cửa sổ phòng ngủ nhìn ra hồ bơi và hoa" }),
      photo("ocean-vista-1br-a1-05", 3, { en: "Kitchen worktop with sink, hob, microwave and rice cooker", ru: "Кухонная столешница: мойка, плита, микроволновка и рисоварка", vi: "Bàn bếp có bồn rửa, bếp nấu, lò vi sóng và nồi cơm điện" }),
    ],
    geo: { lat: 10.9454, lng: 108.2199 }, // TODO owner: exact pin
    ...seasonal([800, 800, 650, 700], 750),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Ocean Vista · A1-06 · 1 bedroom · POOL VIEW ─────────────────────────
  {
    id: "OV-A1-06",
    slug: "ocean-vista-1br-garden-view-a1-06",
    type: "apartment",
    complex: "ocean-vista",
    title: {
      en: "Ocean Vista 1-Bedroom Garden View Apartment A1-06 with Twin Beds",
      ru: "Апартаменты Ocean Vista A1-06, 1 спальня, две кровати, вид на сад",
      vi: "Căn hộ Ocean Vista A1-06, 1 phòng ngủ hai giường, view vườn",
    },
    summary: {
      en: "One-bedroom apartment on the 1st floor of Ocean Vista Block A, Sea Links City, Mui Ne: terrace over the lagoon pool and garden, two single beds, full kitchen, bathtub and shower, washing machine.",
      ru: "Апартаменты с одной спальней на 1 этаже блока A в Ocean Vista (Sea Links City, Муйне): терраса над бассейном-лагуной и садом, две односпальные кровати, полноценная кухня, ванна и душ, стиральная машина.",
      vi: "Căn hộ 1 phòng ngủ tầng 1 Block A Ocean Vista, Sea Links City, Mũi Né: sân hiên trên hồ bơi lagoon và vườn, hai giường đơn, bếp đầy đủ, bồn tắm và vòi sen, máy giặt.",
    },
    bedrooms: 1, bathrooms: 1, maxGuests: 2, areaSqm: 86, floor: 1,
    beds: [{ type: "SingleBed", count: 2 }],
    view: ["garden", "pool"],
    amenities: ["wifi", "airConditioning", "kitchen", "washer", "balcony", "sharedPool", "parking", "beachAccess", "smartTv"],
    images: [
      photo("ocean-vista-1br-a1-06", 8, { en: "Spacious living room with corner sofa, dining area and open kitchen, Ocean Vista A1-06", ru: "Просторная гостиная с угловым диваном, обеденной зоной и открытой кухней, Ocean Vista A1-06", vi: "Phòng khách rộng với sofa góc, khu ăn uống và bếp mở, Ocean Vista A1-06" }),
      photo("ocean-vista-1br-a1-06", 11, { en: "Terrace above the lagoon pool facing the bougainvillea garden", ru: "Терраса над бассейном-лагуной с видом на сад с бугенвиллеями", vi: "Sân hiên trên hồ bơi lagoon nhìn ra vườn hoa giấy" }),
      photo("ocean-vista-1br-a1-06", 6, { en: "Living room with floor-to-ceiling window and garden light", ru: "Гостиная с окном в пол, за окном сад", vi: "Phòng khách cửa kính sát sàn, bên ngoài là vườn" }),
      photo("ocean-vista-1br-a1-06", 1, { en: "Dining table for four between the sofa and the kitchen", ru: "Обеденный стол на четверых между диваном и кухней", vi: "Bàn ăn bốn người giữa sofa và bếp" }),
      photo("ocean-vista-1br-a1-06", 10, { en: "Kitchen with fridge, hood and breakfast bar", ru: "Кухня с холодильником, вытяжкой и барной стойкой", vi: "Bếp có tủ lạnh, máy hút mùi và quầy bar" }),
      photo("ocean-vista-1br-a1-06", 3, { en: "Bedroom with two single beds and terrace window", ru: "Спальня с двумя односпальными кроватями и окном на террасу", vi: "Phòng ngủ hai giường đơn, cửa sổ ra sân hiên" }),
      photo("ocean-vista-1br-a1-06", 4, { en: "Bedroom with built-in wardrobe and dressing table", ru: "Спальня со встроенным шкафом и туалетным столиком", vi: "Phòng ngủ có tủ âm tường và bàn trang điểm" }),
      photo("ocean-vista-1br-a1-06", 5, { en: "Bathroom with bathtub and separate glass shower", ru: "Ванная комната с ванной и отдельной стеклянной душевой", vi: "Phòng tắm có bồn tắm và buồng tắm kính riêng" }),
    ],
    geo: { lat: 10.9454, lng: 108.2199 }, // TODO owner: exact pin
    ...seasonal([800, 800, 650, 700], 750),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Ocean Vista · F2-07 · 1 bedroom · GARDEN VIEW ─────────────────────────
  {
    id: "OV-F2-07",
    slug: "ocean-vista-1br-garden-view-f2-07",
    type: "apartment",
    complex: "ocean-vista",
    title: {
      en: "Ocean Vista 1-Bedroom Garden View Apartment F2-07",
      ru: "Апартаменты Ocean Vista F2-07, 1 спальня, вид на сад",
      vi: "Căn hộ Ocean Vista F2-07, 1 phòng ngủ, view vườn",
    },
    summary: {
      en: "One-bedroom apartment on the 2nd floor of Ocean Vista Block F, Sea Links City, Mui Ne: balcony with a dining set facing the palm garden, large living room, full kitchen with oven, bathtub and shower, washing machine, free covered parking.",
      ru: "Апартаменты с одной спальней на 2 этаже блока F в Ocean Vista (Sea Links City, Муйне): балкон со столом и видом на пальмовый сад, большая гостиная, кухня с духовкой, ванна и душ, стиральная машина, бесплатная крытая парковка.",
      vi: "Căn hộ 1 phòng ngủ tầng 2 Block F Ocean Vista, Sea Links City, Mũi Né: ban công có bàn ghế nhìn ra vườn dừa, phòng khách rộng, bếp có lò nướng, bồn tắm và vòi sen, máy giặt, bãi đỗ xe có mái miễn phí.",
    },
    bedrooms: 1, bathrooms: 1, maxGuests: 2, areaSqm: 86, floor: 2,
    beds: [{ type: "DoubleBed", count: 1 }],
    view: ["garden"],
    amenities: ["wifi", "airConditioning", "kitchen", "washer", "balcony", "sharedPool", "parking", "beachAccess", "smartTv"],
    images: [
      photo("ocean-vista-1br-f2-07", 15, { en: "Living room with floor-to-ceiling windows, corner sofa and dining table, Ocean Vista F2-07", ru: "Гостиная с окнами в пол, угловым диваном и обеденным столом, Ocean Vista F2-07", vi: "Phòng khách cửa kính sát sàn, sofa góc và bàn ăn, Ocean Vista F2-07" }),
      photo("ocean-vista-1br-f2-07", 8, { en: "Balcony with table and four chairs facing the palm garden", ru: "Балкон со столом и четырьмя стульями, вид на пальмовый сад", vi: "Ban công có bàn và bốn ghế nhìn ra vườn dừa" }),
      photo("ocean-vista-1br-f2-07", 14, { en: "Living room and open kitchen seen from the balcony", ru: "Гостиная и открытая кухня, вид с балкона", vi: "Phòng khách và bếp mở nhìn từ ban công" }),
      photo("ocean-vista-1br-f2-07", 20, { en: "Sofa area, dining table for four and kitchen", ru: "Зона с диваном, обеденный стол на четверых и кухня", vi: "Khu sofa, bàn ăn bốn người và bếp" }),
      photo("ocean-vista-1br-f2-07", 2, { en: "Bedroom with double bed and window to the balcony", ru: "Спальня с двуспальной кроватью и окном на балкон", vi: "Phòng ngủ giường đôi, cửa sổ ra ban công" }),
      photo("ocean-vista-1br-f2-07", 6, { en: "Kitchen with oven, hob, fridge and breakfast bar", ru: "Кухня с духовкой, плитой, холодильником и барной стойкой", vi: "Bếp có lò nướng, bếp nấu, tủ lạnh và quầy bar" }),
      photo("ocean-vista-1br-f2-07", 9, { en: "View from the balcony: coconut palms, lawns and sand dunes", ru: "Вид с балкона: кокосовые пальмы, газоны и песчаные дюны", vi: "Cảnh từ ban công: hàng dừa, thảm cỏ và đồi cát" }),
      photo("ocean-vista-1br-f2-07", 17, { en: "Bathroom with glass shower cabin and bathtub", ru: "Ванная комната: душевая кабина и ванна", vi: "Phòng tắm có buồng tắm kính và bồn tắm" }),
      photo("ocean-vista-1br-f2-07", 11, { en: "Ocean Vista shared swimming pool surrounded by palms", ru: "Общий бассейн Ocean Vista в окружении пальм", vi: "Hồ bơi chung Ocean Vista giữa hàng dừa" }),
      photo("ocean-vista-1br-f2-07", 22, { en: "Sea Links beach with thatched umbrellas and sun loungers", ru: "Пляж Sea Links: соломенные зонты и шезлонги", vi: "Bãi biển Sea Links với dù lá và ghế tắm nắng" }),
    ],
    geo: { lat: 10.9456, lng: 108.2196 }, // TODO owner: exact pin
    ...seasonal([800, 800, 650, 700], 750),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Sea Links villa S-66 · SEA VIEW ─────────────────────────
  {
    id: "SL-V-S66",
    slug: "sea-links-villa-sea-view-s-66",
    type: "villa",
    complex: "sea-links-villas",
    title: {
      en: "Sea Links Villa S-66 with Garden and Sea View",
      ru: "Вилла Sea Links S-66 с садом и видом на море",
      vi: "Biệt thự Sea Links S-66 có vườn, view biển",
    },
    summary: {
      en: "Two-storey villa S-66 in Sea Links City, Mui Ne: private garden and garage, sea visible from the upper floor, three bedrooms, kitchen-dining room for eight, corner bathtub.",
      ru: "Двухэтажная вилла S-66 в Sea Links City (Муйне): собственный сад и гараж, со второго этажа видно море, три спальни, кухня-столовая на восемь человек, угловая ванна.",
      vi: "Biệt thự hai tầng S-66 tại Sea Links City, Mũi Né: vườn riêng và gara, tầng trên nhìn thấy biển, ba phòng ngủ, bếp kiêm phòng ăn tám người, bồn tắm góc.",
    },
    bedrooms: 3, bathrooms: 3, maxGuests: 6, areaSqm: 320, // TODO owner: bathrooms
    beds: [{ type: "DoubleBed", count: 3 }],
    view: ["sea", "garden"],
    amenities: ["wifi", "airConditioning", "kitchen", "balcony", "garden", "parking"],
    images: [
      photo("sea-links-villa-s-66", 1, { en: "Two-storey Sea Links villa S-66 with garage, balcony and palm garden", ru: "Двухэтажная вилла Sea Links S-66 с гаражом, балконом и пальмовым садом", vi: "Biệt thự hai tầng Sea Links S-66 có gara, ban công và vườn dừa" }),
      photo("sea-links-villa-s-66", 5, { en: "Living room with sofa and French doors to the balcony", ru: "Гостиная с диваном и французскими дверями на балкон", vi: "Phòng khách có sofa và cửa kính kiểu Pháp ra ban công" }),
      photo("sea-links-villa-s-66", 2, { en: "Kitchen-dining room with a table for eight and garden windows", ru: "Кухня-столовая со столом на восемь человек и окнами в сад", vi: "Bếp kiêm phòng ăn với bàn tám người và cửa sổ nhìn ra vườn" }),
      photo("sea-links-villa-s-66", 7, { en: "Bedroom with double bed and doors to the balcony", ru: "Спальня с двуспальной кроватью и выходом на балкон", vi: "Phòng ngủ giường đôi có cửa ra ban công" }),
      photo("sea-links-villa-s-66", 6, { en: "Bedroom with the sea visible through the window", ru: "Спальня, из окна которой видно море", vi: "Phòng ngủ nhìn thấy biển qua cửa sổ" }),
      photo("sea-links-villa-s-66", 14, { en: "Bedroom with double bed and two armchairs", ru: "Спальня с двуспальной кроватью и двумя креслами", vi: "Phòng ngủ giường đôi và hai ghế bành" }),
      photo("sea-links-villa-s-66", 4, { en: "Bathroom with corner bathtub and glass shower", ru: "Ванная комната с угловой ванной и стеклянной душевой", vi: "Phòng tắm có bồn tắm góc và buồng tắm kính" }),
      photo("sea-links-villa-s-66", 11, { en: "Sea view over the treetops from the villa", ru: "Вид на море поверх деревьев с виллы", vi: "Cảnh biển qua ngọn cây nhìn từ biệt thự" }),
      photo("sea-links-villa-s-66", 13, { en: "Villa garden with stepping-stone path and palms", ru: "Сад виллы: дорожка из плитки и пальмы", vi: "Vườn biệt thự với lối đi lát đá và hàng dừa" }),
    ],
    geo: { lat: 10.9431, lng: 108.2161 }, // TODO owner: exact pin
    ...seasonal([1900, 1900, 1600, 1800], 1600),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Sea Links villa R-66 · GARDEN VIEW ─────────────────────────
  {
    id: "SL-V-R66",
    slug: "sea-links-villa-golf-view-r-66",
    type: "villa",
    complex: "sea-links-villas",
    title: {
      en: "Sea Links Golf View Villa R-66",
      ru: "Вилла Sea Links R-66 с видом на гольф",
      vi: "Biệt thự Sea Links R-66 view golf",
    },
    summary: {
      en: "Two-storey villa R-66 in Sea Links City, Mui Ne, surrounded by a tropical garden: bright kitchen-dining room with an island and a table for eight, living room opening onto the garden, three bedrooms with balconies.",
      ru: "Двухэтажная вилла R-66 в Sea Links City (Муйне) в окружении тропического сада: светлая кухня-столовая с островом и столом на восемь человек, гостиная с выходом в сад, три спальни с балконами.",
      vi: "Biệt thự hai tầng R-66 tại Sea Links City, Mũi Né, bao quanh bởi vườn nhiệt đới: bếp kiêm phòng ăn sáng sủa có đảo bếp và bàn tám người, phòng khách mở ra vườn, ba phòng ngủ có ban công.",
    },
    bedrooms: 3, bathrooms: 3, maxGuests: 6, areaSqm: 320, // TODO owner: bathrooms
    beds: [{ type: "DoubleBed", count: 3 }],
    view: ["golf", "garden"],
    amenities: ["wifi", "airConditioning", "kitchen", "balcony", "garden", "parking"],
    images: [
      photo("sea-links-villa-r-66", 9, { en: "Open kitchen-dining room with a table for eight and garden windows, Sea Links villa R-66", ru: "Кухня-столовая со столом на восемь человек и окнами в сад, вилла Sea Links R-66", vi: "Bếp kiêm phòng ăn mở với bàn tám người và cửa sổ nhìn ra vườn, biệt thự Sea Links R-66" }),
      photo("sea-links-villa-r-66", 3, { en: "Living room with sofas and glass doors to the garden", ru: "Гостиная с диванами и стеклянными дверями в сад", vi: "Phòng khách có sofa và cửa kính mở ra vườn" }),
      photo("sea-links-villa-r-66", 4, { en: "Kitchen with island and bar stools next to the dining table", ru: "Кухня с островом и барными стульями рядом с обеденным столом", vi: "Bếp có đảo bếp và ghế bar cạnh bàn ăn" }),
      photo("sea-links-villa-r-66", 6, { en: "Master bedroom with desk and balcony overlooking the palms", ru: "Главная спальня с рабочим столом и балконом с видом на пальмы", vi: "Phòng ngủ chính có bàn làm việc và ban công nhìn ra hàng dừa" }),
      photo("sea-links-villa-r-66", 7, { en: "Bedroom with double bed and balcony", ru: "Спальня с двуспальной кроватью и балконом", vi: "Phòng ngủ giường đôi có ban công" }),
      photo("sea-links-villa-r-66", 5, { en: "Bedroom with platform bed and balcony door", ru: "Спальня с кроватью-подиумом и выходом на балкон", vi: "Phòng ngủ giường bục có cửa ra ban công" }),
      photo("sea-links-villa-r-66", 12, { en: "Fitted kitchen with oven, hob and microwave", ru: "Кухонный гарнитур с духовкой, плитой и микроволновкой", vi: "Tủ bếp có lò nướng, bếp nấu và lò vi sóng" }),
      photo("sea-links-villa-r-66", 10, { en: "View from the balcony onto the garden and the quiet villa street", ru: "Вид с балкона на сад и тихую улицу с виллами", vi: "Cảnh từ ban công xuống vườn và con đường biệt thự yên tĩnh" }),
    ],
    geo: { lat: 10.9436, lng: 108.2168 }, // TODO owner: exact pin
    ...seasonal([1200, 1200, 900, 1100], 1150),
    ...house, featured: true, updatedAt,
  },
  // ───────────────────────── Ethereal villa · SEA VIEW ─────────────────────────
  {
    id: "SL-V-ETHEREAL",
    slug: "ethereal-villa-sea-view",
    type: "villa",
    complex: "sea-links-villas", // TODO owner: confirm it is inside Sea Links City
    title: {
      en: "Ethereal Villa with Sea View Roof Terrace",
      ru: "Вилла Ethereal с террасой на крыше и видом на море",
      vi: "Biệt thự Ethereal có sân thượng view biển",
    },
    summary: {
      en: "Modern three-bedroom villa in Mui Ne, 400 m²: covered roof terrace with dining tables and a sea view, bright living room opening onto a landscaped garden, dining room for eight, bedrooms with balconies.",
      ru: "Современная вилла с тремя спальнями в Муйне, 400 м²: крытая терраса на крыше с обеденными столами и видом на море, светлая гостиная с выходом в ухоженный сад, столовая на восемь человек, спальни с балконами.",
      vi: "Biệt thự hiện đại 3 phòng ngủ tại Mũi Né, 400 m²: sân thượng có mái với bàn ăn và view biển, phòng khách sáng mở ra sân vườn, phòng ăn tám người, phòng ngủ có ban công.",
    },
    bedrooms: 3, bathrooms: 3, maxGuests: 6, areaSqm: 400, // TODO owner: price list says 20 bedrooms / 40 guests, no area, no price — confirm
    beds: [{ type: "DoubleBed", count: 3 }],
    view: ["sea", "garden"],
    amenities: ["wifi", "airConditioning", "kitchen", "balcony", "garden", "parking", "smartTv"],
    images: [
      photo("sea-links-villa-ethereal", 1, { en: "Facade of the modern Ethereal villa with balconies and front garden", ru: "Фасад современной виллы Ethereal с балконами и палисадником", vi: "Mặt tiền biệt thự Ethereal hiện đại với ban công và sân vườn trước nhà" }),
      photo("sea-links-villa-ethereal", 6, { en: "Covered roof terrace with dining tables and a sea view", ru: "Крытая терраса на крыше с обеденными столами и видом на море", vi: "Sân thượng có mái với bàn ăn và view biển" }),
      photo("sea-links-villa-ethereal", 7, { en: "Spacious living room with sofas and panoramic garden windows", ru: "Просторная гостиная с диванами и панорамными окнами в сад", vi: "Phòng khách rộng có sofa và cửa kính lớn nhìn ra vườn" }),
      photo("sea-links-villa-ethereal", 2, { en: "Lounge corner facing the landscaped garden", ru: "Диванная зона с видом на ухоженный сад", vi: "Góc sofa nhìn ra sân vườn" }),
      photo("sea-links-villa-ethereal", 8, { en: "Bedroom with double bed, sofa and balcony towards the sea", ru: "Спальня с двуспальной кроватью, диваном и балконом в сторону моря", vi: "Phòng ngủ giường đôi, có sofa và ban công hướng biển" }),
      photo("sea-links-villa-ethereal", 9, { en: "Bedroom with TV, seating area and two balcony doors", ru: "Спальня с телевизором, зоной отдыха и двумя выходами на балкон", vi: "Phòng ngủ có TV, góc ngồi và hai cửa ra ban công" }),
      photo("sea-links-villa-ethereal", 11, { en: "Bedroom with double bed and rattan armchairs", ru: "Спальня с двуспальной кроватью и ротанговыми креслами", vi: "Phòng ngủ giường đôi và ghế mây" }),
      photo("sea-links-villa-ethereal", 3, { en: "Dining room with a wooden table for eight and staircase", ru: "Столовая с деревянным столом на восемь человек и лестницей", vi: "Phòng ăn với bàn gỗ tám người và cầu thang" }),
      photo("sea-links-villa-ethereal", 5, { en: "Roof terrace table with the sea on the horizon", ru: "Столик на террасе, на горизонте море", vi: "Bàn trên sân thượng, biển ở phía chân trời" }),
      photo("sea-links-villa-ethereal", 13, { en: "Bathroom with glass shower cabin", ru: "Ванная комната со стеклянной душевой кабиной", vi: "Phòng tắm có buồng tắm kính" }),
    ],
    geo: { lat: 10.9431, lng: 108.2161 }, // TODO owner: exact pin
    ...monthly(1500),
    ...house, featured: true, updatedAt,
  },

  // ───────────────────────── Ocean Vista · C2-37 · studio · SEA VIEW ─────────────────────────
  {
    id: "OV-C2-37",
    slug: "ocean-vista-studio-sea-view-c2-37",
    type: "apartment",
    complex: "ocean-vista",
    title: {
      en: "Ocean Vista Sea View Studio C2-37",
      ru: "Студия Ocean Vista C2-37 с видом на море",
      vi: "Studio Ocean Vista C2-37 view biển",
    },
    summary: {
      en: "Studio on the 2nd floor of Ocean Vista Block C, Sea Links City, Mui Ne: double bed, sofa, kitchenette and a balcony with a table for two looking over the garden to the sea.",
      ru: "Студия на 2 этаже блока C в Ocean Vista (Sea Links City, Муйне): двуспальная кровать, диван, мини-кухня и балкон со столиком на двоих с видом на сад и море.",
      vi: "Studio tầng 2 Block C Ocean Vista, Sea Links City, Mũi Né: giường đôi, sofa, bếp nhỏ và ban công có bàn cho hai người nhìn qua vườn ra biển.",
    },
    bedrooms: 0, bathrooms: 1, maxGuests: 2, areaSqm: 40, floor: 2,
    beds: [{ type: "DoubleBed", count: 1 }],
    view: ["sea", "garden"],
    amenities: ["wifi", "airConditioning", "kitchen", "balcony", "sharedPool", "parking", "beachAccess", "smartTv"],
    images: [
      photo("ocean-vista-studio-c2-37", 6, { en: "Studio with double bed and balcony door open to the sea, Ocean Vista C2-37", ru: "Студия с двуспальной кроватью и выходом на балкон с видом на море, Ocean Vista C2-37", vi: "Studio giường đôi, cửa ban công mở ra hướng biển, Ocean Vista C2-37" }),
      photo("ocean-vista-studio-c2-37", 7, { en: "Balcony with table and two chairs overlooking the garden and the sea", ru: "Балкон со столиком и двумя стульями, вид на сад и море", vi: "Ban công có bàn và hai ghế nhìn ra vườn và biển" }),
      photo("ocean-vista-studio-c2-37", 1, { en: "Studio layout: bed, sofa, TV, wardrobe and kitchenette", ru: "Планировка студии: кровать, диван, телевизор, шкаф и мини-кухня", vi: "Bố cục studio: giường, sofa, TV, tủ quần áo và bếp nhỏ" }),
      photo("ocean-vista-studio-c2-37", 8, { en: "Double bed and work desk", ru: "Двуспальная кровать и рабочий стол", vi: "Giường đôi và bàn làm việc" }),
      photo("ocean-vista-studio-c2-37", 2, { en: "Desk by the balcony door with a glimpse of the sea", ru: "Стол у балконной двери, вдали видно море", vi: "Bàn cạnh cửa ban công, thấp thoáng biển phía xa" }),
      photo("ocean-vista-studio-c2-37", 5, { en: "Kitchenette with induction hob, microwave and kettle", ru: "Мини-кухня: индукционная плита, микроволновка и чайник", vi: "Bếp nhỏ có bếp từ, lò vi sóng và ấm đun nước" }),
    ],
    geo: { lat: 10.9453, lng: 108.2201 }, // TODO owner: exact pin
    ...seasonal([700, 700, 500, 600], 500),
    ...house, featured: true, updatedAt,
  },
];

/**
 * Every photo of the unit for its gallery: the curated images first (cover, hand-written alt text),
 * then the rest of the unit's imported photo set with a generic caption.
 */
export function allPhotos(p: Property, locale: Locale, caption: (n: number) => string) {
  const curated = p.images.map((im) => ({ src: im.src, width: im.width, height: im.height, alt: im.alt[locale] }));
  const set = p.images[0]?.src.split("/")[2];
  const used = new Set(curated.map((im) => im.src));
  const rest = (photos.find((g) => g.slug === set)?.images ?? [])
    .filter((im) => !used.has(im.src))
    .map((im, i) => ({ src: im.src, width: im.width, height: im.height, alt: caption(curated.length + i + 1) }));
  return [...curated, ...rest];
}

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
/** Lowest advertised price: nightly if nightly rates exist, otherwise the cheapest season per month. */
export const priceFrom = (p: Property): { amount: number; unit: "night" | "month"; from: boolean } | null =>
  p.rates.length ? { amount: Math.min(...p.rates.map((r) => r.nightlyUsd)), unit: "night", from: true }
  : p.monthlyRates?.length ? { amount: Math.min(...p.monthlyRates.map((r) => r.usd)), unit: "month", from: true }
  : p.monthlyUsd ? { amount: p.monthlyUsd, unit: "month", from: false } : null;
