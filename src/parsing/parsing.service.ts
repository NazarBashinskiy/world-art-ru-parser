import Bull from 'bull';

import { getCinemaList } from '../world-art-ru/world-art-ru.parser';
import { createMovie } from '../movies/movie.service';

function createJob () {
  const parsingJob = new Bull<number>('parsing');
  parsingJob.process(async job => {
    const page = job.data;
    const cinemaList = await getCinemaList(page);
    const resultPromises = cinemaList.map(item => createMovie(item));
    await Promise.all(resultPromises);
    job.progress();
  });
}

function getJob () {
  return new Bull<number>('parsing');
}

export { createJob, getJob };
