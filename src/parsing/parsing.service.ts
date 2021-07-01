import Bull from 'bull';

import { getCinemaList } from '../world-art-ru/world-art-ru.parser';
import { createMovie } from '../movies/movie.service';
import { BadRequestException } from '../common/exceptions/bad-request.exception';

function createJob () {
  const parsingJob = new Bull<number>('parsing', {
    redis: {
      host: process.env.REDIS_HOST
    }
  });
  parsingJob.process(async job => {
    const page = job.data;
    const cinemaList = await getCinemaList(page);
    const resultPromises = cinemaList.map(item => createMovie(item));
    await Promise.all(resultPromises);
    job.progress();
  });
}

function getJob () {
  return new Bull<number>('parsing', {
    redis: {
      host: process.env.REDIS_HOST
    }
  });
}

async function startParsing (): Promise<void> {
  const job = getJob();
  const status = await job.getJobCounts();
  if (status.active === 0 && status.waiting === 0) {
    //TODO: add pages amount parser
    const pagesAmount = 3094;
    for (let i = 0; i < pagesAmount; i++) {
      job.add(i);
    }
  } else {
    throw new BadRequestException('Parsing process has been already started');
  }
}

async function getParsingStatus (): Promise<Bull.JobCounts> {
  const job = getJob();
  return job.getJobCounts();
}

export { createJob, getJob, startParsing, getParsingStatus };
