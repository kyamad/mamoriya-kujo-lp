"""Capture the reference LP and localize its presentation assets for variant G."""
import re,json,hashlib,urllib.request,urllib.parse,concurrent.futures,posixpath
from pathlib import Path
BASE='https://houseguard24.saki-x.jp/'
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'g'
source=Path('/private/tmp/houseguard-source.html').read_text()
# Keep display/UI scripts; omit analytics, abandoned-form capture, nonce refresh.
source=re.sub(r'<script\b[^>]*>.*?</script\s*>',lambda m: '' if re.search(r'googletagmanager|Google Tag Manager|hg24-kago|hg-nonce-refresh|flip-nine|gtag\(',m.group(),re.I) else m.group(),source,flags=re.S|re.I)
source=re.sub(r'<noscript>\s*<iframe.*?googletagmanager.*?</noscript>','',source,flags=re.S|re.I)
source=re.sub(r'<link\b[^>]*rel=["\'](?:canonical|shortlink|https://api.w.org/)["\'][^>]*>','',source,flags=re.I)
# Collect quoted references and url() tokens, including lazy images/srcsets.
asset_ext=re.compile(r'\.(?:css|js|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp4)(?:\?|$)',re.I)
abs_pattern=re.compile(r'(?:https?:)?//[^\s"\'<>\\)]+')
seen={}; failed=[]
def discover(text,base):
 vals=abs_pattern.findall(text)
 vals+=re.findall(r'url\(\s*["\']?([^\s"\')]+)',text,re.I)
 vals+=re.findall(r'(?:src|href|data-src)=["\']([^"\']+)',text,re.I)
 vals+=re.findall(r'@import\s+["\']([^"\']+)',text,re.I)
 result=[]
 for val in vals:
  val=val.replace('&amp;','&')
  if val.startswith(('data:','#')):continue
  u=urllib.parse.urljoin(base,val)
  if asset_ext.search(u) and urllib.parse.urlparse(u).netloc == 'houseguard24.saki-x.jp':result.append(u.split('#')[0])
 return set(result)
def pathfor(url):
 u=urllib.parse.urlparse(url)
 path=urllib.parse.unquote(u.path).lstrip('/')
 return OUT/'assets'/u.netloc/path
pending=discover(source,BASE)
pending.add('https://houseguard24.saki-x.jp/wp-content/themes/house-guard/assets/img/present/bg_%20trouble_pc.png')
def fetch(url):
 try:
  target=pathfor(url)
  if target.exists() and target.suffix not in ('.css','.js'):data=target.read_bytes()
  else:
   request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
   with urllib.request.urlopen(request,timeout=35) as r:data=r.read()
   target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
  return url,target,data,None
 except Exception as e:return url,None,None,str(e)
for depth in range(6):
 todo=pending-set(seen);pending=set()
 if not todo:break
 print('batch',depth,'assets',len(todo),flush=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
  for url,target,data,error in pool.map(fetch,todo):
   seen[url]=str(target.relative_to(OUT)) if target else None
   if error:failed.append([url,error]);continue
   if target.suffix in ('.css','.js'):
    pending.update(discover(data.decode('utf-8',errors='replace'),url))
# Local URLs are relative so the existing Pages builder leaves them intact.
def rewrite(text,base,current):
 for url,rel in sorted(seen.items(),key=lambda x:len(x[0]),reverse=True):
  if not rel:continue
  dest=posixpath.relpath(rel,current)
  variants={url,url.replace('&','&amp;')}
  if url.startswith('https:'):variants.add(url[6:])
  for v in sorted(variants,key=len,reverse=True):text=text.replace(v,dest)
 def cssurl(m):
  raw=m.group(1).strip('"\'').replace('\\ ', '%20')
  resolved=urllib.parse.urljoin(base,raw)
  if seen.get(resolved):return 'url("'+posixpath.relpath(seen[resolved],current)+'")'
  return m.group(0)
 return re.sub(r'url\(\s*([^)]*?)\s*\)',cssurl,text)
for url,rel in seen.items():
 if rel and Path(rel).suffix in ('.css','.js'):
  p=OUT/rel
  p.write_text(rewrite(p.read_text(errors='replace'),url,posixpath.dirname(rel)))
source=rewrite(source,BASE,'.')
source=re.sub(r'<link[^>]+rel="(?:preconnect|dns-prefetch)"[^>]*>','',source)
source=source.replace(BASE+'#','#')
source=source.replace('<head>','<head>\n<meta name="robots" content="noindex,nofollow">\n<script src="preview-guard.js"></script>',1)
def hydrate(m):
 tag=m.group()
 for dest in ['src','srcset']:
  v=re.search(r'\bdata-'+dest+r'=["\']([^"\']+)',tag)
  if not v:continue
  value=v.group(1)
  if re.search(r'(?<![\w-])'+dest+r'=',tag):tag=re.sub(r'(?<![\w-])'+dest+r'=["\'][^"\']*["\']',lambda m:dest+'="'+value+'"',tag,count=1)
  else:tag=tag[:-1]+' '+dest+'="'+value+'">'
 tag=re.sub(r'\blazyload\b','lazyloaded',tag)
 return tag
source=re.sub(r'<(?:img|source)\b[^>]*>',hydrate,source,flags=re.I)
(OUT/'index.html').write_text(source)
(OUT/'source-manifest.json').write_text(json.dumps({'source':BASE,'captured':'2026-11-28','assets':seen,'failed':failed},ensure_ascii=False,indent=2))
print('total',len(seen),'failed',len(failed),flush=True)
for f in failed:print(f,flush=True)
