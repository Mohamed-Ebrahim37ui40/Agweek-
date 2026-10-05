# 🥔 Potato Knowledge Hub — موسوعة البطاطس

منصة معرفية عربية (RTL) تنظّم **20 تقريرًا فنيًا** عن إنتاج وحصاد وتخزين البطاطس في رحلة من 7 مراحل، مع بحث نصي كامل، ووضع ليلي، وخلاصة تنفيذية مصوّرة. **تعمل بدون إنترنت**.

> تصميم مهندس محمد إبراهيم (فرمينو)

## المحتويات
- [المميزات](#المميزات)
- [التشغيل](#التشغيل)
- [النشر على GitHub Pages](#النشر-على-github-pages)
- [العمل بدون إنترنت](#العمل-بدون-إنترنت)
- [هيكل المشروع](#هيكل-المشروع)
- [فهرس التقارير](#فهرس-التقارير)
- [مراحل الرحلة](#مراحل-الرحلة)
- [التخصيص](#التخصيص)
- [التواصل](#التواصل)

## المميزات
- 7 مراحل متسلسلة: من اختيار الصنف حتى التخزين وجودة المنتج المقلي.
- صفحة مستقلة لكل تقرير: فهرس جانبي متحرك، خلاصة سريعة، جداول وقوائم منسقة، وزر تحميل الملف الأصلي.
- **تقرير تنفيذي** (`report.html`) برسوم توضيحية: دونات تركيب التربة، أعمدة مقارنة التكلفة، هرم الري، ومؤشرات أرقام.
- بحث فوري داخل نصوص كل التقارير (يتجاهل التشكيل ويوحّد الألف والياء والتاء المربوطة).
- وضع ليلي/نهاري، شريط تقدم القراءة، حركات ظهور، تصميم متجاوب للجوال، وطباعة نظيفة.
- لا يعتمد على أي مكتبة أو خط أو CDN خارجي.

## التشغيل
افتح الملف `index.html` مباشرة في المتصفح (نقرة مزدوجة)، أو شغّل خادمًا محليًا:
```bash
python3 -m http.server 8000
# ثم افتح http://localhost:8000
```

## النشر على GitHub Pages
1. أنشئ مستودعًا جديدًا على GitHub وارفع **محتويات** هذا المجلد في الجذر.
2. من **Settings → Pages** اختر: *Deploy from a branch* ← الفرع `main` ← المجلد `/ (root)`.
3. بعد دقائق يظهر الرابط: `https://USERNAME.github.io/REPO/`.

الملف `.nojekyll` موجود لضمان تقديم الملفات كما هي.

## العمل بدون إنترنت
- **محليًا:** كل الملفات (CSS/JS/الصفحات/بيانات البحث) محلية، فيعمل الموقع بفتح `index.html` دون اتصال.
- **بعد النشر:** يسجّل `sw.js` خدمة عمل (Service Worker) تخزّن الصفحات عند أول زيارة، ثم يعمل الموقع بدون إنترنت، ويمكن تثبيته كتطبيق (PWA).
- روابط التواصل الاجتماعي تحتاج اتصالًا بطبيعة الحال.

## هيكل المشروع
كل الملفات في مستوى واحد (بدون مجلدات) لتسهيل الرفع من الأندرويد:
```
index.html, report.html          # الصفحة الرئيسية + الخلاصة
style.css                        # التنسيق
main.js, search-data.js          # الحركة والبحث
sw.js, manifest.webmanifest      # العمل بدون إنترنت (PWA)
favicon.svg, .nojekyll
topic-01-...html → topic-20-...html   # 20 صفحة تقرير
doc-01-...docx   → doc-20-...docx     # الملفات الأصلية (Word)
```

## فهرس التقارير
| # | التقرير | المرحلة | الملف الأصلي |
|---|---|---|---|
| 01 | [استراتيجية اختيار أصناف البطاطس](topic-01-variety-selection-strategy.html) | البذور والأصناف | `doc-01-variety-selection-strategy.docx` |
| 02 | [استراتيجية تطوير أصناف البطاطس الجديدة](topic-02-new-variety-development.html) | البذور والأصناف | `doc-02-new-variety-development.docx` |
| 03 | [أداة التخطيط العالمي للبذور GSPT في بيبسيكو](topic-03-gspt-seed-planning-tool.html) | البذور والأصناف | `doc-03-gspt-seed-planning-tool.docx` |
| 04 | [إدارة تقاوي البطاطس وجودتها وتخطيط برامج البذور](topic-04-seed-potato-quality-management.html) | البذور والأصناف | `doc-04-seed-potato-quality-management.docx` |
| 05 | [تخزين بطاطس التقاوي وإدارة المخاطر والحفاظ على الجودة](topic-05-seed-potato-storage-risk.html) | البذور والأصناف | `doc-05-seed-potato-storage-risk.docx` |
| 06 | [فهم التربة وإدارة خصوبتها لزيادة إنتاجية المحاصيل](topic-06-soil-fertility-understanding.html) | التربة والري والتغذية | `doc-06-soil-fertility-understanding.docx` |
| 07 | [الري وإدارة تغذية البطاطس](topic-07-irrigation-nutrition-management.html) | التربة والري والتغذية | `doc-07-irrigation-nutrition-management.docx` |
| 08 | [آلة زراعة البطاطس متعددة الوظائف (PS4)](topic-08-multifunction-potato-planter-ps4.html) | الآلات والتقنيات الحديثة | `doc-08-multifunction-potato-planter-ps4.docx` |
| 09 | [استخدام الطائرات المسيّرة (Drones) في رش المحاصيل الزراعية](topic-09-drones-crop-spraying.html) | الآلات والتقنيات الحديثة | `doc-09-drones-crop-spraying.docx` |
| 10 | [التقنيات العملية لمراقبة نمو محصول البطاطس](topic-10-crop-growth-monitoring-techniques.html) | متابعة نمو المحصول | `doc-10-crop-growth-monitoring-techniques.docx` |
| 11 | [قياسات الحقل ومتابعة نمو المحصول](topic-11-field-measurements-growth-tracking.html) | متابعة نمو المحصول | `doc-11-field-measurements-growth-tracking.docx` |
| 12 | [تشخيص أمراض البطاطس وإدارتها](topic-12-potato-disease-diagnosis.html) | وقاية المحصول وحمايته | `doc-12-potato-disease-diagnosis.docx` |
| 13 | [نطاطات النباتات (Plant Hoppers)](topic-13-plant-hoppers-stolbur.html) | وقاية المحصول وحمايته | `doc-13-plant-hoppers-stolbur.docx` |
| 14 | [تكنولوجيا تطبيق المبيدات وحماية المحاصيل](topic-14-pesticide-application-technology.html) | وقاية المحصول وحمايته | `doc-14-pesticide-application-technology.docx` |
| 15 | [كدمات البطاطس (Potato Bruising)](topic-15-potato-bruising.html) | الحصاد والكدمات | `doc-15-potato-bruising.docx` |
| 16 | [مبادئ حصاد البطاطس وتقليل الكدمات أثناء الحصاد](topic-16-harvest-principles-bruise-reduction.html) | الحصاد والكدمات | `doc-16-harvest-principles-bruise-reduction.docx` |
| 17 | [إدارة جودة البطاطس من الحصاد إلى التخزين](topic-17-quality-harvest-to-storage.html) | الحصاد والكدمات | `doc-17-quality-harvest-to-storage.docx` |
| 18 | [التدريب على تقليل كدمات البطاطس باستخدام الواقع الافتراضي (VR)](topic-18-vr-bruise-reduction-training.html) | الحصاد والكدمات | `doc-18-vr-bruise-reduction-training.docx` |
| 19 | [تخزين البطاطس وإدارة المخازن](topic-19-potato-storage-management.html) | التخزين والجودة | `doc-19-potato-storage-management.docx` |
| 20 | [العلاقة بين السكريات المختزلة في البطاطس وجودة البطاطس المقلية](topic-20-reducing-sugars-fry-quality.html) | التخزين والجودة | `doc-20-reducing-sugars-fry-quality.docx` |

## مراحل الرحلة
1. **البذور والأصناف** — اختيار الصنف وتطويره وجودة التقاوي وتخطيط برامج البذور وتخزينها
2. **التربة والري والتغذية** — فهم بنية التربة وخصوبتها وإدارة الري والتسميد
3. **الآلات والتقنيات الحديثة** — آلات الزراعة المتطورة والطائرات المسيّرة في الرش
4. **متابعة نمو المحصول** — قياسات الحقل ومؤشرات النمو وتقدير الإنتاج
5. **وقاية المحصول وحمايته** — تشخيص الأمراض ونطاطات النباتات وتكنولوجيا تطبيق المبيدات
6. **الحصاد والكدمات** — فهم الكدمات وضبط الحصادة والتدريب على تقليل التلف
7. **التخزين والجودة** — إدارة المخازن والسكريات المختزلة وجودة المنتج المقلي

## التخصيص
- الألوان والمقاسات: متغيرات `:root` أعلى `style.css`.
- تعديل ملخصات التقارير: في مباشرة في ملفات `topic-*.html`.

## التواصل
**تصميم مهندس محمد إبراهيم (فرمينو)**

| التطبيق | الرابط |
|---|---|
| Gmail | mohamed.ibrahim11617@gmail.com |
| LinkedIn | https://www.linkedin.com/in/mohamed-ebrahim-771b0540a |
| Facebook | https://www.facebook.com/share/1JHu4fGCXa/ |
| X | https://x.com/Firmo13MH |
| WhatsApp | https://wa.me/qr/QIZ446FGUAGGD1 |
| Telegram | https://t.me/FR6060ME |
