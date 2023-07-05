import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MovieDto } from '../models/movie';
import { of, switchMap } from 'rxjs';
import { GenreDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl:string = "https://api.themoviedb.org/3";
  apiKey:string = "286b84845c321d7671eb0d7b37d7f611";


  constructor(private http : HttpClient) { }

  getMovies(type: string = 'upcoming', count: number = 12){
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap(res => {
        return of(res.results.slice(0, count));
      }),
    );
  }
  
  searchMovies(page: number = 1, searchValue: string){
    const url = searchValue ? "/search/movie" : "/movie/popular";
    return this.http.get<MovieDto>(`${this.baseUrl}/${url}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`);
  }

  getTvs(type: string = 'latest', count: number = 12){
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap(res => {
        return of(res.results.slice(0, count));
      }),
    );
  }
  getMoviesGenres(){
    return this.http.get<GenreDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap(res => {
        return of(res.genres);
      }),
    );
  }
  fetchMoviesByGenre(genreId:number, page: number = 1){
    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`);
  }
}
