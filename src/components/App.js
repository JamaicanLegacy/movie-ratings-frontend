import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import ManageMoviePage from "./movies/ManageMoviePage";
import ManageActorPage from "./actors/ManageActorPage";
import ManageDirectorPage from "./directors/ManageDirectorPage";
import ManageGenrePage from "./genres/ManageGenresPage";
import ManageMediaHousePage from "./mediahouse/ManageMediaHousePage";
import MoviesPage from "./movies/MoviesPage";
import ActorsPage from "./actors/ActorsPage";
import DirectorsPage from "./directors/DirectorsPage";
import GenresPage from "./genres/GenresPage";
import MediaHousesPage from "./mediahouse/MediaHousesPage";
// import Details from "./home/Details";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/home/details/:movieId" component={Details} /> */}
        <Route path="/movies" component={MoviesPage} />
        <Route path="/movie/:slug" component={ManageMoviePage} />
        <Route path="/movie" component={ManageMoviePage} />
        <Route path="/actors" component={ActorsPage} />
        <Route path="/actor/:slug" component={ManageActorPage} />
        <Route path="/actor" component={ManageActorPage} />
        <Route path="/directors" component={DirectorsPage} />
        <Route path="/director/:slug" component={ManageDirectorPage} />
        <Route path="/director" component={ManageDirectorPage} />
        <Route path="/genres" component={GenresPage} />
        <Route path="/genre/:slug" component={ManageGenrePage} />
        <Route path="/genre" component={ManageGenrePage} />
        <Route path="/mediaHouses" component={MediaHousesPage} />
        <Route path="/mediaHouse/:slug" component={ManageMediaHousePage} />
        <Route path="/mediaHouse" component={ManageMediaHousePage} />
      </Switch>
    </div>
  );
}

export default App;
