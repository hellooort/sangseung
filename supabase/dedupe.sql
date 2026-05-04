-- =====================================================================
-- ?? ??? ?? (seed.sql? ? ? ?? ??? ???)
-- ? ????? "??? ?? row"? 1?? ??? ? ? id? ?????.
-- ? ?? ???? ?? (?? ??? ??? 0? ??).
-- =====================================================================

-- partners : ?? name_ko ?? ??? (?? id ? ?? ??)
DELETE FROM public.partners a
USING public.partners b
WHERE a.name_ko = b.name_ko
  AND a.id > b.id;

-- histories : ?? year + text_ko ? ?? ???? ??
DELETE FROM public.histories a
USING public.histories b
WHERE a.year = b.year
  AND a.text_ko = b.text_ko
  AND a.id > b.id;

-- office_locations : ??/?????????/???? ? name_ko ??
DELETE FROM public.office_locations a
USING public.office_locations b
WHERE a.name_ko = b.name_ko
  AND a.id > b.id;

-- certificates : title_ko ??
DELETE FROM public.certificates a
USING public.certificates b
WHERE a.title_ko = b.title_ko
  AND a.id > b.id;

-- works : title_ko ??
DELETE FROM public.works a
USING public.works b
WHERE a.title_ko = b.title_ko
  AND a.id > b.id;

-- products : name ??
DELETE FROM public.products a
USING public.products b
WHERE a.name = b.name
  AND a.id > b.id;

-- ??? (? ??? row ? ??)
SELECT 'partners'         AS table_name, COUNT(*) AS rows FROM public.partners
UNION ALL SELECT 'histories',         COUNT(*) FROM public.histories
UNION ALL SELECT 'office_locations',  COUNT(*) FROM public.office_locations
UNION ALL SELECT 'certificates',      COUNT(*) FROM public.certificates
UNION ALL SELECT 'works',             COUNT(*) FROM public.works
UNION ALL SELECT 'products',          COUNT(*) FROM public.products;
