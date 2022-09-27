using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesApi130.Data;
using MoviesApi130.Models;

namespace MoviesApi130.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public static User user = new User();

        private readonly DataContext context;

        public UsersController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            user.Role = "User";

            this.context.Users.Add(user);

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Users.ToListAsync());
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(User request)
        {
            var allUsers = await this.context.Users.ToListAsync();

            foreach (var user in allUsers)
            {
                if (user.UserName == request.UserName && user.Password == request.Password)
                {
                    return Ok("Request successful");
                }
            }

            return BadRequest("User not found.");
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAll()
        {
            return Ok(await this.context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> Get(int id)
        {
            var user = await this.context.Users.FindAsync(id);

            if (user == null)
                return BadRequest("User not found.");

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> Create(User newUser)
        {
            this.context.Users.Add(newUser);

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Users.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> Update(User updatedUser)
        {
            var user = await this.context.Users.FindAsync(updatedUser.Id);

            if (user == null)
                return BadRequest("User not found.");

            user.UserName = updatedUser.UserName;
            user.Role = updatedUser.Role;

            await this.context.SaveChangesAsync();

            return Ok(await this.context.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            if (User.IsInRole("Admin")) {
                var user = await this.context.Users.FindAsync(id);

                if (user == null)
                    return BadRequest("User not found.");

                this.context.Users.Remove(user);

                await this.context.SaveChangesAsync();

                return Ok(await this.context.Users.ToListAsync());
            }

            return BadRequest();

        }
    }
}
