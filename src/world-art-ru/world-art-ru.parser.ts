import { JSDOM } from 'jsdom';

import { getCinemaListPage } from './world-art-ru.service';
import { ICinemaListItem } from './interfaces/cinema-list-item.interface';

async function getCinemaList (page: number): Promise<Array<ICinemaListItem>> {
  const pageHtml = await getCinemaListPage(page);
  const { window } = new JSDOM(pageHtml);
  const { document } = window;

  const mainTable = document.querySelector(
    `table[height="58%"][bgcolor="#ffffff"] > tbody > tr > td > table > tbody > tr > td[valign="top"]`
  );
  const movieCards = mainTable.querySelectorAll(`br + br + table:not([border="0"])`);
  const cinemaList: Array<ICinemaListItem> = [];
  movieCards.forEach(item => {
    const cinemaItem = {} as ICinemaListItem;
    const reviewTable = item.querySelector('td.review');
    const h3 = reviewTable.querySelector('.h3');
    cinemaItem.title = h3.textContent;
    cinemaItem.id = parseInt(h3.getAttribute('href').slice(14));
    cinemaItem.year = parseInt(reviewTable.querySelectorAll('font')[1].textContent.replace('(', ''));
    reviewTable.childNodes.forEach(item => {
      if (item.nodeType == 3) {
        const text = item.textContent;
        if (text.includes('Производство') || text.includes('Фильм совместного производства')) {
          cinemaItem.countries = text.split(': ')[1].split(', ');
        }
        if (text.includes('Жанр')) {
          cinemaItem.genres = text.split(': ')[1].split(', ');
        }
      }
    });
    cinemaItem.description = reviewTable.querySelector('div.hide')?.textContent;
    cinemaItem.actors = reviewTable.querySelector('td.review')?.textContent?.split(': ')[1]?.split('...')[0]?.split(', ');
    cinemaItem.rate = parseFloat(item.querySelector('td[width="180"] b').textContent)
    cinemaList.push(cinemaItem);
  });
  return cinemaList;
}

export { getCinemaList };
