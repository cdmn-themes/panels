export async function load({url}) {
  const path = url.pathname
  const data = await fetch(`API_URL/contents/${path}`, {
    headers: {
      'Authorization': `Bearer SITE_ID`
    }
  }).then(res => res.json())
  data.path = path
  return data
}