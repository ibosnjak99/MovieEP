using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesApi130.Data;
using MoviesApi130.Models;

namespace MoviesApi130.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : Controller
    {
        private readonly DataContext context;

        public MoviesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Movie>>> GetAll()
        {
            return Ok(await this.context.Movies.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Movie>>> Get(int id)
        {
            var movie = await this.context.Movies.FindAsync(id);

            if (movie == null)
                return BadRequest("Movie not found.");

            return Ok(movie);
        }

        [HttpPost]
        public async Task<ActionResult<List<Movie>>> Create(Movie newMovie)
        {
            this.context.Movies.Add(newMovie);

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Movies.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Movie>>> Update(Movie updatedMovie)
        {
            var movie = await this.context.Movies.FindAsync(updatedMovie.Id);

            if (movie == null)
                return BadRequest("Movie not found.");

            movie.Name = updatedMovie.Name;
            movie.Genre = updatedMovie.Genre;
            movie.ReleaseYear = updatedMovie.ReleaseYear;

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Movies.ToListAsync());
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult<List<Movie>>> Delete(int id)
        {
            var movie = await this.context.Movies.FindAsync(id);

            if (movie == null)
                return BadRequest("Movie not found.");

            this.context.Movies.Remove(movie);

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Movies.ToListAsync());
        }
    }
}
