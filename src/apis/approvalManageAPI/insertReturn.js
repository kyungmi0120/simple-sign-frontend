export default function insertReturn(page) {
  let url = `http://localhost:8080/approve/return/${page}`;
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
}
