using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Database.Models;
using Microsoft.EntityFrameworkCore;


namespace Database.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Roles>();

            modelBuilder.Entity<UserAllergy>()
            .HasKey(ua => new { ua.UserId, ua.AllergyId });

            modelBuilder.Entity<UserAllergy>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.UserAllergies)
                .HasForeignKey(ua => ua.UserId);

            modelBuilder.Entity<UserAllergy>()
                .HasOne(ua => ua.Allergy)
                .WithMany(a => a.UserAllergies)
                .HasForeignKey(ua => ua.AllergyId);
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Allergy> Allergy{ get; set; }
        public DbSet<UserAllergy> UserAllergies { get; set; }
        /*public DbSet<Allergies> Allergies{ get; set; }*/

    }

}
