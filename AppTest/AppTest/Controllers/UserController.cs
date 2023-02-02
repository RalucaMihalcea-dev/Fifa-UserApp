using AppTest.Data;
using AppTest.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using HttpPutAttribute = System.Web.Http.HttpPutAttribute;

namespace AppTest.Controllers
{
    public class UserController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        public IQueryable<User> GetPlayers() => db.Users;

        [HttpGet]
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetPlayerById(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = db.Users.FirstOrDefault(x => x.Id == id);
            return Ok(user);
        }

        [HttpPost]
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> Create(User user)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut]
        public async Task<IHttpActionResult> Edit(int id, [FromBody] User editInfo)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userToUpdate = await db.Users.FindAsync(id);
            if (userToUpdate != null)
            {
                userToUpdate.Name = editInfo.Name;
                userToUpdate.Age = editInfo.Age;
            }
            else
            {
                return NotFound();
            }

            await db.SaveChangesAsync();

            return Ok(userToUpdate);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var playerToDelete = await db.Users.FindAsync(id);
            if (playerToDelete != null)
            {
                db.Users.Remove(playerToDelete);
            }
            else
            {
                return NotFound();
            }

            await db.SaveChangesAsync();

            return Ok();
        }
    }
}