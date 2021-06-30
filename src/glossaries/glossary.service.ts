import { BaseGlossaryDto } from './DTO/base-glossary.dto';

import countriesJson from '../common/glossaries/countries.json';
import genresJson from '../common/glossaries/genres.json';

function getCountryGlossary (): Array<BaseGlossaryDto> {
  return countriesJson;
}

function getGenresGlossary (): Array<BaseGlossaryDto> {
  return genresJson;
}

function getCountryById (id: number): BaseGlossaryDto {
  return countriesJson.find(item => item.id === id);
}

function getCountryByName (name: string): BaseGlossaryDto {
  return countriesJson.find(item => item.name === name);
}

function getGenreById (id: number): BaseGlossaryDto {
  return genresJson.find(item => item.id === id);
}

function getGenreByName (name: string): BaseGlossaryDto {
  return genresJson.find(item => item.name === name);
}

export {
  getCountryGlossary,
  getGenresGlossary,
  getCountryById,
  getCountryByName,
  getGenreById,
  getGenreByName
};