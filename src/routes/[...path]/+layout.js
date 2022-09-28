import { error } from '@sveltejs/kit'

export function load({url}) {
  return fetch(`API_URL/page?path=${url.pathname}`, {
    headers: {
      'Authorization': `Bearer SITE_TOKEN`,
      'Accept': 'application/json'
    }
  })
  .then(res => {return res.json()})
  .catch(e => {throw error(404, 'Not found')})
}