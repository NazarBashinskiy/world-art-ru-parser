import { Request } from '../common/libs';

async function getCinemaListPage (page: number): Promise<string> {
  const request = new Request(`${process.env.WORLD_ART_MAIN_URL}/cinema?list.php`);
  return request.get({ query: { limit_1: (page * 25).toString(), }, });
}

async function getCinemaPage (worldArtId: number): Promise<string> {
  const request = new Request(`${process.env.WORLD_ART_MAIN_URL}/cinema/cinema.php`);
  return request.get({ query: { id: worldArtId.toString(), }, });
}

export { getCinemaListPage, getCinemaPage };