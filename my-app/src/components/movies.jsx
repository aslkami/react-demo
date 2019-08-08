import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import getPageMovies from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" }
  };

  // 获取数据
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ name: "All Genres", _id: 0 }, ...data];
    this.setState({ movies, genres });
  }

  // 排序
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => movie._id !== m._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      toast("This movie has already been deleted !");
      this.setState({ movies: originalMovies });
    }

    // 当每一页删除所有数据之后，页面不会跳转的处理
    const pageCount = Math.ceil(movies.length / this.state.pageSize);
    this.fixDeleteBug(pageCount, this.state.currentPage);
  };

  // 点心心
  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  // 点击页码
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // 点击左侧侧边栏
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  // 过滤并获取数据
  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: initMovies,
      sortColumn,
      searchQuery,
      selectedGenre
    } = this.state;

    let filterMovies = initMovies;
    if (searchQuery) {
      filterMovies = initMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filterMovies = initMovies.filter(m => m.genre._id === selectedGenre._id);
    }
    // const filterMovies =
    //   selectedGenre && selectedGenre._id
    //     ? initMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : initMovies;

    const sortedMovies = _.orderBy(
      filterMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = getPageMovies(sortedMovies, pageSize, currentPage);

    return { totalCount: filterMovies.length, data: movies };
  };

  // 删除时当当前页没有数据时，页码不会跳转
  fixDeleteBug = (pageCount, currentPage) => {
    if (pageCount < currentPage) {
      this.setState({ currentPage: pageCount });
    }
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      // movies: initMovies,
      searchQuery,
      genres,
      sortColumn,
      selectedGenre
    } = this.state;

    if (count === 0) return "There are no movies in the database!";

    const { totalCount, data: movies } = this.getPageData();
    // const pageCount = Math.ceil(totalCount / pageSize);
    // console.log(pageCount);
    // 当每一页删除所有数据只会，页面不会跳转的处理
    // this.fixDeleteBug(pageCount, currentPage);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>showing {totalCount} movies</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLiked={this.handleLiked}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
