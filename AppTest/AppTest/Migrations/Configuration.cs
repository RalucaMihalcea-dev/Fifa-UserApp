using AppTest.Models;
using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

namespace AppTest.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<AppTest.Data.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Data.ApplicationDbContext context)
        {

            context.Users.AddOrUpdate(
                new User { Name = "Tom", Age = 2 },
                new User { Name = "Lisa", Age = 21 },
                new User { Name = "Andrew", Age = 2 },
                new User { Name = "Henry", Age = 2 },
                new User { Name = "Ben", Age = 2 }
            );
        }
    }
}
