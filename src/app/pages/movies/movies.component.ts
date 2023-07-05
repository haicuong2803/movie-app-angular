import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movies : Movie[] = [];
  total: number = 0;
  page: number = 1;
  genreId: number  = 0;
  pageSize:number = 20;

  searchValue: string  = "";
  
  constructor(private movieService : MoviesService, private route: ActivatedRoute){};
  
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({genreId, a}) => {
      console.log(genreId);
      if(genreId){
        this.genreId = Number(genreId);
        this.fetchMoviesByGenre(this.genreId, this.page);
      }
      else this.fetchMovies();
    });
  }
 fetchMovies(){
  this.movieService.searchMovies(this.page, this.searchValue).subscribe((res) => {
    this.movies = res.results;
    this.total = res.total_results;
  });
 }

 fetchMoviesByGenre(genreId:number, page:number){
  this.movieService.fetchMoviesByGenre(genreId, page).subscribe((res) => {
    this.movies = res.results;
    this.total = res.total_results;
  });
 }
  handlePageChange(event: any){
    this.page = event;
    if(this.genreId){
      this.fetchMoviesByGenre(this.genreId, this.page);
    }
    else this.fetchMovies();
  }
}
