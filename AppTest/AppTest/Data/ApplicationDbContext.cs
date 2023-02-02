using AppTest.Models;
using System.Data.Entity;

namespace AppTest.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("AppTestConnectionString")
        {

        }

        public DbSet<User> Users { get; set; }
    }
}